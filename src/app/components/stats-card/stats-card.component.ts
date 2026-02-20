import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss']
})
export class StatsCardsComponent {
  @Input() fleetCount = 0;
  @Input() activeCount = 0;
  @Input() serviceCount = 0;
  @Input() documentationCount = 0;
  @Input() selected: 'all' | 'active' | 'service' | 'documentation' = 'all';

  @Output() selectStatus = new EventEmitter<'all' | 'active' | 'service' | 'documentation'>();

  select(value: 'all' | 'active' | 'service' | 'documentation'): void {
    this.selectStatus.emit(value);
  }
}
