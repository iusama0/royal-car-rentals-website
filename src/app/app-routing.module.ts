import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBookingDetailComponent } from './admin/admin-booking-detail/admin-booking-detail.component';
import { AdminBookingsComponent } from './admin/admin-bookings/admin-bookings.component';
import { AdminCommonSectionComponent } from './admin/admin-common-section/admin-common-section.component';
import { AdminCustomerDetailComponent } from './admin/admin-customer-detail/admin-customer-detail.component';
import { AdminCustomerComponent } from './admin/admin-customer/admin-customer.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminDriverDetailComponent } from './admin/admin-driver-detail/admin-driver-detail.component';
import { AdminDriverComponent } from './admin/admin-driver/admin-driver.component';
import { AdminInquiryComponent } from './admin/admin-inquiry/admin-inquiry.component';
import { AdminReportComponent } from './admin/admin-report/admin-report.component';
import { AdminSettingComponent } from './admin/admin-setting/admin-setting.component';
import { AdminSigninComponent } from './admin/admin-signin/admin-signin.component';
import { AdminVehicleDetailComponent } from './admin/admin-vehicle-detail/admin-vehicle-detail.component';
import { AdminVehicleComponent } from './admin/admin-vehicle/admin-vehicle.component';
import { DriverBookingDetailComponent } from './driver/driver-booking-detail/driver-booking-detail.component';
import { DriverBookingsComponent } from './driver/driver-bookings/driver-bookings.component';
import { DriverCommonSectionComponent } from './driver/driver-common-section/driver-common-section.component';
import { DriverDashboardComponent } from './driver/driver-dashboard/driver-dashboard.component';
import { DriverProfileComponent } from './driver/driver-profile/driver-profile.component';
import { DriverReportComponent } from './driver/driver-report/driver-report.component';
import { DriverSigninComponent } from './driver/driver-signin/driver-signin.component';
import { AboutUsComponent } from './public/about-us/about-us.component';
import { BookingDetailComponent } from './public/booking-detail/booking-detail.component';
import { BookingComponent } from './public/booking/booking.component';
import { CommonSectionComponent } from './public/common-section/common-section.component';
import { ContactUsComponent } from './public/contact-us/contact-us.component';
import { CustomerProfileComponent } from './public/customer-profile/customer-profile.component';
import { HomeComponent } from './public/home/home.component';
import { RegisterComponent } from './public/register/register.component';
import { ServicesComponent } from './public/services/services.component';
import { VehicleComponent } from './public/vehicle/vehicle.component';
import { VehiclesComponent } from './public/vehicles/vehicles.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: "public/home",
    pathMatch: 'full'
  },
  {
    path: 'public',
    redirectTo: "public/home",
    pathMatch: 'full'
  },
  {
    path: 'admin',
    redirectTo: "admin/signin",
    pathMatch: 'full'
  },
  {
    path: 'driver',
    redirectTo: "driver/signin",
    pathMatch: 'full'
  },
  {
    path: 'public', component: CommonSectionComponent,
    children: [
      { path: 'home', component: HomeComponent, },
      { path: 'bookings', component: BookingComponent },
      { path: 'booking-detail', component: BookingDetailComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'vehicles', component: VehiclesComponent },
      { path: 'vehicle', component: VehicleComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'profile', component: CustomerProfileComponent }
    ],
  },
  {
    path: 'admin', component: AdminCommonSectionComponent,
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'bookings', component: AdminBookingsComponent },
      { path: 'booking-detail', component: AdminBookingDetailComponent },
      { path: 'vehicles', component: AdminVehicleComponent },
      { path: 'vehicle-detail', component: AdminVehicleDetailComponent },
      { path: 'drivers', component: AdminDriverComponent },
      { path: 'driver-detail', component: AdminDriverDetailComponent },
      { path: 'customers', component: AdminCustomerComponent },
      { path: 'customer-detail', component: AdminCustomerDetailComponent },
      { path: 'inquiries', component: AdminInquiryComponent },
      { path: 'reports', component: AdminReportComponent },
      { path: 'settings', component: AdminSettingComponent },
      { path: 'signin', component: AdminSigninComponent }
    ],
  },
  {
    path: 'driver', component: DriverCommonSectionComponent,
    children: [
      { path: 'dashboard', component: DriverDashboardComponent },
      { path: 'profile', component: DriverProfileComponent },
      { path: 'reports', component: DriverReportComponent },
      { path: 'bookings', component: DriverBookingsComponent },
      { path: 'booking-detail', component: DriverBookingDetailComponent },     
      { path: 'signin', component: DriverSigninComponent }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
