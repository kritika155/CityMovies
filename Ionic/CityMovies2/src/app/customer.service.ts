import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export default class CustomerService {
  // private movieUrl = 'http://localhost:3000/api/movies';
  private movieUrl: any = 'http://localhost:3000/api/movies';
  private customerUrl: any = 'http://localhost:3000/api/customers';
  private bookingUrl: any = 'http://localhost:3000/api/bookings';

  constructor(private router: Router, private http: HttpClient) {}
  customers: any = [];
  movies: any = [];
  customer: any = {
    name: '',
    password: '',
    address: '',
    email: '',
    phone: '',
  };
  getCustomers(customer: any) {
    if (localStorage.getItem('customers') == null) {
      localStorage.setItem('customers', JSON.stringify(this.customers));
      console.log(this.customers);
    } else {
      this.customers.push(this.customer);
      localStorage.setItem('customers', JSON.stringify(this.customers));
      this.customers = localStorage.getItem('customers');
      console.log(this.customers);
    }
    return this.customers;
  }
  setCustomers(customer: any) {
    this.customers.push(this.customer);
    localStorage.setItem('customers', JSON.stringify(this.customers));
  }
  getRemoteCustomers(): Observable<[]> {
    return this.http.get<[]>(this.customerUrl);
  }
  getRemoteCustomerPassword(email: any): Observable<[]> {
    return this.http.get<[]>(this.customerUrl + '/' + email);
  }

  addRemoteCustomer(customer: any): Observable<any> {
    return this.http.post(this.customerUrl, customer);
  }
  deleteRemoteCustomer(customer: any) {
    return this.http.delete(this.customerUrl + '/' + customer.id);
  }
  getDBCustomers() {
    this.http.get<[]>(this.customerUrl).subscribe((result) => {
      console.log(JSON.stringify(result));
    });
  }
  getRemoteCustomerById(id: any): Observable<any> {
    return this.http.get<[]>(this.customerUrl + '/' + id);
  }
  updateRemoteCustomer(customer: any): Observable<any> {
    return this.http.put(this.customerUrl + '/' + customer.id, customer);
  }
  getRemoteMovies(): Observable<[]> {
    return this.http.get<[]>(this.movieUrl);
  }
  deleteRemoteMovie(movie: any) {
    return this.http.delete(this.movieUrl + '/' + movie.id);
  }
  getDBMovies() {
    this.http.get<[]>(this.movieUrl).subscribe((result) => {
      console.log(JSON.stringify(result));
    });
  }
  getRemoteMovieById(id: any): Observable<any> {
    return this.http.get<[]>(this.movieUrl + '/' + id);
  }
  getRemoteMovieByLanguage(language: any): Observable<any> {
    return this.http.get<[]>(this.movieUrl + '/' + language);
  }
  addRemoteMovie(movie: any): Observable<any> {
    return this.http.post(this.movieUrl, movie);
  }
  updateRemoteMovie(movie: any): Observable<any> {
    return this.http.put(this.movieUrl + '/' + movie.id, movie);
  }
  bookings = [];
  getRemoteBookings(): Observable<[]> {
    return this.http.get<[]>(this.bookingUrl);
  }
  addRemoteBooking(booking: any): Observable<any> {
    return this.http.post(this.bookingUrl, booking);
  }
  deleteRemoteBooking(booking: any) {
    return this.http.delete(this.bookingUrl + '/' + booking.id);
  }
  getDBBookings() {
    this.http.get<[]>(this.bookingUrl).subscribe((result: any) => {
      console.log(JSON.stringify(result));
    });
  }
  getRemoteBookingById(id: any): Observable<any> {
    return this.http.get<[]>(this.bookingUrl + '/' + id);
  }
  updateRemoteBooking(booking: any): Observable<any> {
    return this.http.put(this.bookingUrl + '/' + booking.id, booking);
  }
}
