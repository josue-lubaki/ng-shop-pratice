import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ProductsModule } from '@ghost/products';
import { UiModule } from '@ghost/ui';
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './shared/nav/nav.component';
import { FormBuilder, NgModel } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { OrdersModule } from '@ghost/orders';

const routes: Routes = [{ path: '', component: HomePageComponent }];

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        HeaderComponent,
        FooterComponent,
        NavComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        AccordionModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ProductsModule,
        UiModule,
        OrdersModule
    ],
    providers: [FormBuilder, NgbModal, NgModel],
    bootstrap: [AppComponent]
})
export class AppModule {}
