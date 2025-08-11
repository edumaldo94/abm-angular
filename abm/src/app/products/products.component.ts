import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Products, methodProducts } from '../models/products.models';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule], // 👈 Agrega FormsModule aquí
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements methodProducts {
  products: Products[] = [];
  selectedProduct: Products | null = null;

  // Form fields
  formName: string = '';
  formPrice: number = 0;
  formStock: number = 0;

  constructor() {
    const savedData = localStorage.getItem('products');
    if (savedData) {
      this.products = JSON.parse(savedData);
    }
  }
  addProducto(products: Products): void {
    throw new Error('Method not implemented.');
  }
  getProductos(): Products[] {
    throw new Error('Method not implemented.');
  }
  getProductoById(id: number): Products | undefined {
    throw new Error('Method not implemented.');
  }
  updateProducto(product: Products): void {
    throw new Error('Method not implemented.');
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  // ===== BUSINESS LOGIC =====
  addProduct(product: Products): void {
    this.products.push(product);
    this.saveToLocalStorage();
  }

  getProducts(): Products[] {
    return this.products;
  }

  getProductById(id: number): Products | undefined {
    return this.products.find(p => p.id === id);
  }

  updateProduct(updatedProduct: Products): void {
    const index = this.products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
      this.saveToLocalStorage();
    }
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter(p => p.id !== id);
    this.saveToLocalStorage();
  }

  selectProduct(product: Products): void {
    this.selectedProduct = { ...product };
    this.formName = product.name;
    this.formPrice = product.price;
    this.formStock = product.stock;
  }

  clearSelection(): void {
    this.selectedProduct = null;
    this.formName = '';
    this.formPrice = 0;
    this.formStock = 0;
  }

  // ===== FORM HANDLERS =====
  submitForm(): void {
    if (!this.formName || this.formPrice <= 0 || this.formStock < 0) {
      alert('Invalid data');
      return;
    }

    if (this.selectedProduct) {
      // Edit mode
      const updatedProduct = new Products(
        this.selectedProduct.id,
        this.formName,
        this.formPrice,
        this.formStock
      );
      this.updateProduct(updatedProduct);
    } else {
      // Add mode
      const newProduct = new Products(
        Date.now(),
        this.formName,
        this.formPrice,
        this.formStock
      );
      this.addProduct(newProduct);
    }

    this.clearSelection();
  }
}

