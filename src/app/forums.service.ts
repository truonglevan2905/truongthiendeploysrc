import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import {Topics} from './model/Topics';

declare var require: any;
@Injectable({
  providedIn: 'root'
})
export class ForumsService {
  config = require('src/assets/config.json');
  private topicURI= this.config['api_connect'] + '/apitopic/';

  constructor(private http: HttpClient) { }
  getAllTopics(): Observable<Topics[]>{
    console.log(this.topicURI)
    return this.http.get<Topics[]>(this.topicURI);
  }
 
 
}
