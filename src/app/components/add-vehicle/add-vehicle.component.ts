import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { VehicleService } from '../../services/vehicle';

@Component({
  selector: 'app-add-vehicle',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent {
  vehicleForm: FormGroup;
  saving = false;
  saveError = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private vehicleService: VehicleService
  ) {
    //i will have to create the form structure here so that the template can bind to it
    this.vehicleForm = this.fb.group({
      make: ['', [Validators.required, Validators.maxLength(50)]],
      model: ['', [Validators.required, Validators.maxLength(50)]],
      year: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]],
      plate: ['', [Validators.required, Validators.maxLength(15)]],
      status: ['active', Validators.required]
    });
  }

  // it should be called when user clicks Save
  save(): void {
    if (this.vehicleForm.invalid) {
      this.vehicleForm.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.saveError = '';
    const formValue = this.vehicleForm.value;

    this.vehicleService.create({
      make: formValue.make,
      model: formValue.model,
      year: Number(formValue.year),
      plate: formValue.plate,
      status: formValue.status
    }).subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/vehicles']);
      },
      error: () => {
        this.saving = false;
        this.saveError = 'Could not save vehicle. Check backend API connection.';
      }
    });
  }

  // It should be called when user clicks Cancel
  cancel(): void {
    this.router.navigate(['/vehicles']);
  }

  // Getters for easy access to form controls in the template
  get make() { return this.vehicleForm.get('make'); }
  get model() { return this.vehicleForm.get('model'); }
  get year() { return this.vehicleForm.get('year'); }
  get plate() { return this.vehicleForm.get('plate'); }
  get status() { return this.vehicleForm.get('status'); }
}
