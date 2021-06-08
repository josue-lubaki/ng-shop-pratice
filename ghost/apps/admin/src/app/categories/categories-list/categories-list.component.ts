/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html',
    styles: []
})
export class CategoriesListComponent implements OnInit {
    categories = [
        {
            id: 1,
            name: 'category-1',
            icon: 'icon-1'
        },
        {
            id: 2,
            name: 'category-2',
            icon: 'icon-2'
        },
        {
            id: 3,
            name: 'category-3',
            icon: 'icon-3'
        }
    ];

    constructor() {}

    ngOnInit(): void {}
}
