import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/commons/navbar/navbar.component';
import { ClientesComponent } from './components/clientes/clientes.components';
import { ProductosComponent } from './components/productos/productos.component';
import { ReactiveFormsModule } from '@angular/forms';  
import { provideHttpClient } from '@angular/common/http';
import { PedidiosComponent } from './components/pedidios/pedidios.component';

/* import { MatTableModule } from '@angular/material/table';  */




@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    ProductosComponent,
    NavbarComponent,
    PedidiosComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
   /*  MatTableModule,  */
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
