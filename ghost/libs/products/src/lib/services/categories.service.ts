import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    constructor(private http: HttpClient) {}

    /**
     * Methode qui permet la récupération de toutes les categories depuis le Backend
     * @returns Observable<Category[]>
     */
    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(
            'http://localhost:3000/api/v1/categories/'
        );
    }

    /**
     * Methode qui permet de créer une Categorie
     * @param category la categorie à créer
     * @returns void
     */
    createCategory(category: Category): Observable<Category> {
        return this.http.post<Category>(
            'http://localhost:3000/api/v1/categories/',
            category
        );
    }

    /**
     * Methode qui permet de supprimer une categorie
     * @param categoryId id de la categorie à supprimer
     */
    deleteCategory(categoryId: String): Observable<Object> {
        return this.http.delete<Object>(
            `http://localhost:3000/api/v1/categories/${categoryId}`
        );
    }
}
