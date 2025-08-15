import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './features/products/pages/product-list/product-list.component';
import { UserListComponent } from './features/users/pages/user-list/user-list.component';
import { StatisticsDashboardComponent } from './features/statistics/pages/statistics-dashboard/statistics-dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'statistics', pathMatch: 'full' },
  { path: 'products/list', component: ProductListComponent },
  { path: 'users/list', component: UserListComponent }, // Reemplaza con el componente adecuado
  { path: 'statistics', component: StatisticsDashboardComponent } // Asegúrate de tener este componente
];
/*
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}*/
