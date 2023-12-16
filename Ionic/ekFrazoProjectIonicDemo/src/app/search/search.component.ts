import { Component, OnInit } from '@angular/core';
import CustomerService from '../customer.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
// import { Events } from 'ionic-angular';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  list = [];
  movies: any = [];
  movie: any = [{ language: '' }];
  language = '';
  constructor(
    private customerService: CustomerService,
    private router: Router,
    private _location: Location
  ) {
    this.initializeItems();
  }
  ngOnInit() {
    // this.customerService.getDBMovies();
    this.movies = this.customerService
      .getRemoteMovies()
      .subscribe((result: any) => {
        this.movies = result;
        console.log(result);
      });
  }
  //   Search(lan){
  //     this.customerService.getRemoteMovies().subscribe((result)=>{this.movies=result;});
  // for(var i=0;i<this.movie.length;i++){
  // if(lan==this.movie[i].language)
  // console.log(this.movie[i].language)
  // }

  //   }
  search(movie: any) {
    this.customerService.getRemoteMovies().subscribe((result) => {
      this.movies = result;
    });
    var result = [];
    result = this.movies;
    // this.customerService.getRemoteMovies().subscribe((result)=>{this.movies=result;});
    this.movies = result.filter(function (m: any) {
      return m.language.toLowerCase() == movie.language.toLowerCase();
    });

    //  return result;
  }
  onChange() {
    location.reload();
  }
  items: any;

  initializeItems() {
    this.items = ['Bahubali', 'Captain Marvel', 'Manikarnika'];
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item: any) => {
        return item.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }
  displayMovie(item: any) {
    if (this.movies.language == item) {
      return this.movies;
    }
  }
}
