import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PublicacionComponent } from './components/publicacion/publicacion.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { EditperfilComponent } from './components/editperfil/editperfil.component';
import { PensumComponent } from './components/pensum/pensum.component';
import { BrowserModule } from '@angular/platform-browser'
import { CargarComponent } from './components/cargar/cargar.component';

const routes: Routes = [
  {
    path:'',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'recovery',
    component: RecoveryComponent
  },
  {
    path:'inicio',
    component: InicioComponent
  }
  ,
  {
    path:'publicacion',
    component: PublicacionComponent
  },
  {
    path:'perfil',
    component: PerfilComponent
  },
  {
    path:'editperfil',
    component: EditperfilComponent
  },
  {
    path:'pensum',
    component: PensumComponent
  }
  ,
  {
    path:'cargar',
    component: CargarComponent
  }
];


@NgModule({
  imports: [BrowserModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
