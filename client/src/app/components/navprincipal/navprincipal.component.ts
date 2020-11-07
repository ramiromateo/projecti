import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navprincipal',
  templateUrl: './navprincipal.component.html',
  styleUrls: ['./navprincipal.component.css']
})
export class NavprincipalComponent implements OnInit {

  iniciarSesion: boolean = true;
	registrarse: boolean = true;
	cerrar: boolean = true;
	carrito:boolean =true;
	perfil:boolean=true;
	detalleregaslo:boolean=true;
	catalogo:boolean=true;


	constructor(private router:Router) {
		
		if (!localStorage.getItem('usuarioActivo')) {
			//si no existe sesion
			this.iniciarSesion = false;
			this.registrarse = false;
			this.cerrar = false;
			this.carrito=true;
			this.perfil=true;
			this.detalleregaslo=true;
			this.catalogo=true;
		} else {
			//si hay sesion
			this.iniciarSesion = true;
			this.registrarse = true;
			this.cerrar = false;
			this.carrito=false;
			this.perfil=false;

			this.detalleregaslo=true;
			this.catalogo=true;

			
			

			let useractual=localStorage.getItem('usuarioActivo')
			let isad=JSON.parse(useractual).is_admin
			 if(isad==1){
				this.perfil=true;
				this.carrito=true
				this.detalleregaslo=false;
				this.catalogo=false;
			 }
		}
		//console.log('Estoy en el constructor del navegador');
	}
	verificarSesion() {

	}
	cerrarSesion() {
		this.iniciarSesion = false;
		this.registrarse = false;
		this.cerrar = true;
		this.carrito=true;
		this.perfil=true;
		localStorage.clear();
		
		this.router.navigate(['/login']);
	}


	ngOnInit(): void {
	}

}
