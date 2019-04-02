import { Component, OnInit } from '@angular/core';
import CustomerService   from '../customer.service';
import { Router, NavigationEnd  } from '@angular/router';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movie={id:'',name:'', year:'', image_url:'', production_house:'',rating:'',type:'',language:'',date:''};

movies:any={};
list=[];
  constructor(private customerService: CustomerService,private router :Router) {

   }

  ngOnInit() {
    this.customerService.getDBMovies();
  this.customerService.getRemoteMovies().subscribe((result)=>{this.list=result;});

  
}
onSelect(movie)
{  
//   this.customerService.getRemoteMovieById(this.movie.id).subscribe((movie)=>{this.movie = movie;});

  localStorage.setItem('movies', JSON.stringify(movie));
var movies = JSON.parse(localStorage.getItem('movies'));
console.log(movies);
  this.router.navigate(['./booking/'+movie.id]); 
}

}
