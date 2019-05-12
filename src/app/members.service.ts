import { Injectable } from '@angular/core';
import {Customers } from './model/Customers';
import {Customer} from 'models/Members';
import { Observable, of, config } from 'rxjs';
import { HttpClient } from '@angular/common/http';

declare var require: any;
@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private config = require('src/assets/config.json');
  private memberURI= this.config['api_connect'] + '/apimember/';
  customer:Customers[]=[];
  authen:Boolean;
  constructor(private http: HttpClient) { }
   getAllMember():Observable<Customers[]>{
    return this.http.get<Customers[]>(this.memberURI);
  } 
  addNewsMember(cus:Customers):Observable<Customers>{
    return this.http.post<Customers>(this.memberURI+"addMember",cus);
  }
  isCheckMember(name:String,pass:String):Observable<Customer[]>{
 
    return this.http.get<Customer[]>(this.memberURI+"getuserpass/"+name+"/"+pass);
 }
 getMemberByUsername(name:String):Observable<Customer[]>{
  return this.http.get<Customer[]>(this.memberURI+"getMemberByName/"+name);
} 
updateMember(userInfo: Customers): Observable<any> {
  return this.http.post<any>(`${this.memberURI}updateMember`, userInfo);
}
}
