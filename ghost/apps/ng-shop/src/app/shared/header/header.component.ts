/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ngshop-header',
    templateUrl: './header.component.html',
    styleUrls: []
})
export class HeaderComponent implements OnInit {
    blocMenu: any;

    constructor() {}

    ngOnInit(): void {
        this.blocMenu = document.getElementById('blocMenu');
    }

    toogleMenu(event: any) {
        this.blocMenu.classList.toggle('show-mobile');
        event.preventDefault();
    }
}
