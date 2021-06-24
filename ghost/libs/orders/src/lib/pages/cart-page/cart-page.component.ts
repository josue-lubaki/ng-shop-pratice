/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '@ghost/products';
import { CartItemDetails } from '../../models/cart';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'orders-cart-page',
    templateUrl: './cart-page.component.html',
    styles: []
})
export class CartPageComponent implements OnInit, OnDestroy {
    cartItemdetails: CartItemDetails[] = [];
    cartCount = 0;
    endSubs$: Subject<any> = new Subject();

    constructor(
        private router: Router,
        private cartService: CartService,
        private productsService: ProductsService
    ) {}

    ngOnInit(): void {
        this._getCartDetails();
    }

    ngOnDestroy(): void {
        this.endSubs$.next();
        this.endSubs$.complete();
    }

    private _getCartDetails() {
        this.cartService.cart$
            .pipe(takeUntil(this.endSubs$))
            .subscribe((responseCart) => {
                this.cartItemdetails = [];
                this.cartCount = responseCart?.items?.length ?? 0;

                responseCart.items.forEach((cartItem: any) => {
                    this.productsService
                        .getProduct(cartItem.productId)
                        .subscribe((responseProduct) => {
                            this.cartItemdetails.push({
                                product: responseProduct,
                                quantity: cartItem.quantity
                            });
                        });
                });
            });
    }

    backToShop() {
        this.router.navigate(['/products']);
    }

    deleteCartItem(cartItem: CartItemDetails) {
        this.cartService.deleteCartItem(cartItem.product.id);
    }
}
