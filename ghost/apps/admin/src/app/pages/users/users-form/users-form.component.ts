import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UsersService } from '@ghost/users';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
    selector: 'admin-users-form',
    templateUrl: './users-form.component.html',
    styles: []
})
export class UsersFormComponent implements OnInit {
    form!: FormGroup;
    isSubmitted = false;
    editMode = false;
    currentUserId!: string;
    color!: string;
    countries = [];

    constructor(
        private formBuilder: FormBuilder,
        private usersService: UsersService,
        private messageService: MessageService,
        private location: Location,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.initUserForm();
        this._checkEditMode();
    }

    /**
     * Methode qui permet d'initialiser les contenus du formulaire dont on a besoin
     * @see Validators : permet de spécifier les validations de nos champs (required, email, etc...)
     * @return FormGroup
     */
    initUserForm() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            phone: ['', [Validators.required, Validators.max(10)]],
            isAdmin: [false],
            street: [''],
            apartment: [''],
            zip: [''],
            city: [''],
            country: ['']
        });
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
                this.currentUserId = params.id;
                this.usersService.getUser(params.id).subscribe((user) => {
                    this.userForm.name.setValue(user.name);
                    this.userForm.email.setValue(user.email);
                    this.userForm.isAdmin.setValue(user.isAdmin);
                    this.userForm.street.setValue(user.street);
                    this.userForm.apartment.setValue(user.apartment);
                    this.userForm.zip.setValue(user.zip);
                    this.userForm.city.setValue(user.city);
                    this.userForm.country.setValue(user.country);

                    /** Enlever l'obligation du password et phone donnée sur @method initUserForm */
                    this.userForm.password.setValidators([]);
                    this.userForm.password.updateValueAndValidity();
                    this.userForm.phone.setValidators([]);
                    this.userForm.phone.updateValueAndValidity();
                });
            }
        });
    }

    /**
     * methode declenché au click du button "Create" ou "Update"
     * vérifie la validité des champs du formulaire
     * @returns void
     */
    onSubmit() {
        this.isSubmitted = true;
        if (this.form.invalid) {
            return;
        }

        const category: User = {
            id: this.currentUserId,
            name: this.userForm.name.value,
            email: this.userForm.email.value,
            phone: this.userForm.phone.value
        };

        if (this.editMode) {
            this._updateCategory(category);
        } else {
            this._addCategory(category);
        }
    }

    /**
     * Methode qui permet de faire la mise à jour d'une Categorie
     * @param category l'objet categorie à mettre à jour
     */
    private _updateCategory(user: User) {
        this.usersService.updateUser(user).subscribe(
            (response: User) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `Category ${response.name} is update`
                });
                // Delai avant la rédirection vers la page précedente
                timer(1500)
                    .toPromise()
                    .then(() => {
                        this.onCancel();
                    });
            },
            () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Category is not update !'
                });
            }
        );
    }

    /**
     * Methode qui permet de créer une categorie
     * @param category : l'objet categorie à insérer
     * @method subscribe (fnCallbackSuccess, fnCallbackError, fnCallbackComplete)
     */
    private _addCategory(user: User) {
        this.usersService.createUser(user).subscribe(
            (response: User) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `Category ${response.name} is created`
                });
                // Delai avant la rédirection vers la page précedente
                timer(1500)
                    .toPromise()
                    .then(() => {
                        this.onCancel();
                    });
            },
            () => {
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
    get userForm() {
        return this.form.controls;
    }

    /**
     * Methode qui permet de retourner en arrière au click du button "Cancel"
     * @return void
     */
    onCancel() {
        this.location.back();
    }
}
