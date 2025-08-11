import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../shared/models/product.models';
import { ProductService } from '../../services/product.services'; // Importa el servicio

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  @Input() product: Product | null = null;
  @Output() save = new EventEmitter<Omit<Product, 'id'>>();
  @Output() cancel = new EventEmitter<void>();

  name = '';
  price = 0;
  stock = 0;

  constructor(private productService: ProductService) {} // Inyecta el servicio

  ngOnChanges() {
    if (this.product) {
      this.name = this.product.name;
      this.price = this.product.price;
      this.stock = this.product.stock;
    }
  }

  submitForm() {
    if (!this.name || this.price <= 0 || this.stock < 0) {
      alert('Datos inválidos');
      return;
    }
    // Guarda el producto usando el servicio
    this.productService.create({ name: this.name, price: this.price, stock: this.stock });
    alert('Producto creado');
    this.clearForm();
  }

  clearForm() {
    this.name = '';
    this.price = 0;
    this.stock = 0;
  }
}
