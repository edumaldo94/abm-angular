export interface metodosProducto {
  addProducto(producto: Producto): void;
  getProductos(): Producto[];
  getProductoById(id: number): Producto | undefined;
  updateProducto(producto: Producto): void;
}

export class Producto {

  constructor(
    public id: number,
    public nombre: string,
    public precio: number,
    public stock: number
  ) {}


}

