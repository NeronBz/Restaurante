import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsPageComponent } from './page/products-page.component';
import { OnlyProductPageComponent } from './only-product/only-product-page.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsPageComponent,
    children: [
      {
        path: '{id}',
        component: OnlyProductPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantRoutingModule {}
