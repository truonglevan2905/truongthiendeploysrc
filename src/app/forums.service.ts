import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import {Topics} from './model/Topics';
@Injectable({
  providedIn: 'root'
})
export class ForumsService {
 private topicURI='http://localhost:3000/apitopic/';

  constructor(private http: HttpClient) { }
  getAllTopics(): Observable<Topics[]>{
    return this.http.get<Topics[]>(this.topicURI);
  }
 
 
}
