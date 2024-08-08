import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  
  private apiKey = '9cd0bc50db7a45389b685733240708'; // Replace with your actual WeatherAPI key
 private baseUrl = `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=`
 private LocationUrl = 'http://localhost:8080/admin';

  constructor(private http: HttpClient) { }

  getWeather(location: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${location}`);
  }

  getLocationData(): Observable<any> {
    return this.http.get(`${this.LocationUrl}/get-data`);
  }
}
