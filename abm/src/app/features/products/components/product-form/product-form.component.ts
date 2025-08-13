import { Component, EventEmitter, Input, Output, SimpleChanges, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../shared/models/product.models';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnChanges {
  @Input() product: Product | null = null;
  @Output() save = new EventEmitter<Omit<Product, 'id'>>();
  @Output() cancel = new EventEmitter<void>();

  name = '';
  price = 0;
  stock = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      this.name = this.product.name;
      this.price = this.product.price;
      this.stock = this.product.stock;
    } else {
      this.clearForm();
    }
  }

  submitForm() {
    if (!this.name || this.price <= 0 || this.stock < 0) {
      alert('Datos inválidos');
      return;
    }
    this.save.emit({ name: this.name, price: this.price, stock: this.stock });
    this.clearForm();
  }

  clearForm() {
    this.name = '';
    this.price = 0;
    this.stock = 0;
  }
}
