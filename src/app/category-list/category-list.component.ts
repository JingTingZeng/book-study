import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
  @Input() selected!: string;
  @Input() categories!: string[];
  @Output() selectCategory = new EventEmitter<string>();
}
