const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const axios = require('axios');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3002;
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-change-this';

app.use(cors());
app.use(bodyParser.json());

// Serve static files from React app
app.use(express.static(path.join(__dirname, '../client/dist')));

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// --- Auth Routes ---

app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: "Username and password required" });

    const hashedPassword = bcrypt.hashSync(password, 8);
    
    const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
    db.run(sql, [username, hashedPassword], function(err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ error: "Username already exists" });
            }
            return res.status(500).json({ error: err.message });
        }
        const token = jwt.sign({ id: this.lastID, username }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ message: "User registered", token, user: { id: this.lastID, username } });
    });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(400).json({ error: "User not found" });

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) return res.status(401).json({ error: "Invalid password" });

        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ message: "Login success", token, user: { id: user.id, username: user.username } });
    });
});

// Get User Profile
app.get('/api/user/profile', authenticateToken, (req, res) => {
    db.get("SELECT id, username, gender, age, job, location FROM users WHERE id = ?", [req.user.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
});

// Update User Profile
app.put('/api/user/profile', authenticateToken, (req, res) => {
    const { gender, age, job, location } = req.body;
    db.run(
        "UPDATE users SET gender = ?, age = ?, job = ?, location = ? WHERE id = ?",
        [gender, age, job, location, req.user.id],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Profile updated", changes: this.changes });
        }
    );
});

// --- Asset Routes ---

app.get('/api/assets', authenticateToken, (req, res) => {
  const sql = "SELECT * FROM assets WHERE user_id = ? ORDER BY purchase_date DESC";
  db.all(sql, [req.user.id], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    });
  });
});

