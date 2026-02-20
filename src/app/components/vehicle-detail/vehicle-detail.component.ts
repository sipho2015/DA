import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { VehicleService } from '../../services/vehicle';
import { Vehicle } from '../../models/vehicle.model';

@Component({
  selector: 'app-vehicle-detail',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss'],
})
export class VehicleDetailComponent {
  vehicle: Vehicle | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'Vehicle id is missing.';
      this.loading = false;
      return;
    }

    this.vehicleService.getById(id).subscribe({
      next: (vehicle) => {
        this.vehicle = vehicle;
        this.loading = false;
      },
      error: () => {
        this.error = 'Vehicle not found or backend unavailable.';
        this.loading = false;
      }
    });
  }
}
