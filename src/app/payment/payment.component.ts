import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import  CustomerService   from '../customer.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  payment:any={};
priceBooking =JSON.parse(localStorage.getItem('price'));
priceBook:{price:''};
  constructor(private route: ActivatedRoute,private router :Router, private customerService:CustomerService) {
  this.priceBook={price:this.priceBooking};

   }

  ngOnInit() {
    console.log(this.priceBooking);
  }

}
