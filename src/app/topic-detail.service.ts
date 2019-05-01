import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import {Threads} from './model/Threads';




@Injectable({
  providedIn: 'root'
})
export class TopicDetailService {
 
  private topicURI='http://localhost:3000/apithread/';
 
      getAllTheardByNameTopic(name):Observable<Threads[]>{
        return this.http.get<Threads[]>(this.topicURI+"getThread/"+name);
      }
     
  constructor(private http: HttpClient
    
    ) { 
      
    }
}
