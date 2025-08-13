import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.services';
import { Product } from '../../../../shared/models/product.models';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductFormComponent,NgxPaginationModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product | null = null;
  isModalOpen = false;

  page: number = 1; // 👈 Agregado: controla la página actual

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.products = this.productService.getAll();
  }

  onCreate() {
    this.selectedProduct = null;
    this.isModalOpen = true;
  }

  onEdit(product: Product) {
    this.selectedProduct = product;
    this.isModalOpen = true;
  }

  onSave(productData: Omit<Product, 'id'>) {
    if (this.selectedProduct) {
      this.productService.update(this.selectedProduct.id, productData);
    } else {
      this.productService.create(productData);
    }
    this.loadProducts();
    this.isModalOpen = false;
    this.selectedProduct = null;
  }

  onDelete(id: number) {
    this.productService.delete(id);
    this.loadProducts();
  }

  onCancel() {
    this.isModalOpen = false;
    this.selectedProduct = null;
  }
}
