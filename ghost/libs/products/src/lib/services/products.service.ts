import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    apiURLProducts = environment.apiURL + 'products';

    constructor(private http: HttpClient) {}

    /**
     * Methode qui permet la récupération de toutes les Produits depuis le Backend
     * @returns Observable<Product[]>
     */
    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiURLProducts);
    }

    /**
     * Methode qui permet la récupération un Produit depuis le Backend via son ID
     * @param productID l'ID du Produit à récupérer
     * @returns Observable<Product>
     */
    getProduct(productID: string): Observable<Product> {
        return this.http.get<Product>(`${this.apiURLProducts}/${productID}`);
    }

    /**
     * Methode qui permet de créer une Categorie
     * @param productData le Produit à créer
     * @returns void
     */
    createProduct(productData: FormData): Observable<Product> {
        return this.http.post<Category>(this.apiURLProducts, productData);
    }

    /**
     * Methode qui permet de mettre à jour un Produit
     * @param productData la Produit à créer
     * @returns void
     */
    updateProduct(productData: FormData): Observable<Category> {
        return this.http.put<Category>(
            `${this.apiURLProducts}/${productData.get('id')}`,
            productData
        );
    }

    /**
     * Methode qui permet de supprimer une categorie
     * @param productId id du produit à supprimer
     */
    deleteProduct(productId: string): Observable<any> {
        return this.http.delete<any>(`${this.apiURLProducts}/${productId}`);
    }
}
