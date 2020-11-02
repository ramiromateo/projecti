import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AllservicesService {
  url="http://localhost:3000";
  constructor(private http:HttpClient) { }

  public create(usernew){
    return this.http.post(`${this.url}/api/register`,usernew);
  }
  public getone(carne){
    return this.http.get(`${this.url}/api/${carne}`);
  }

}
