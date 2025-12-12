export interface Vehicle {
  id: string;
  make: string;
  model: string;
  count: number;
  status?: 'active' | 'service' | 'fleet';
  logoUrl?: string | null; // base64 or URL
  notes?: string;
}
