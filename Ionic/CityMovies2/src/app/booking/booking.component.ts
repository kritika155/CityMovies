import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import CustomerService from '../customer.service';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../booking.service';
import { AlertController } from '@ionic/angular';
interface Booking {
  customer_id: number;
  tickets: number;
  movie_id: number;
  movie_name: string;
  movie_time: any;
  theatre: string;
  screen: string;
  city: string;
  movie_date: any;
  date: any;
  amount: number;
  ticket_price: number;
}
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  books: any = { theatre: 'Tulsi', screen: 'Screen 2', city: 'Bangalore' };
  currentDate: any = new Date();
  timestamp: any = new Date().toLocaleDateString();
  ddmmyyyy: any;
  booking?: Booking;
  customerId: any = localStorage.getItem('users');
  movieL: any = localStorage.getItem('movies');
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        // this.addBookings();
        console.log('Alert confirmed');
      },
    },
  ];

  setResult(ev: any) {
    if (ev.detail.role == 'confirm') {
      this.addBookings();
    }
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }
  movie: any;
  // numbers :number ;
  ticket_price: any = 250;
  ticket: any = 1;
  booking_amount?: any = 250;
  id?: number;
  private sub: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private bookingService: BookingService,
    private _location: Location,
    public atrCtrl: AlertController
  ) {
    // this.timestamp = currentDate.toLocaleTimeString();
    const myDate = new Date(this.currentDate.toString());
    const dayOfMonth = myDate.getDate();
    const month = myDate.getMonth();
    const year = myDate.getFullYear();
    this.ddmmyyyy =
      this.pad(dayOfMonth) + '-' + this.pad(month + 1) + '-' + year;
    const longEnUSFormatter = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  }

  move() {
    this._location.back();
  }
  getLocaLTime() {
    // new Date().getTimezoneOffset() : getTimezoneOffset in minutes
    //for GMT + 1 it is (-60)
    //for GMT + 2 it is (-120)
    //..
    let time_zone_offset_in_hours = new Date().getTimezoneOffset() / 60;
    //get current datetime hour
    let current_hour = new Date().getHours();
    //adjust current date hour
    let local_datetime_in_milliseconds = new Date().setHours(
      current_hour - time_zone_offset_in_hours
    );
    //format date in milliseconds to ISO String
    let local_datetime = new Date(local_datetime_in_milliseconds).toISOString();
    return local_datetime;
  }

  pad(n: any) {
    return n < 10 ? '0' + n : n;
  }
  ngOnInit() {
    // this.ticket = <HTMLElement>document.getElementById('ticket').nodeValue;
    console.log('Ticket Number:', this.ticket);
    // this.ticket = (<HTMLInputElement>document.getElementById('ticket')).value;
    console.log(this.ticket);
    this.ticket = parseInt(this.ticket);
    console.log('Booking Amount:', this.booking_amount);
    this.bookingService.getRemoteBookings().subscribe((booking) => {
      console.log('Bookings from Backend', booking);
      booking?.forEach((e) => {
        this.booking = {
          customer_id: this.customerId?.id,
          tickets: this.ticket,
          movie_id: this.movieL.id,
          movie_name: this.movieL.name,
          movie_time: this.timestamp,
          theatre: 'Tulsi',
          screen: 'Screen 2',
          city: 'Bangalore',
          movie_date: this.ddmmyyyy,
          date: this.ddmmyyyy,
          amount: this.booking_amount,
          ticket_price: this.ticket_price,
        };
      });
    });
    console.log('Bookings from Backend DATA', this.booking);
    // this.booking={customer_id:'customerId.id',tickets:'',movie_id:'this.movie.id',movie_name:'this.movie.name',movie_time:'',theatre:'',screen:'',city:'',movie_date:'',date:'',amount:'',ticket_price:''};
    this.movie = {
      Id: '',
      moviename: '',
      year: '',
      image_url: '',
      production_house: '',
      rating: '',
      type: '',
      language: '',
      date: '',
    };
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id'];
      console.log(this.id); // (+) converts string 'id' to a number
      this.customerService.getRemoteMovieById(this.id).subscribe((movie) => {
        this.movie = movie;
        console.log(this.movie);
      });
    });
  }
  getTicketNumber(ticket: any) {
    console.log('Tickets:', this.ticket);
    this.booking_amount = this.ticket * this.ticket_price;
    console.log('booking_amount:', this.booking_amount);
  }
  addBookings() {
    var books: any = {
      customer_id: this.id,
      tickets: this.ticket,
      movie_id: this.movie.id,
      movie_name: this.movie.moviename,
      movie_time: this.timestamp,
      theatre: 'Tulsi',
      screen: 'Screen 2',
      city: 'Bangalore',
      movie_date: this.ddmmyyyy,
      date: this.ddmmyyyy,
      amount: this.booking_amount,
      ticket_price: this.ticket_price,
    };
    var price: any = this.booking_amount;
    localStorage.setItem('price', JSON.stringify(price));
    var priceL = localStorage.getItem('price');
    console.log(priceL);
    console.log(books);
    //  console.log(price);
    this.bookingService.addRemoteBooking(books).subscribe((result: any) => {
      console.log(result);
      if (result.result == 'success') {
        this.router.navigate(['payment/' + price]);
      } else {
        return;
      }
    });
  }
  async presentAlert(booking: any) {
    const alert = await this.atrCtrl.create({
      header: 'Booking Confirmation Box',
      message: 'Please confirm your bookings',
      buttons: ['Yes', 'No'],
    });

    await alert.present();
  }
  show(booking: any) {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    var bookit: any = {
      customer_id: this.customerId.id,
      tickets: this.ticket,
      movie_id: this.movie.id,
      moviename: this.movie.moviename,
      movie_time: timestamp,
      theatre: 'Tulsi',
      screen: 'Screen 2',
      city: 'Bangalore',
      movie_date: this.ddmmyyyy,
      date: currentDate,
      amount: this.booking_amount,
      ticket_price: this.ticket_price,
    };
    this.booking_amount = (this.ticket || 1) * this.ticket_price;

    return this.booking_amount;
  }
}
