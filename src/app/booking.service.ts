import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export  class BookingService {

  private bookingUrl = 'http://192.168.0.33:3000/api/bookings';
  constructor( private http: HttpClient) { }
  bookings = [];
  getRemoteBookings(): Observable<[]>{
    return this.http.get<[]>(this.bookingUrl); 		
  }
  addRemoteBooking(booking):Observable<any>{
    return this.http.post(this.bookingUrl,booking);
  }
  deleteRemoteBooking(booking){
    return this.http.delete(this.bookingUrl+"/"+booking.id); 		
  }
  getDBBookings (){
    this.http.get<[]>(this.bookingUrl).subscribe((result)=>{console.log(JSON.stringify(result))});
  }
  getRemoteBookingById(id):Observable<any>{
    return this.http.get<[]>(this.bookingUrl + "/"+id);
  }
  updateRemoteBooking(booking):Observable<any>{
    return this.http.put(this.bookingUrl + "/"+booking.id,booking);
  }
}
