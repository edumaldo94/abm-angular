import { Injectable } from '@angular/core';
import { Product } from '../../../shared/models/product.models';
import { StorageService } from '../../../core/services/storage.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly storageKey = 'products';

  constructor(private storage: StorageService) {}

  getAll(): Product[] {
    return this.storage.getItem<Product>(this.storageKey);
  }

  create(product: Omit<Product, 'id'>): Product {
    const products = this.getAll();
    const newProduct: Product = { id: Date.now(), ...product };
    products.push(newProduct);
    this.storage.setItem(this.storageKey, products);
    return newProduct;
  }

  update(id: number, data: Partial<Product>): Product | null {
    const products = this.getAll();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;

    const updatedProduct = { ...products[index], ...data };
    products[index] = updatedProduct;
    this.storage.setItem(this.storageKey, products);
    return updatedProduct;
  }

  delete(id: number): void {
    const products = this.getAll().filter(p => p.id !== id);
    this.storage.setItem(this.storageKey, products);
  }
}
