/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../models/cart';
export const CART_KEY = 'cart';
@Injectable({
    providedIn: 'root'
})
export class CartService {
    cart?: string;
    constructor() {}

    /**
     * Methode qui permet d'initialiser les contenus de la Cart dans le LocalStorage
     */
    initCartLocalStorage() {
        const cart: Cart = this.getCart();
        if (!cart) {
            const initialCart = {
                items: []
            };
            const initialCartJSON = JSON.stringify(initialCart);
            localStorage.setItem(CART_KEY, initialCartJSON);
        }
    }

    getCart(): Cart {
        const cartJSONString: string = localStorage.getItem(CART_KEY) || '{}';
        const cart: Cart = JSON.parse(cartJSONString);
        return cart;
    }

    /**
     * Methode qui permet d'ajouter le cartItem dans le LocalStorage
     * @param cartItem Item à enregistrer
     * @returns Cart
     */
    setCartItem(cartItem: CartItem): Cart {
        const cart = this.getCart();
        const cartItemExist = cart.items?.find(
            (item) => item.productId === cartItem.productId
        );

        if (cartItemExist) {
            cart.items?.map((item) => {
                if (item.productId === cartItem.productId) {
                    item.quantity = item.quantity
                        ? cartItem.quantity
                            ? item.quantity + cartItem.quantity
                            : cartItem.quantity
                        : cartItem.quantity;
                }
                return item;
            });
        } else {
            cart.items?.push(cartItem);
        }

        const initialCartJSON = JSON.stringify(cart);
        localStorage.setItem(CART_KEY, initialCartJSON);
        return cart;
    }
}
