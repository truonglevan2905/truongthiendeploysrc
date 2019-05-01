import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Admin} from 'models/Admins';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
      private URIADMIN="http://localhost:3000/posts/";
  constructor(private http: HttpClient) { }
  isCheckPermissionAdmin(name,pass):Observable<Admin>{
    return this.http.get<Admin[]>(this.URIADMIN+"getByAdminByUserPass/"+name+"/"+pass);
  }
}