app.post('/api/assets', authenticateToken, (req, res) => {
  const { name, category, purchase_date, store, price, resale_price, photo_url, location, notes, warranty_expiry } = req.body;
  const sql = `INSERT INTO assets (user_id, name, category, purchase_date, store, price, resale_price, photo_url, location, notes, warranty_expiry) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;
  const params = [req.user.id, name, category, purchase_date, store, price, resale_price, photo_url, location, notes, warranty_expiry];
  
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": { id: this.lastID, user_id: req.user.id, ...req.body },
      "id": this.lastID
    });
  });
});

app.put('/api/assets/:id', authenticateToken, (req, res) => {
  const { name, category, purchase_date, store, price, resale_price, photo_url, location, notes, warranty_expiry } = req.body;
  const sql = `UPDATE assets SET name=?, category=?, purchase_date=?, store=?, price=?, resale_price=?, photo_url=?, location=?, notes=?, warranty_expiry=? WHERE id=? AND user_id=?`;
  const params = [name, category, purchase_date, store, price, resale_price, photo_url, location, notes, warranty_expiry, req.params.id, req.user.id];
  
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": { id: req.params.id, user_id: req.user.id, ...req.body },
      "changes": this.changes
    });
  });
});

app.delete('/api/assets/:id', authenticateToken, (req, res) => {
    const sql = 'DELETE FROM assets WHERE id = ? AND user_id = ?';
    db.run(sql, [req.params.id, req.user.id], function (err, result) {
        if (err) {
            res.status(400).json({ "error": res.message });
            return;
        }
        res.json({ message: "deleted", changes: this.changes });
    });
});

// --- Market Stats (Mock) ---
app.get('/api/market-stats', authenticateToken, (req, res) => {
    const { name, price, purchase_date } = req.query;
    
    // Deterministic mock generation based on name
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Simulate "market price" variance
    const basePrice = parseFloat(price);
    const variance = (hash % 20) + 10; // 10-30% variance
    const marketAverage = basePrice * (1 + (variance / 100)); // Market is usually more expensive than what "smart" users buy ;)

    let percentile = 70 + (hash % 29); // 70-99%
    
    if (parseFloat(price) > marketAverage) {
        percentile = 20 + (hash % 30);
    }

    let bestResaleDays = 180 + (hash % 200);
    let message = `Your purchase price is lower than ${percentile}% of users.`;

    if (name && name.toLowerCase().includes('iphone')) {
        const today = new Date();
        const month = today.getMonth() + 1;
        const day = today.getDate();

        if (month === 8 && day >= 15) {
             message = "⚠️ WARNING: New iPhone coming in September! Sell NOW to avoid 15% value drop.";
             bestResaleDays = 0;
        } else if (month === 9 && day <= 15) {
             message = "⚠️ URGENT: New iPhone launched. Prices dropping fast. Sell ASAP.";
             bestResaleDays = 0;
        } else {
             message = `iPhone retains value well. Best time to sell: Next August (before new launch).`;
             const currentYear = today.getFullYear();
             let nextAug = new Date(`${currentYear}-08-15`);
             if (today > nextAug) {
                 nextAug = new Date(`${currentYear + 1}-08-15`);
             }
             const diffTime = Math.abs(nextAug - today);
             bestResaleDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        }
    }
    
    res.json({
        percentile: percentile,
        market_average: marketAverage.toFixed(2),
        best_resale_days: bestResaleDays,
        message: message
    });
});

// --- AI Routes (Aliyun DashScope) ---

app.post('/api/ai/generate-card', authenticateToken, async (req, res) => {
    const { apiKey, assets, customPrompt } = req.body;

    if (!apiKey) {
        return res.status(400).json({ error: "Aliyun API Key is required" });
    }

    try {
        // 1. Analyze assets to build a smart prompt (Only if customPrompt is missing)
        const cars = assets.filter(a => a.category === 'Car').map(a => a.name).slice(0, 1);
        const gadgets = assets.filter(a => a.category !== 'Car').slice(0, 4).map(a => a.name).join('，');
        
        let vibe = "科技数码博主";
        let characterDesc = "穿着时尚卫衣的年轻极客男性";
        
        const categoryCount = {};
        assets.forEach(a => { categoryCount[a.category] = (categoryCount[a.category] || 0) + 1; });

        if (categoryCount['Camera'] > 1) { vibe = "摄影大师"; characterDesc = "穿着摄影马甲，戴着鸭舌帽的潮流摄影师"; }
        else if (categoryCount['Console'] > 0 || categoryCount['PC'] > 0) { vibe = "电竞玩家"; characterDesc = "戴着电竞耳机的酷炫游戏玩家"; }
        else if (categoryCount['Car'] > 0) { vibe = "玩车达人"; characterDesc = "穿着赛车服或休闲西装的成功男士"; }
        
        // Use custom prompt if provided, otherwise generate one
        let prompt = customPrompt;
        
        if (!prompt) {
             prompt = `一张高质量的3D IP形象海报。
            【主体形象】：画面中心是一个${characterDesc}，表情自信酷帅，代表${vibe}形象。3D盲盒公仔风格，二身头比例。
            【核心背景】：`;
            
            if (cars.length > 0) {
                prompt += `人物身后停着一辆酷炫的${cars[0]}，作为背景展示。`;
            } else {
                prompt += `背景是极简的科技感几何图形。`;
            }

            prompt += `
            【装饰元素】：人物身边悬浮环绕着精细的科技产品，包括：${gadgets}。这些物品以微缩模型的形式漂浮，构图平衡。
            【画面风格】：C4D渲染，OC渲染，泡泡玛特风格，粘土质感，柔和的影棚布光，高饱和度，8k分辨率，细节丰富，杰作。`;
        }

        // 2. Submit Task to Aliyun Wanx
        const submitResponse = await axios.post(
            'https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis',
            {
                model: "wanx-v1",
                input: {
                    prompt: prompt
                },
                parameters: {
                    style: "<auto>",
                    size: "1024*1024",
                    n: 1
                }
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'X-DashScope-Async': 'enable',
                    'Content-Type': 'application/json'
                }
            }
        );

        if (submitResponse.data.code) {
            throw new Error(submitResponse.data.message);
        }

        const taskId = submitResponse.data.output.task_id;

        // 3. Poll for result
        let attempts = 0;
        const maxAttempts = 30; // 30 * 2s = 60s max wait
        
        const pollResult = async () => {
            while (attempts < maxAttempts) {
                await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2s
                attempts++;

                const checkResponse = await axios.get(
                    `https://dashscope.aliyuncs.com/api/v1/tasks/${taskId}`,
                    {
                        headers: { 'Authorization': `Bearer ${apiKey}` }
                    }
                );

                const status = checkResponse.data.output.task_status;
                if (status === 'SUCCEEDED') {
                    return checkResponse.data.output.results[0].url;
                } else if (status === 'FAILED') {
                    throw new Error(checkResponse.data.output.message || "Generation failed");
                }
                // If PENDING or RUNNING, continue loop
            }
            throw new Error("Generation timed out");
        };

        const imageUrl = await pollResult();
        res.json({ imageUrl, vibe });

    } catch (error) {
        console.error("AI Generation Error:", error.response?.data || error.message);
        res.status(500).json({ error: error.message || "Failed to generate image" });
    }
});

// Catch all for React Router (Must be last)
app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
