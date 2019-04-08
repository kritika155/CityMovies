import { Component, OnInit } from '@angular/core';
import  CustomerService  from '../customer.service';
import {Location} from '@angular/common';
import { Router} from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
list=[];
movies:any=[];

language='';
  constructor(private customerService: CustomerService,private router :Router,private _location: Location) {
  }
  ngOnInit() {
    this.customerService.getDBMovies();
    this.movies=this.customerService.getRemoteMovies().subscribe((result)=>{this.movies=result;});
  }
//   Search(lan){
//     this.customerService.getRemoteMovies().subscribe((result)=>{this.movie=result;});
// for(var i=0;i<this.movie.length;i++){
// if(lan==this.movie[i].language)
// console.log(this.movie[i].language)
// }
       
         
       
    
//   }
  search(language){
    var result=[];
    result= this.movies;
   
    this.movies = result.filter(function(movie) {
      return movie.language.toLowerCase() === language.toLowerCase();
     
    });
    
  //  return result;
  }
}
