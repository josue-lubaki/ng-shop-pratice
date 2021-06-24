/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '@ghost/users';
import { OrderItem } from '@ghost/orders';

@Component({
    selector: 'orders-checkout-page',
    templateUrl: './checkout-page.component.html',
    styles: []
})
export class CheckoutPageComponent implements OnInit {
    checkoutFormGroup!: FormGroup;
    isSubmitted = false;
    orderItems: OrderItem[] = [];
    userId?: string;
    countries: unknown[] = [];

    constructor(
        private router: Router,
        private userService: UsersService,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.initCheckoutForm();
        this._getCountries();
    }

    private initCheckoutForm() {
        this.checkoutFormGroup = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.email, Validators.required]],
            phone: ['', Validators.required],
            city: ['', Validators.required],
            country: ['', Validators.required],
            zip: ['', Validators.required],
            apartment: ['', Validators.required],
            street: ['', Validators.required]
        });
    }

    /**
     * Methode qui permet de récupérer tous les noms de pays
     * @returns string[]
     */
    private _getCountries() {
        this.countries = this.userService.getCountries();
    }

    /**
     * Methode qui permet de revenir au panier
     * @return void
     */
    backToCart() {
        this.router.navigate(['/cart']);
    }

    /**
     * Methode qui permet de procéder à l'achat des articles
     * @returns void
     */
    placeOrder() {
        this.isSubmitted = true;
        if (this.checkoutFormGroup.invalid) {
            return;
        }
    }

    /**
     * Getter du formulaire checkoutFormGroup
     * @returns FormGroup.Controls
     */
    get checkoutForm() {
        return this.checkoutFormGroup.controls;
    }
}
