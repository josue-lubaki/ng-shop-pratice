import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private localstorageToken: LocalstorageService) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        // Vérifier si un token valide est disponible
        const token = this.localstorageToken.getToken();

        if (token) {
            // Décoder le token si existe
            const tokenDecode = JSON.parse(atob(token.split('.')[1]));
            if (tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp)) {
                return true;
            }
        }

        this.router.navigate(['/login']);
        return false;
    }

    /**
     * Methode qui permte de vérifier si la date d'expiration du token est toujours valide
     * @param expiration la date d'expiration du token (timestamp)
     * @returns boolean
     */
    private _tokenExpired(expiration: number): boolean {
        return Math.floor(new Date().getTime() / 1000) >= expiration;
    }
}
