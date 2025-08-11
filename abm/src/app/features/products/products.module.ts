import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule,
    ProductListComponent,
    ProductFormComponent
  ]
})
export class ProductsModule {}
