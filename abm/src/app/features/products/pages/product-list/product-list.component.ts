import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.services';
import { Product } from '../../../../shared/models/product.models';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table'; // opcional si usás <mat-table>

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductFormComponent,NgxPaginationModule, FormsModule, MatPaginatorModule, MatTableModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  public products: Product[] = [];
  selectedProduct: Product | null = null;
  isModalOpen = false;


  page: number = 1; // 👈 Agregado: controla la página actual
searchText: string = '';
itemsPerPage: number = 5;
pageIndex = 0;
  pageSize = 5;
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


// Método para filtrar productos según el buscador
get filteredProducts(): Product[] {
  if (!this.searchText) return this.products;
  return this.products.filter(p =>
    p.name.toLowerCase().includes(this.searchText.toLowerCase())
  );
}
get paginatedProducts(): Product[] {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredProducts.slice(start, end);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

}
