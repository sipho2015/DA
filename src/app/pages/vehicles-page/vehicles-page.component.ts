import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VehicleService } from '../../services/vehicle';
import { Vehicle } from '../../models/vehicle.model';

import { StatsCardsComponent } from '../../components/stats-card/stats-card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { VehicleListComponent } from '../../components/vehicle-list/vehicle-list.component';

@Component({
  selector: 'app-vehicles-page',
  standalone: true,
  imports: [
    CommonModule,
    StatsCardsComponent,
    SearchBarComponent,
    VehicleListComponent,
  ],
  templateUrl: './vehicles-page.component.html',
  styleUrls: ['./vehicles-page.component.scss']
})
export class VehiclesPageComponent implements OnInit {
  constructor(
    private router: Router,
    private vehicleService: VehicleService
  ) {}

  searchTerm = '';
  statusFilter: 'all' | 'active' | 'service' | 'documentation' = 'all';
  loading = false;
  error = '';

  groups: Array<{ name: string; count: number; plates: Array<{ id: string; plate: string }>; open?: boolean }> = [];

  private vehicles: Vehicle[] = [];

  ngOnInit(): void {
    this.refresh();
  }

  get fleetCount(): number {
    return this.vehicles.length;
  }

  get activeCount(): number {
    return this.vehicles.filter(v => v.status === 'active').length;
  }

  get serviceCount(): number {
    return this.vehicles.filter(v => v.status === 'service').length;
  }

  get documentationCount(): number {
    return this.vehicles.filter(v => v.status === 'documentation').length;
  }

  get summaryLabel(): string {
    if (this.statusFilter === 'active') {
      return `Active vehicles: ${this.activeCount}`;
    }
    if (this.statusFilter === 'service') {
      return `Service vehicles: ${this.serviceCount}`;
    }
    if (this.statusFilter === 'documentation') {
      return `Documentation vehicles: ${this.documentationCount}`;
    }
    return `Total fleet: ${this.fleetCount}`;
  }

  private refresh(): void {
    this.loading = true;
    this.error = '';

    this.vehicleService.getAll().subscribe({
      next: (vehicles) => {
        this.vehicles = vehicles;
        this.buildGroups();
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load vehicles from the backend API.';
        this.groups = [];
        this.loading = false;
      }
    });
  }

  private buildGroups(): void {
    const term = this.searchTerm.trim().toLowerCase();
    const filtered = this.vehicles.filter(v => {
      const matchesStatus = this.statusFilter === 'all' || v.status === this.statusFilter;
      const vehicleType = `${v.make} - ${v.model}`;
      const matchesTerm = term === '' || vehicleType.toLowerCase().includes(term);
      return matchesStatus && matchesTerm;
    });

    const map = new Map<string, Array<{ id: string; plate: string }>>();
    for (const v of filtered) {
      const vehicleType = `${v.make} - ${v.model}`;
      const list = map.get(vehicleType) ?? [];
      list.push({ id: v.id, plate: v.plate });
      map.set(vehicleType, list);
    }

    this.groups = Array.from(map.entries()).map(([name, plates]) => ({
      name,
      count: plates.length,
      plates,
      open: false
    }));
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.buildGroups();
  }

  onStatusChange(value: 'all' | 'active' | 'service' | 'documentation'): void {
    this.statusFilter = value;
    this.buildGroups();
  }

  get suggestions(): string[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      return [];
    }
    const types = Array.from(new Set(this.vehicles.map(v => `${v.make} - ${v.model}`)));
    return types.filter(t => t.toLowerCase().includes(term)).slice(0, 6);
  }

  goToAddVehicle(): void {
    this.router.navigate(['/add-vehicle']);
  }
}

