import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    apiURLOrders = environment.apiURL + 'orders';

    constructor(private http: HttpClient) {}

    /**
     * Methode qui permet la récupération de toutes les Orders depuis le Backend
     * @returns Observable<Order[]>
     */
    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.apiURLOrders);
    }

    /**
     * Methode qui permet la récupération une categorie depuis le Backend via son ID
     * @param categoryId l'ID de la categorie à récupérer
     * @returns Observable<Order>
     */
    getOrder(categoryId: string): Observable<Order> {
        return this.http.get<Order>(`${this.apiURLOrders}/${categoryId}`);
    }

    /**
     * Methode qui permet de créer une Categorie
     * @param category la categorie à créer
     * @returns void
     */
    createOrder(category: Order): Observable<Order> {
        return this.http.post<Order>(this.apiURLOrders, category);
    }

    /**
     * Methode qui permet de créer une Categorie
     * @param category la categorie à créer
     * @returns void
     */
    updateOrder(category: Order): Observable<Order> {
        return this.http.put<Order>(`${this.apiURLOrders}/${category.id}`, category);
    }

    /**
     * Methode qui permet de supprimer une categorie
     * @param categoryId id de la categorie à supprimer
     */
    deleteOrder(categoryId: string): Observable<any> {
        return this.http.delete<any>(`${this.apiURLOrders}/${categoryId}`);
    }
}
