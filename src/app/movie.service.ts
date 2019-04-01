import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export default class MovieService {

  private movieUrl = 'http://192.168.0.33:3000/api/movies';
  constructor(private http: HttpClient) { }
  
  getRemoteMovies(): Observable<[]>{
    return this.http.get<[]>(this.movieUrl); 		
  }
  deleteRemoteMovie(movie){
    return this.http.delete(this.movieUrl+"/"+movie.id); 		
  }
  getDBMovies (){
    this.http.get<[]>(this.movieUrl).subscribe((result)=>{console.log(JSON.stringify(result))});
  }
  getRemoteMovieById(id):Observable<any>{
    return this.http.get<[]>(this.movieUrl + "/"+id);
  }
  addRemoteMovie(movie):Observable<any>{
    return this.http.post(this.movieUrl,movie);
  }
  updateRemoteMovie(movie):Observable<any>{
    return this.http.put(this.movieUrl + "/"+movie.id,movie);
  }
}