import { Injectable } from '@angular/core';
import { methodProducts, Products } from '../models/products.models';


@Injectable({
  providedIn: 'root'
})

export class ProductService implements methodProducts {
  private products: Products[] = [];

  addProducto(product: Products): void {
    this.products.push(product);
  }

  getProductos(): Products[] {
    return this.products;
  }

  getProductoById(id: number): Products | undefined {
    return this.products.find(product => product.id === id);
  }

  updateProducto(product: Products): void {
    const index = this.products.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.products[index] = product;
    }
  }
}

