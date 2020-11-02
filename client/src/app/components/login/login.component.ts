import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }
  editable=false
  cont:any
  tipouser="Administrador"
  newuser={
    carne:202000000,
    names:"",
    lastnames:"",
    password:"",
    mail:""
  }
  ngOnInit(): void {
  }
  saveuser(){}

  callregister(){
    this.router.navigate(['register']);
  }

}
