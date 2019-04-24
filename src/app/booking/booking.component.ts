import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';
import {Location} from '@angular/common';
import  CustomerService   from '../customer.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  customerId= JSON.parse(localStorage.getItem('users'));
movieL=JSON.parse(localStorage.getItem('movies'));
booking:{customer_id:number,tickets:number,movie_id:number,movie_name:string,movie_time:any,theatre:string,screen:string,city:string,movie_date:any,date:any,amount:number,ticket_price:number};

movie:any;
// numbers :number ;

id:number;
private sub: any;
  constructor(private route: ActivatedRoute,private router :Router, private customerService:CustomerService,private _location: Location) {  
        this.booking={customer_id:this.customerId.id,tickets:0,movie_id:this.movieL.id,movie_name:this.movieL.name,movie_time:'',theatre:'Tulsi',screen:'Screen 2',city:'Bangalore',movie_date:'',date:'',amount:0,ticket_price:250}
        // this.booking={customer_id:'customerId.id',tickets:'',movie_id:'this.movie.id',movie_name:'this.movie.name',movie_time:'',theatre:'',screen:'',city:'',movie_date:'',date:'',amount:'',ticket_price:''};
  }
  move(){
    this._location.back();
  }
 addBookings()
 {
  var books:any = {customer_id:this.customerId.id,tickets:this.booking.tickets,movie_id:this.movie.id,movie_name:this.movie.name,movie_time:this.booking.movie_time,theatre:'Tulsi',screen:'Screen 2',city:'Bangalore',movie_date:this.booking.movie_date,date:this.booking.date,amount:this.booking.amount,ticket_price:this.booking.ticket_price};
   this.booking.amount=this.booking.tickets*this.booking.ticket_price;
   var price:any=this.booking.amount;
   localStorage.setItem('price', JSON.stringify(price));
        var priceL = JSON.parse(localStorage.getItem('price'));
        console.log(priceL);
   console.log(books);
  //  console.log(price);
   this.customerService.addRemoteBooking(books).subscribe(()=>{ this.router.navigate(['payment/'+price]);});

 } 
 show(booking){
  var bookit:any = {customer_id:this.customerId.id,tickets:this.booking.tickets,movie_id:this.movie.id,movie_name:this.movie.name,movie_time:this.booking.movie_time,theatre:'Tulsi',screen:'Screen 2',city:'Bangalore',movie_date:this.booking.movie_date,date:this.booking.date,amount:this.booking.amount,ticket_price:this.booking.ticket_price};
  this.booking.amount=this.booking.tickets*this.booking.ticket_price;

   return this.booking.amount;
 }
  ngOnInit() {

    this.movie={name:"",year:"",image_url:"",production_house:"",rating:"",type:"",language:"",date:""};
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id'];
       console.log(this.id); // (+) converts string 'id' to a number
       this.customerService.getRemoteMovieById(this.id).subscribe((movie)=>{this.movie = movie;});

    });
  }

}