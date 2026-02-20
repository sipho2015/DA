import { Routes } from '@angular/router';
import { VehicleDetailComponent } from './components/vehicle-detail/vehicle-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'vehicles', pathMatch: 'full' },

  // My main vehicles page
  {
    path: 'vehicles',
    loadComponent: () =>
      import('./pages/vehicles-page/vehicles-page.component')
        .then(m => m.VehiclesPageComponent)
  },

  // My page to add a vehicle
  {
    path: 'add-vehicle',
    loadComponent: () =>
      import('./components/add-vehicle/add-vehicle.component')
        .then(m => m.AddVehicleComponent)
  },

  // Vehicle detail page
  {
    path: 'vehicles/:id',
    component: VehicleDetailComponent
  },

  // Alternate path to add a vehicle
  {
    path: 'vehicles/new',
    loadComponent: () =>
      import('./components/add-vehicle/add-vehicle.component')
        .then(m => m.AddVehicleComponent)
  }
];
