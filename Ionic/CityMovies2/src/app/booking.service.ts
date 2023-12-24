import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private bookingUrl: any = 'http://localhost:3000/api/bookings';
  constructor(private http: HttpClient) {}
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
