/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'orders-cart-page',
    templateUrl: './cart-page.component.html',
    styles: []
})
export class CartPageComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {}

    backToShop() {
        this.router.navigate(['/products']);
    }

    deleteCartItem() {}
}
