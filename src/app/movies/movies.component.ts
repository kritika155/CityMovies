import { Component, OnInit } from "@angular/core";
import CustomerService from "../customer.service";
import { Router, NavigationEnd } from "@angular/router";
import { Location } from "@angular/common";
@Component({
  selector: "app-movies",
  templateUrl: "./movies.component.html",
  styleUrls: ["./movies.component.scss"],
})
export class MoviesComponent implements OnInit {
  logout = [];
  movie = {
    id: "",
    name: "",
    year: "",
    image_url: "",
    production_house: "",
    rating: "",
    type: "",
    language: "",
    date: "",
  };
  customerId = JSON.parse(localStorage.getItem("users"));
  movies: any = {};
  list = [];
  constructor(
    private customerService: CustomerService,
    private router: Router,
    private _location: Location
  ) {
    if (localStorage.getItem("users") == null) {
      this.router.navigate(["./login"]);
    }
  }

  ngOnInit() {
    this.customerService.getDBMovies();
    this.customerService.getRemoteMovies().subscribe((result) => {
      this.list = result;
    });
  }
  move() {
    this._location.back();
  }
  onSelect(movie) {
    //   this.customerService.getRemoteMovieById(this.movie.id).subscribe((movie)=>{this.movie = movie;});
    if (localStorage.getItem("users") != "null") {
      localStorage.setItem("movies", JSON.stringify(movie));
      var movies = JSON.parse(localStorage.getItem("movies"));
      console.log(movies);
      this.router.navigate(["./booking/" + movie.id]);
    }
  }
  logOut() {
    this.logout = JSON.parse(localStorage.getItem("users"));
    console.log(this.logout);
    localStorage.clear();
    this.router.navigate(["./login"]);
  }
}
