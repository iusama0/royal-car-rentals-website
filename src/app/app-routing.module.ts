import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCommonSectionComponent } from './admin/admin-common-section/admin-common-section.component';
import { AdminCustomerComponent } from './admin/admin-customer/admin-customer.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminDriverDetailComponent } from './admin/admin-driver-detail/admin-driver-detail.component';
import { AdminDriverComponent } from './admin/admin-driver/admin-driver.component';
import { AdminSigninComponent } from './admin/admin-signin/admin-signin.component';
import { AdminVehicleDetailComponent } from './admin/admin-vehicle-detail/admin-vehicle-detail.component';
import { AdminVehicleComponent } from './admin/admin-vehicle/admin-vehicle.component';
import { AboutUsComponent } from './public/about-us/about-us.component';
import { BookingComponent } from './public/booking/booking.component';
import { CommonSectionComponent } from './public/common-section/common-section.component';
import { ContactUsComponent } from './public/contact-us/contact-us.component';
import { HomeComponent } from './public/home/home.component';
import { ServicesComponent } from './public/services/services.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: "public/home",
    pathMatch: 'full'
  },
  {

    path: 'public', component: CommonSectionComponent,
    children: [
      { path: 'home', component: HomeComponent, },
      { path: 'booking', component: BookingComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'services', component: ServicesComponent },
    ],
  },
  {
    path: 'admin',
    redirectTo: "admin/signin",
    pathMatch: 'full'
  },
  {
    path: 'admin', component: AdminCommonSectionComponent,
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'signin', component: AdminSigninComponent },
      { path: 'vehicle', component: AdminVehicleComponent },
      { path: 'vehicle-detail', component: AdminVehicleDetailComponent },
      { path: 'driver', component: AdminDriverComponent },
      { path: 'driver-detail', component: AdminDriverDetailComponent },
      { path: 'customer', component: AdminCustomerComponent },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
