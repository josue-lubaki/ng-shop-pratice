import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { OrdersModule } from '@ghost/orders';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule, OrdersModule, RouterModule],
    declarations: [ProductsSearchComponent, CategoriesBannerComponent],
    exports: [ProductsSearchComponent, CategoriesBannerComponent]
})
export class ProductsModule {}
