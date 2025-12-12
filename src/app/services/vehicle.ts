import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'myapp.vehicles';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private vehicles$ = new BehaviorSubject<Vehicle[]>(this.loadFromStorage());

  getAll(): Observable<Vehicle[]> { return this.vehicles$.asObservable(); }
  getSnapshot(): Vehicle[] { return this.vehicles$.getValue(); }
  findById(id: string) { return this.getSnapshot().find(v => v.id === id); }

  addVehicle(payload: Omit<Vehicle,'id'>) {
    const newV: Vehicle = { ...payload, id: uuidv4() };
    this.update([...this.getSnapshot(), newV]);
    return newV;
  }

  updateVehicle(id: string, patch: Partial<Vehicle>) {
    this.update(this.getSnapshot().map(v => v.id === id ? { ...v, ...patch } : v));
  }

  removeVehicle(id: string) {
    this.update(this.getSnapshot().filter(v => v.id !== id));
  }

  decrementCount(id: string, amount = 1) {
    this.update(this.getSnapshot().map(v => {
      if (v.id !== id) return v;
      return { ...v, count: Math.max(0, v.count - amount) };
    }));
  }

  private update(next: Vehicle[]) {
    this.vehicles$.next(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  private loadFromStorage(): Vehicle[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return [
          { id: 'h1', make: 'Hyundai', model: 'H1', count: 5, status: 'fleet', logoUrl: null },
          { id: 't1', make: 'Toyota', model: 'Hiace', count: 1, status: 'active', logoUrl: null },
          { id: 'q1', make: 'Toyota', model: 'Quantum', count: 8, status: 'service', logoUrl: null }
        ];
      }
      return JSON.parse(raw) as Vehicle[];
    } catch {
      return [];
    }
  }
}
