import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@ghost/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../order.constants';

@Component({
    selector: 'admin-orders-list',
    templateUrl: './orders-list.component.html',
    styles: []
})
export class OrdersListComponent implements OnInit {
    orders: Order[] = [];
    orderStatus = ORDER_STATUS;

    constructor(
        private ordersService: OrdersService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._getOrders();
    }

    /**
     * Methode qui permet de supprimer une Categorie
     * @param orderId id de la order à Supprimer
     */
    deleteOrder(orderId: string) {
        this.confirmationService.confirm({
            message: 'Do you want to Delete this order ?',
            header: 'Delete Orders',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.ordersService.deleteOrder(orderId).subscribe(
                    () => {
                        this._getOrders();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Order is deleted'
                        });
                    },
                    () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Order is not deleted !'
                        });
                    }
                );
            },
            reject: () => {}
        });
    }

    showOrder(orderId: string) {
        this.router.navigateByUrl(`orders/${orderId}`);
    }

    /**
     * Getter qui permet de reécupérer toutes les order
     * @return Orders[]
     */
    private _getOrders() {
        this.ordersService.getOrders().subscribe((order) => {
            this.orders = order;
        });
    }

    /**
     * Methode qui permet la mise à jour d'une Categorie
     * @param orderId : L'Id de la categorie à mettre à jour
     * @returns void
     */
    updateOrders(orderId: string) {
        this.router.navigateByUrl(`order/form/${orderId}`);
    }
}
