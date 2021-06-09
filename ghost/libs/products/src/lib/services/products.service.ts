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

    // /**
    //  * Methode qui permet de créer une Categorie
    //  * @param category la categorie à créer
    //  * @returns void
    //  */
    // createCategory(category: Category): Observable<Category> {
    //     return this.http.post<Category>(this.apiURLCategories, category);
    // }

    // /**
    //  * Methode qui permet de créer une Categorie
    //  * @param category la categorie à créer
    //  * @returns void
    //  */
    // updateCategory(category: Category): Observable<Category> {
    //     return this.http.put<Category>(
    //         `${this.apiURLCategories}/${category.id}`,
    //         category
    //     );
    // }

    // /**
    //  * Methode qui permet de supprimer une categorie
    //  * @param categoryId id de la categorie à supprimer
    //  */
    // deleteCategory(categoryId: string): Observable<any> {
    //     return this.http.delete<any>(`${this.apiURLCategories}/${categoryId}`);
    // }
}
