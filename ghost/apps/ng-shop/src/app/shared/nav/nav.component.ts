import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ngshop-nav',
    templateUrl: './nav.component.html',
    styles: []
})
export class NavComponent implements OnInit {
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
