import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.services';
import { Product } from '../../../../shared/models/product.models';
import { ProductFormComponent } from '../../components/product-form/product-form.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductFormComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.products = this.productService.getAll();
  }

  onSave(productData: Omit<Product, 'id'>) {
    if (this.selectedProduct) {
      this.productService.update(this.selectedProduct.id, productData);
    } else {
      this.productService.create(productData);
    }
    this.selectedProduct = null;
    this.loadProducts();
  }

  onEdit(product: Product) {
    this.selectedProduct = product;
  }

  onDelete(id: number) {
    this.productService.delete(id);
    this.loadProducts();
  }

  onCancel() {
    this.selectedProduct = null;
  }
}
