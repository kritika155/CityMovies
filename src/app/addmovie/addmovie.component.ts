import { Component, OnInit } from '@angular/core';
import CustomerService  from '../customer.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.scss'],
})
export class AddmovieComponent implements OnInit {
  movie:any={
   moviename:"",
    year:"",
    image_url:"",
    production_house:"",
    rating:"",
    type:"",
    language:"",
    date:""
};
list=[];
  constructor(private customerService:CustomerService,private router:Router) { }

  ngOnInit() { this.customerService.getDBMovies();
    this.customerService.getRemoteMovies().subscribe((result)=>{this.list=result;});}
  addMovie(movie){
  	this.customerService.addRemoteMovie(this.movie).subscribe(()=>{this.router.navigate(['/movie']);});
  }
}
