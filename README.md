# Alive (活着) - Personal Asset Manager 📱💰

> **"Frictionless tracking, financial insight, digital legacy."**

Alive is a comprehensive personal asset management platform designed to help you track everything you own, understand the true cost of your consumption, and manage your digital legacy with ease.

---

## 🌟 Core Philosophy

We believe that managing assets shouldn't be a chore. Alive focuses on:
- **Frictionless Tracking**: Quickly log physical and digital assets.
- **Financial Insight**: Move beyond simple price tags to understand **Cost Per Day (CPD)** and market trends.
- **Digital Legacy**: Ensure your digital footprint and assets are passed on securely and intentionally.

---

## 🛠 Key Modules

### 📊 Asset Manager
- **Dynamic Dashboard**: Real-time summary of your total asset count and net value.
- **Cost Per Day (CPD)**: Automatically calculates how much your gadgets really cost you every day you own them.
- **Market Stats (Intelligent Insights)**: Get percentile rankings comparing your purchase price with other users.
- **Resale Guide**: Integrated with **Goofish (闲鱼)** for quick valuation. Features the **"iPhone 8-Month Rule"** — smart warnings to sell your devices before the annual value drop.

### 🤝 Community
- **Retention & Diving Rankings**: Discover which products are "financial instruments" (Fujifilm X100VI) and which are "divers" (Samsung Galaxy S-series).
- **User Feed**: Share your "Spending Journals" (败家日记) or celebrate a "Successful Resale" (回血成功) with the community.
- **Annual Reports**: Generate a personalized "2026 Consumption & Investment Report" to visualize your yearly spending habits.


### 🔐 Digital Assets & Legacy
- **The Vault**: A secure place for subscription accounts (Netflix), Crypto wallets (BTC), and Insurance policies.
- **Privacy Drive**: Support for local encrypted hardware connection. Your sensitive data stays on *your* drive, not our cloud.
- **Digital Will & Legacy**: Create a "Digital Epitaph" or a private testament. Triggered by a "30-day silence" mechanism, your assets can be automatically shared with designated beneficiaries.

### 👤 Profile & Network
- **Personal Info**: Track your financial journey across different life stages.
- **Family Tree**: Connect with family members to manage shared assets and legacy plans.
- **Net Worth Summary**: A consolidated view of your physical, digital, and financial standing.

### 💎 Business Model
- **Zero-Fee Subscription**: A revolutionary "Interest-Covered" model. By maintaining a balance in partner funds (like Yu'e Bao), the interest covers your monthly subscription fee automatically.
- **Transparent Monetization**: Clear information on commissions and minimal, non-intrusive ads.

---

## 🚀 Tech Stack

- **Frontend**: 
  - [React 19](https://react.dev/) - Modern UI components.
  - [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first styling.
  - [Lucide Icons](https://lucide.dev/) - Beautiful, consistent iconography.
  - [Vite](https://vitejs.dev/) - Lightning-fast build tool.
- **Backend**: 
  - [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/) - Robust API layer.
  - [SQLite](https://www.sqlite.org/) - Lightweight, reliable database.
- **AI Integration**:
  - [Aliyun DashScope (Wanx-v1)](https://help.aliyun.com/product/271257.html) - Generates custom 3D IP avatars based on your asset profile.

---

## 💻 Setup Guide

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 1. Backend Setup
```bash
cd server
npm install
node index.js
```
The server will run on `http://localhost:3002`.

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```
Open your browser and navigate to the URL provided by Vite (usually `http://localhost:5173`).

### 3. Docker (Production)
You can also run the entire stack using Docker:
```bash
docker build -t alive-app .
docker run -p 3001:3001 -v $(pwd)/data:/app/server/data alive-app
```
In production mode, the app is served on `http://localhost:3001`.

---

## 🗺 Future Roadmap

- [ ] **Real OCR**: Snap a photo of a receipt to automatically log an asset.
- [ ] **Banking API Integration**: Sync transactions directly from your bank for automated tracking.
- [ ] **Blockchain Integration**: Use decentralized tech for immutable legacy verification and smart contract-based inheritance.
- [ ] **Mobile App**: Native iOS and Android versions for on-the-go tracking.

---

## 📄 License

Copyright © 2026 Alive Project. All rights reserved.
