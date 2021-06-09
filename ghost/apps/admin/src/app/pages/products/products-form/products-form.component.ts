import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category, Product, ProductsService } from '@ghost/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
    selector: 'admin-products-form',
    templateUrl: './products-form.component.html',
    styles: []
})
export class ProductsFormComponent implements OnInit {
    form!: FormGroup;
    isSubmitted = false;
    editMode = false;
    currentCategoryId!: string;
    categories: Category[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private productsService: ProductsService,
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private location: Location,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.initForm();
        this._getCategories();
        this._checkEditMode();
    }

    /**
     * Methode qui permet d'initialiser les contenus du formulaire dont on a besoin
     * @see Validators : permet de spécifier les validations de nos champs (required, email, etc...)
     * @return FormGroup
     */
    initForm() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            brand: ['', Validators.required],
            price: ['', Validators.required],
            category: ['', Validators.required],
            countInStock: ['', Validators.required],
            description: ['', Validators.required],
            richDescription: [''],
            image: [''],
            isFeatured: ['']
        });
    }

    /**
     * Methode qui permet de récupérer toutes les categories
     * @return Category[]
     */
    private _getCategories() {
        this.categoriesService.getCategories().subscribe((categories) => {
            this.categories = categories;
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
                this.currentCategoryId = params.id;
                this.productsService.getProduct(params.id).subscribe((product) => {
                    this.productForm.name.setValue(product.name);
                    this.productForm.description.setValue(product.description);
                    this.productForm.richDescription.setValue(product.richDescription);
                    this.productForm.image.setValue(product.image);
                    this.productForm.images.setValue(product.images);
                    this.productForm.brand.setValue(product.brand);
                    this.productForm.price.setValue(product.price);
                    this.productForm.category.setValue(product.category);
                    this.productForm.countInStock.setValue(product.countInStock);
                    this.productForm.rating.setValue(product.rating);
                    this.productForm.numReviews.setValue(product.numReviews);
                    this.productForm.isFeatured.setValue(product.isFeatured);
                    this.productForm.dateCreated.setValue(product.dateCreated);
                });
            }
        });
    }

    /**
     * Getter du formulaire
     * @returns FormGroup
     */
    get productForm() {
        return this.form.controls;
    }

    /**
     * Methode qui permet de retourner en arrière au click du button "Cancel"
     * @return void
     */
    goBack() {
        this.location.back();
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

        const product: Product = {
            id: this.currentCategoryId,
            name: this.productForm.name.value,
            description: this.productForm.description.value,
            richDescription: this.productForm.richDescription.value,
            image: this.productForm.image.value,
            images: this.productForm.images.value,
            brand: this.productForm.brand.value,
            price: this.productForm.price.value,
            category: this.productForm.category.value,
            countInStock: this.productForm.countInStock.value,
            rating: this.productForm.rating.value,
            numReviews: this.productForm.numReviews.value,
            dateCreated: this.productForm.dateCreated.value
        };

        if (this.editMode) {
            this._updateCategory(product);
        } else {
            this._addCategory(product);
        }
    }

    /**
     * Methode qui permet de faire la mise à jour d'une Categorie
     * @param product l'objet categorie à mettre à jour
     */
    private _updateCategory(product: Product) {
        // this.productsService.updateProduct(product).subscribe(
        //     (response: Product) => {
        //         this.messageService.add({
        //             severity: 'success',
        //             summary: 'Success',
        //             detail: `product ${response.name} is update`
        //         });
        //         // Delai avant la rédirection vers la page précedente
        //         timer(1500)
        //             .toPromise()
        //             .then(() => {
        //                 this.goBack();
        //             });
        //     },
        //     () => {
        //         this.messageService.add({
        //             severity: 'error',
        //             summary: 'Error',
        //             detail: 'product is not update !'
        //         });
        //     }
        // );
    }

    /**
     * Methode qui permet de créer une categorie
     * @param product : l'objet categorie à insérer
     * @method subscribe (fnCallbackSuccess, fnCallbackError, fnCallbackComplete)
     */
    private _addCategory(product: Product) {
        // this.productsService.createProduct(product).subscribe(
        //     (response: Product) => {
        //         this.messageService.add({
        //             severity: 'success',
        //             summary: 'Success',
        //             detail: `product ${response.name} is created`
        //         });
        //         // Delai avant la rédirection vers la page précedente
        //         timer(1500)
        //             .toPromise()
        //             .then(() => {
        //                 this.goBack();
        //             });
        //     },
        //     () => {
        //         this.messageService.add({
        //             severity: 'error',
        //             summary: 'Error',
        //             detail: 'product is not created !'
        //         });
        //     }
        // );
    }
}
