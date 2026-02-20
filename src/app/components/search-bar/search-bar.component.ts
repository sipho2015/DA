// src/app/components/search-bar/search-bar.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Output() search = new EventEmitter<string>();
  @Input() suggestions: string[] = [];
  query = '';

  onInput(value: string): void {
    this.query = value;
    this.search.emit(this.query.trim());
  }

  runSearch(): void {
    this.search.emit(this.query.trim());
  }

  pickSuggestion(value: string): void {
    this.query = value;
    this.search.emit(value);
  }
}
