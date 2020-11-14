import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { FooterComponent } from './components/footer/footer.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NavprincipalComponent } from './components/navprincipal/navprincipal.component';
import { PublicacionComponent } from './components/publicacion/publicacion.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { EditperfilComponent } from './components/editperfil/editperfil.component';
import { PensumComponent } from './components/pensum/pensum.component';
import { CargarComponent } from './components/cargar/cargar.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    RecoveryComponent,
    InicioComponent,
    FooterComponent,
    NavprincipalComponent,
    PublicacionComponent,
    PerfilComponent,
    EditperfilComponent,
    PensumComponent,
    CargarComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
