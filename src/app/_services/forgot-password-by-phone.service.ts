import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, config, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import {environment} from "../../environments/environment";

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}; 

const apiUrl = environment.base_url + '/api/auth/';

@Injectable({ providedIn: 'root' })
export class ForgotPasswordByPhoneService {

  constructor(private http: HttpClient) { }

 forgotPasswordByPhone(credentials): Observable<any> {
		return this.http.post(apiUrl + 'forgot-password/phone', {
			username: credentials.username,
		}, httpOptions);
	  }
}
