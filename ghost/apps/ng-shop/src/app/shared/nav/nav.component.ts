/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';

/* Fonction qui permet à l'icône "Hamburger" d'afficher la barre de menu */
declare function toggleMenu(event: any): void;

@Component({
    selector: 'ngshop-nav',
    templateUrl: './nav.component.html',
    styles: []
})
export class NavComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    openMenuBar(event: any) {
        toggleMenu(event);
    }
}
