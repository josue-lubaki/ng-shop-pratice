import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@ghost/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
    selector: 'ghost-categories-form',
    templateUrl: './categories-form.component.html',
    styles: []
})
export class CategoriesFormComponent implements OnInit {
    form!: FormGroup;
    isSubmitted: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    /**
     * Methode qui permet d'initialiser les contenus du formulaire dont on a besoin
     * @see Validators : permet de spécifier les validations de nos champs (required, email, etc...)
     * @return FormGroup
     */
    initForm() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            icon: ['', Validators.required]
        });
    }

    /**
     * methode declenché au click du button "Create"
     * vérifie la validité des champs du formulaire
     * @method subscribe (fnCallbackSuccess, fnCallbackError, fnCallbackComplete)
     * @returns
     */
    onSubmit() {
        this.isSubmitted = true;
        if (this.form.invalid) {
            return;
        }

        const category: Category = {
            name: this.categoryForm.name.value,
            icon: this.categoryForm.icon.value
        };

        this.categoriesService.createCategory(category).subscribe(
            (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Category is created'
                });
                // Delai avant la rédirection vers la page précedente
                timer(1500)
                    .toPromise()
                    .then(() => {
                        this.location.back();
                    });
            },
            (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Category is not created !'
                });
            }
        );
    }

    /**
     * Getter du formulaire
     * @returns FormGroup
     */
    get categoryForm() {
        return this.form.controls;
    }
}
