import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-stats-cards',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss']
})
export class StatsCardsComponent {
  // each and every time constructors must be inside the class
  constructor(private router: Router) {}

  // l used this method to navigate to AddVehicleComponent
  Vehicle(): void {
    this.router.navigate(['/add-vehicle']);
  }
}
