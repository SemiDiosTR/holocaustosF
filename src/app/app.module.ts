import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/commons/navbar/navbar.component';
import { ClientesComponent } from './components/clientes/clientes.components';
import { ReactiveFormsModule } from '@angular/forms';  
import { provideHttpClient } from '@angular/common/http';
//import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    NavbarComponent,
    ClientesComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
