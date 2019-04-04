import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: HomePage,
    children: [
      {
        path: 'movies',
        children: [
          {
            path: '',
            loadChildren: '../movies/movies.module#moviesPageModule'
          }
        ]
      },
      {
        path: 'theater',
        children: [
          {
            path: '',
            loadChildren: '../theater/theater.module#theaterPageModule'
          }
        ]
      },
      {
        path: 'booking',
        children: [
          {
            path: '',
            loadChildren: '../booking/booking.module#bookingPageModule'
          }
        ]
      },
     
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: '../profile/profile.module#ProfilePageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/movies',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/movies',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
