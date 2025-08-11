export interface methodProducts {
  addProducto(products: Products): void;
  getProductos(): Products[];
  getProductoById(id: number): Products | undefined;
  updateProducto(product: Products): void;
}

export class Products {

  constructor(
    public id: number,
    public name: string,
    public price: number,
    public stock: number
  ) {}


}

