/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@ghost/orders';
import { ProductsService } from '@ghost/products';
import { UsersService } from '@ghost/users';
import { combineLatest } from 'rxjs';

@Component({
    selector: 'admin-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    statistics: any = [];

    constructor(
        private usersService: UsersService,
        private orderService: OrdersService,
        private productService: ProductsService
    ) {}

    ngOnInit(): void {
        combineLatest([
            this.orderService.getOrdersCount(),
            this.productService.getProductsCount(),
            this.usersService.getUsersCount(),
            this.orderService.getOrdersTotalSales()
        ]).subscribe((values) => {
            this.statistics = values;
        });
    }
}
