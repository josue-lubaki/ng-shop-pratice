/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    constructor() {}

    initCartLocalStorage() {
        const initialCart = {
            items: []
        };

        const initialCartJSON = JSON.stringify(initialCart);
        localStorage.setItem('cart', initialCartJSON);
    }
}
