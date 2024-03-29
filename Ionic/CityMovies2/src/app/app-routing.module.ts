import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetComponent } from './forget/forget.component';
import { MoviesComponent } from './movies/movies.component';
import { OfferComponent } from './offer/offer.component';
import { PaymentComponent } from './payment/payment.component';
import { BookingComponent } from './booking/booking.component';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { PaymentdoneComponent } from './paymentdone/paymentdone.component';
import { TheaterComponent } from './theater/theater.component';
import { ProfileComponent } from './profile/profile.component';
import { AddOnsComponent } from './add-ons/add-ons.component';
import { SearchComponent } from './search/search.component';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forget', component: ForgetComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'booking/:id', component: BookingComponent },
  { path: 'payment/:price', component: PaymentComponent },
  { path: 'offer', component: OfferComponent },
  { path: 'add-ons', component: AddOnsComponent },
  { path: 'paymentdone', component: PaymentdoneComponent },
  { path: 'theater', component: TheaterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'addmovie', component: AddmovieComponent },
  { path: 'search', component: SearchComponent },

  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
