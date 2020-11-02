import { Component, OnInit } from '@angular/core';
import { AllservicesService } from 'src/app/servicio/allservices.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  editable=false
  cont:any
  tipouser="Administrador"
  newuser={
    carne:0,
    names:"",
    lastnames:"",
    password:"",
    mail:""
}
  constructor(public allservicesService: AllservicesService,private router: Router) {

  }

  ngOnInit(): void {
  }
  saveuser(){
    if(this.newuser.carne!=0 && this.newuser.names!="" && this.newuser.lastnames!="" && this.newuser.password!="" && this.newuser.mail!=""){
      this.allservicesService.create(this.newuser).subscribe(
        res => {
          this.cont=res
          alert(this.cont.message)
          this.router.navigate(['login']);

        },
        err => {}
      );
    }
    else{
      alert("LLene todos lo campos")
    }
  }
  editar(){}
  calllogin(){
    
    this.router.navigate(['login']);
  }

}
