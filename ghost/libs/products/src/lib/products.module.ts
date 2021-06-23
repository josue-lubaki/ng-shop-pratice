import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ButtonModule } from 'primeng/button';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: 'products',
        component: ProductsListComponent
    }
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ButtonModule,
        CheckboxModule,
        FormsModule
    ],
    declarations: [
        FeaturedProductsComponent,
        ProductsSearchComponent,
        CategoriesBannerComponent,
        ProductItemComponent,
        ProductsListComponent
    ],
    exports: [
        ProductsSearchComponent,
        FeaturedProductsComponent,
        CategoriesBannerComponent,
        ProductItemComponent,
        ProductsListComponent
    ]
})
export class ProductsModule {}
