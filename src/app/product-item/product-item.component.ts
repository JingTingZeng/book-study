import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../data/entities';

export type productSelection = {
  product: Product,
  quantity: number
}

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<productSelection>();

  quantity = 1;

  handleAddToCart() {
    this.addToCart.emit({
      product: this.product,
      quantity: Number(this.quantity)
    })
  }

}
