import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './public/home/home.component';
import { ContactUsComponent } from './public/contact-us/contact-us.component';
import { AboutUsComponent } from './public/about-us/about-us.component';
import { ServicesComponent } from './public/services/services.component';
import { BookingComponent } from './public/booking/booking.component';
import { CommonSectionComponent } from './public/common-section/common-section.component';
import { AdminCommonSectionComponent } from './admin/admin-common-section/admin-common-section.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminSigninComponent } from './admin/admin-signin/admin-signin.component';
import { AdminVehicleComponent } from './admin/admin-vehicle/admin-vehicle.component';
import { AdminDriverComponent } from './admin/admin-driver/admin-driver.component';
import { AdminCustomerComponent } from './admin/admin-customer/admin-customer.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactUsComponent,
    AboutUsComponent,
    ServicesComponent,
    BookingComponent,
    CommonSectionComponent,
    AdminCommonSectionComponent,
    AdminHomeComponent,
    AdminSigninComponent,
    AdminVehicleComponent,
    AdminDriverComponent,
    AdminCustomerComponent,
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot()// ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
