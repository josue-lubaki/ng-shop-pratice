import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
    selector: 'users-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent implements OnInit {
    loginFormGroup!: FormGroup;
    isSubmitted = false;
    authError = false;
    authErrorMessage = 'Email or Password are wrong';

    constructor(
        private formBuilder: FormBuilder,
        private auth: AuthService,
        private localstorageService: LocalstorageService
    ) {}

    ngOnInit(): void {
        this._initLoginForm();
    }

    private _initLoginForm() {
        this.loginFormGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    get loginForm() {
        return this.loginFormGroup.controls;
    }

    onSubmit() {
        this.isSubmitted = true;

        if (this.loginForm.email.value === '' || this.loginForm.password.value === '')
            return;

        this.auth
            .login(this.loginForm.email.value, this.loginForm.password.value)
            .subscribe(
                (user) => {
                    this.authError = false;
                    // save the token in my Local stockage
                    this.localstorageService.setToken(user.token);
                },
                (error) => {
                    this.authError = true;
                    console.log(error);
                    if (error.status !== 400)
                        this.authErrorMessage =
                            'Error in the server, please try again later';
                    else this.authErrorMessage = error.error;
                }
            );
    }
}
