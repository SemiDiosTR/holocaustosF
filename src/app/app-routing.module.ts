import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.components';
import { ProductosComponent } from './components/productos/productos.component'; 
import { PedidiosComponent } from './components/pedidios/pedidios.component';

const routes: Routes = [
  {path: "clientes", component:ClientesComponent},
  {path: "productos", component:ProductosComponent},
  {path: "pedidos", component:PedidiosComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
