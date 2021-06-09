import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    editMode: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private location: Location,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.initForm();
        this._checkEditMode();
    }

    /**
     * Observable [subscribe()] qui permet de switcher la variable @code{editMode} à true si l'Utilisateur
     * clique (Active) le router en cliquant sur le button edit.
     * Récupère les informations de la categorie pour le binder sur le formulaire
     * @method getCategory(categoryId) permet de recupérer les informations de la categorie
     * @return void
     */
    private _checkEditMode() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.editMode = true;
                this.categoriesService.getCategory(params.id).subscribe((category) => {
                    this.categoryForm.name.setValue(category.name);
                    this.categoryForm.icon.setValue(category.icon);
                });
            }
        });
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
