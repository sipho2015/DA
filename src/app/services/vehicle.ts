import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private readonly baseUrl = '/api/vehicles';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.baseUrl);
  }

  getById(id: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.baseUrl}/${id}`);
  }

  create(payload: {
    make: string;
    model: string;
    year: number;
    plate: string;
    status: 'active' | 'service' | 'documentation';
  }): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.baseUrl, payload);
  }

  update(
    id: string,
    payload: {
      make: string;
      model: string;
      year: number;
      plate: string;
      status: 'active' | 'service' | 'documentation';
    }
  ): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
