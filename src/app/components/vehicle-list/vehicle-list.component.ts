
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Group {
  name: string;
  count: number;
  open?: boolean;
  items?: any[];
}

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent {
  groups: Group[] = [];

  ngOnInit(): void {
    this.groups = [
      { name: 'Hyundai - H1', count: 5, open: false },
      { name: 'Toyota Hiace', count: 1, open: false },
      { name: 'Toyota Quantum', count: 8, open: false },
      { name: 'Coaster', count: 5, open: false },
      { name: 'Yutong Bus', count: 4, open: false }
    ];
  }

  toggle(g: Group) {
    g.open = !g.open;
  }
}
