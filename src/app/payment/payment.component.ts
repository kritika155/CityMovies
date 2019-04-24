import { Component, OnInit } from '@angular/core';
declare var RazorpayCheckout:any;
import { Router  } from '@angular/router';
import {Location} from '@angular/common';import  CustomerService   from '../customer.service';
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
  constructor(private route: ActivatedRoute,private router :Router, private customerService:CustomerService,private _location: Location) {
  this.priceBook={price:this.priceBooking};

   }

   submit(){
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_SnmGWJZEvHAK1t',
      // order_id: 'order_7HtFNLS98dSj8x',
      amount: '5000',
      name: 'foo',
      prefill: {
        email: 'roykritika00@gmail.com',
        contact: '9038187690',
        name: 'Kritiika Roy'
      },
      theme: {
        color: '#F37254'
      }
    }
    
    var successCallback = function(success) {
      alert('payment_id: ' + success.razorpay_payment_id)
      var orderId = success.razorpay_order_id
      var signature = success.razorpay_signature
    }
    
    var cancelCallback = function(error) {
      alert(error.description + ' (Error '+error.code+')')
    }
    
    RazorpayCheckout.on('payment.success', successCallback)
    RazorpayCheckout.on('payment.cancel', cancelCallback)
    RazorpayCheckout.open(options)
   }

  ngOnInit() {
    console.log(this.priceBooking);
  }
  move(){
    this._location.back();
  }
}
