import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './componentes/login.component';
import { RegisterComponent } from './componentes/register.component';
import { LibrosComponent } from './componentes/libros.component';
import { UsuarioComponent } from './componentes/usuario.component';
import { ReservaComponent } from './componentes/reserva.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'libros', component: LibrosComponent },
  { path: 'user', component: UsuarioComponent },
  { path: 'reservas', component: ReservaComponent },

  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
