import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { User } from '../model/user';
import { Jwttoken } from '../model/jwttoken';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const autenticarUsuarioUrl = 'http://localhost:8082/authenticate';


@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http: HttpClient) { }

  authUser (user): Observable<Jwttoken> {
    return this.http.post<Jwttoken>(autenticarUsuarioUrl, user, httpOptions).pipe(
      tap((jwt: Jwttoken) => {
        this.setSession(jwt.jwtToken);
      })
    );
  }

  private setSession(jwt) {
    const add = 10;
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getTime() + add*60000);

    localStorage.setItem('expires_at', futureDate.getTime().toString());
    localStorage.setItem('token', jwt);
  }

  removeSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }
}
