import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-new-vehicles',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],

  templateUrl: './new-vehicles.component.html',
  styleUrls: ['./new-vehicles.component.scss']
})
export class AddVehicleComponent {
  vehicleForm: FormGroup;
  saving = false;

  constructor(private fb: FormBuilder, private router: Router) {
    //i will have to create the form structure here so that the template can bind to it
    this.vehicleForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      model: ['', [Validators.required, Validators.maxLength(50)]],
      year: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]],
      plate: ['', [Validators.required, Validators.maxLength(15)]]
    });
  }

  // it should be called when user clicks Save
  save(): void {
    if (this.vehicleForm.invalid) {
      this.vehicleForm.markAllAsTouched();
      return;
    }

    this.saving = true;
    const newVehicle = this.vehicleForm.value;
    console.log('Saving vehicle (stub):', newVehicle);

    // I am to replaace this one with actual save logic later
    setTimeout(() => {
      this.saving = false;
      this.router.navigate(['/vehicles']);
    }, 600);
  }

  // It should be called when user clicks Cancel
  cancel(): void {
    this.router.navigate(['/vehicles']);
  }

  // Getters for easy access to form controls in the template
  get name() { return this.vehicleForm.get('name'); }
  get model() { return this.vehicleForm.get('model'); }
  get year() { return this.vehicleForm.get('year'); }
  get plate() { return this.vehicleForm.get('plate'); }
  get zinara(){ return this.vehicleForm.get('zinara'); }
  get cof(){ return this.vehicleForm.get('cof'); }
  get mileage(){ return this.vehicleForm.get('mileage'); }

}
