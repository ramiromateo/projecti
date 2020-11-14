import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AllservicesService {
  public  filtrar(filtrodefault: number, codecatedratico: number, codecurso: number) {
    return this.http.post(`${this.url}/api/publicacion/filtrar`,{tipo:filtrodefault,profesor:codecatedratico,curso:codecurso});
  }
  public getspecificcourse(num: number) {
    return this.http.get(`${this.url}/api/getallinicio/all/${num}`);
  }
  
  url="http://localhost:3000";
  constructor(private http:HttpClient) { }

  public create(usernew){
    return this.http.post(`${this.url}/api/register`,usernew);
  }
  public getone(carne){
    return this.http.get(`${this.url}/api/${carne}`);
  }
  public updatepass(usernew){
    return this.http.post(`${this.url}/api/update`,usernew);
  }
  public getallinicio() {
    return this.http.get(`${this.url}/api/getallinicio/all`);
  }
  
  public creatpublication(newpublication){
    return this.http.post(`${this.url}/api/registerpublication`,newpublication);
  }
  public createcomentary(newcometary){
    return this.http.post(`${this.url}/api/addcomentary`,newcometary);
  }
  public getonepublication(id){
    return this.http.get(`${this.url}/api/publicacion/${id}`);
  }
  
  public updateuser(user){
    return this.http.post(`${this.url}/api/updateuser`,user);
  }
  
  public getallcuourse(){
    return this.http.get(`${this.url}/api/pensum/all/all`);
  }
}
