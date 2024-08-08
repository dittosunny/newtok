import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private apiUrl = 'http://localhost:8080/auth/login'; 
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, password };
    return this.http.post<any>(this.apiUrl, body, { headers });
  }

  private registerUrl = 'http://localhost:8080/auth/register'; // Replace with your API URL


  register(user: any): Observable<any> {
    return this.http.post(`${this.registerUrl}`, user);
  }
}
