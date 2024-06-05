import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './componentes/login.component';
import { RegisterComponent } from './componentes/register.component';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { LibrosComponent } from './componentes/libros.component';
import { NavbarComponent } from './componentes/navbar.component';
import { UsuarioComponent } from './componentes/usuario.component';
import { ReservaComponent } from './componentes/reserva.component';
import { jwtInterceptor } from './jwt.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LibrosComponent,
    NavbarComponent,
    UsuarioComponent,
    ReservaComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule ,
    AppRoutingModule,
    HttpClientModule,
    RouterLink,
    BrowserModule
    

  ],
  providers: [AuthService, provideHttpClient(withInterceptors([jwtInterceptor]))],
  bootstrap: [AppComponent]
})
export class AppModule { }
