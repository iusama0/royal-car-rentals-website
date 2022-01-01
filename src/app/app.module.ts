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
import { AdminVehicleDetailComponent } from './admin/admin-vehicle-detail/admin-vehicle-detail.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminDriverDetailComponent } from './admin/admin-driver-detail/admin-driver-detail.component';
import { VehiclesComponent } from './public/vehicles/vehicles.component';
import { VehicleComponent } from './public/vehicle/vehicle.component';
import { AdminInquiryComponent } from './admin/admin-inquiry/admin-inquiry.component';
import { AdminSettingComponent } from './admin/admin-setting/admin-setting.component';
import { AdminReportComponent } from './admin/admin-report/admin-report.component';


//=========================
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RegisterComponent } from './public/register/register.component';
import { AdminCustomerDetailComponent } from './admin/admin-customer-detail/admin-customer-detail.component';
import { AdminBookingsComponent } from './admin/admin-bookings/admin-bookings.component';
import { CustomerProfileComponent } from './public/customer-profile/customer-profile.component';
import { AdminBookingDetailComponent } from './admin/admin-booking-detail/admin-booking-detail.component';
import { DriverSigninComponent } from './driver/driver-signin/driver-signin.component';
import { DriverCommonSectionComponent } from './driver/driver-common-section/driver-common-section.component';
import { DriverBookingsComponent } from './driver/driver-bookings/driver-bookings.component';
import { DriverBookingDetailComponent } from './driver/driver-booking-detail/driver-booking-detail.component';
import { DriverDashboardComponent } from './driver/driver-dashboard/driver-dashboard.component';
import { DriverProfileComponent } from './driver/driver-profile/driver-profile.component';
import { DriverReportComponent } from './driver/driver-report/driver-report.component';

//====================
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
    AdminDashboardComponent,
    AdminVehicleDetailComponent,
    AdminDriverDetailComponent,
    VehiclesComponent,
    VehicleComponent,
    AdminInquiryComponent,
    AdminSettingComponent,
    AdminReportComponent,
    RegisterComponent,
    AdminCustomerDetailComponent,
    AdminBookingsComponent,
    CustomerProfileComponent,
    AdminBookingDetailComponent,
    DriverSigninComponent,
    DriverCommonSectionComponent,
    DriverBookingsComponent,
    DriverBookingDetailComponent,
    DriverDashboardComponent,
    DriverProfileComponent,
    DriverReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    OverlayModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatStepperModule,
    MatRippleModule,
    //MatAutocompleteModule,
    //MatBadgeModule,
    //MatBottomSheetModule,
    //MatChipsModule,
    //MatDialogModule,
    //MatDividerModule,
    //MatExpansionModule,
    //MatGridListModule,
    //MatListModule,
    //MatMenuModule,
    //MatProgressBarModule,
    //MatSidenavModule,
    //MatSliderModule,
    //MatSlideToggleModule,
    //MatSnackBarModule,
    //MatTabsModule,
    //MatToolbarModule,
    //MatTooltipModule,
    //MatTreeModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot()// ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
