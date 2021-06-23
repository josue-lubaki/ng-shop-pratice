/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'products-product-page',
    templateUrl: './product-page.component.html',
    styles: []
})
export class ProductPageComponent implements OnInit, OnDestroy {
    product!: Product;
    quantity?: number; // quantité des products du client
    subs$: Subject<unknown> = new Subject();

    constructor(
        private productsService: ProductsService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params.productId) {
                this._getProduct(params.productId);
            }
        });
    }

    ngOnDestroy(): void {
        this.subs$.next();
        this.subs$.complete();
    }

    /**
     * Methode qui permet de récupérer un produit via son ID
     * @param id identifiant du produit à récupérer
     * @returns Product
     */
    private _getProduct(id: string) {
        this.productsService
            .getProduct(id)
            .pipe(takeUntil(this.subs$))
            .subscribe((product) => {
                this.product = product;
            });
    }

    addProductToCart() {}
}
