import { Component } from '@angular/core';
import { ProductFormComponent } from './features/products/components/product-form/product-form.component';
import { ProductListComponent } from './features/products/pages/product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from "./core/layout/footer/footer.component";
import { SidebarComponent } from "./core/layout/sidebar/sidebar.component";
import { HeaderComponent } from "./core/layout/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, FooterComponent, SidebarComponent, HeaderComponent],
 templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
