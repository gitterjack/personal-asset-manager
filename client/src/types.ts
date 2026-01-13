export interface Asset {
  id: number;
  name: string;
  category: string;
  purchase_date: string;
  store: string;
  price: number;
  resale_price?: number;
  photo_url?: string;
  location?: string;
  notes?: string;
  warranty_expiry?: string;
  created_at?: string;
}

export type NewAsset = Omit<Asset, 'id' | 'created_at'>;
