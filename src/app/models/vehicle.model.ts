export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  plate: string;
  status: 'active' | 'service' | 'documentation';
  createdAtUtc: string;
}
