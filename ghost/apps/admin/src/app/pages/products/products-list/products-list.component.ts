/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from '@ghost/products';

@Component({
    selector: 'admin-products-list',
    templateUrl: './products-list.component.html',
    styles: []
})
export class ProductsListComponent implements OnInit {
    products: Product[] = [];
    constructor(private productService: ProductsService) {}

    ngOnInit(): void {
        this._getProducts();
    }

    /**
     * Getter qui permet de récupérer toutes les produits
     * @return Product[]
     */
    private _getProducts() {
        this.productService.getProducts().subscribe((product) => {
            this.products = product;
        });
    }

    deleteProduct(productId: string) {
        return null;
    }

    updateProduct(productId: string) {
        return null;
    }
}
