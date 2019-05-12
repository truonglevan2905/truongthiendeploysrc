import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Admin} from 'models/Admins';

declare var require: any;
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  config = require('src/assets/config.json');
  private URIADMIN= this.config['api_connect'] + '/posts/';
  constructor(private http: HttpClient) { }
  isCheckPermissionAdmin(name,pass):Observable<Admin>{
    return this.http.get<Admin[]>(this.URIADMIN+"getByAdminByUserPass/"+name+"/"+pass);
  }
}
