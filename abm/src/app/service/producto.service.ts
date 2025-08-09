import { Injectable } from '@angular/core';
import { metodosProducto, Producto } from '../models/producto.models';


@Injectable({
  providedIn: 'root'
})

export class ProductoService implements metodosProducto {
  private productos: Producto[] = [];

  addProducto(producto: Producto): void {
    this.productos.push(producto);
  }

  getProductos(): Producto[] {
    return this.productos;
  }

  getProductoById(id: number): Producto | undefined {
    return this.productos.find(producto => producto.id === id);
  }

  updateProducto(producto: Producto): void {
    const index = this.productos.findIndex(p => p.id === producto.id);
    if (index !== -1) {
      this.productos[index] = producto;
    }
  }
}

