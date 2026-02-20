
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Group {
  name: string;
  count: number;
  open?: boolean;
  plates: Array<{ id: string; plate: string }>;
}

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent {
  @Input() groups: Group[] = [];

  toggle(g: Group) {
    g.open = !g.open;
  }
}
