/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */

import { Component, OnInit } from '@angular/core';
import { AuthService, UsersService } from '@ghost/users';

@Component({
    selector: 'admin-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: []
})
export class SidebarComponent implements OnInit {
    constructor(private authService: AuthService) {}

    ngOnInit(): void {}

    /**
     * Methode qi permet de déconnecter un utilisateur
     */
    logoutUser() {
        this.authService.logout();
    }
}
