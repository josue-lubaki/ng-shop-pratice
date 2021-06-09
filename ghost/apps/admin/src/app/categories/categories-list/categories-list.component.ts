/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@ghost/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html',
    styles: []
})
export class CategoriesListComponent implements OnInit {
    categories: Category[] = [];

    constructor(
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this._getCategories();
    }

    /**
     * Methode qui permet de supprimer une Categorie
     * @param categoryId id de la category à Supprimer
     */
    deleteCategory(categoryId: String) {
        this.confirmationService.confirm({
            message: 'Do you want to Delete this category ?',
            header: 'Delete Category',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.categoriesService.deleteCategory(categoryId).subscribe(
                    (response) => {
                        this._getCategories();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Category is deleted'
                        });
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Category is not deleted !'
                        });
                    }
                );
            },
            reject: () => {}
        });
    }

    private _getCategories() {
        this.categoriesService.getCategories().subscribe((category) => {
            this.categories = category;
        });
    }
}
