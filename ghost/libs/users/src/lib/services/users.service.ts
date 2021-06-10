import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    apiURLUsers = environment.apiURL + 'users';

    constructor(private http: HttpClient) {}

    /**
     * Methode qui permet la récupération de toutes les Utilisateurs depuis le Backend
     * @returns Observable<Users[]>
     */
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiURLUsers);
    }

    /**
     * Methode qui permet la récupération un Utilisateur depuis le Backend via son ID
     * @param usersId l'ID de l'Utilisateur à récupérer
     * @returns Observable<Users>
     */
    getUser(usersId: string): Observable<User> {
        return this.http.get<User>(`${this.apiURLUsers}/${usersId}`);
    }

    /**
     * Methode qui permet de créer un Utilisateur
     * @param user la Utilisateur à créer
     * @returns void
     */
    createUser(user: User): Observable<User> {
        return this.http.post<User>(this.apiURLUsers, user);
    }

    /**
     * Methode qui permet de créer un Utilisateur
     * @param user l'Utilisateur à créer
     * @returns void
     */
    updateUser(user: User): Observable<User> {
        return this.http.put<User>(`${this.apiURLUsers}/${user.id}`, user);
    }

    /**
     * Methode qui permet de supprimer une Utilisateur
     * @param usersId id de la Utilisateur à supprimer
     */
    deleteUser(usersId: string): Observable<any> {
        return this.http.delete<any>(`${this.apiURLUsers}/${usersId}`);
    }
}
