import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class LocationService {



  private apiUrl = 'http://localhost:8080/admin/add-location'; 

  constructor(private http: HttpClient) { }

  sendData(formData: any): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
}
