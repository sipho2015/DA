
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router'; 
import { routes } from './app.routes';
import { HeaderComponent } from './components/header/header.component';
import { StatsCardsComponent } from './components/stats-card/stats-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { VehicleDetailComponent } from './components/vehicle-detail/vehicle-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    StatsCardsComponent,
    SearchBarComponent,
    VehicleListComponent,
    AddVehicleComponent,
    VehicleDetailComponent,
    RouterModule
],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {}
