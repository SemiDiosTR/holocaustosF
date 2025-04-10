import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pedidos } from 'src/app/models/pedidos.models';
import { ClientesService } from 'src/app/services/clientes.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})

export class PedidosComponent {
  pedidos: Pedidos[]=[];
  pedidosForm: FormGroup;
  showForm: boolean = false;
  textoModal: string = "Nuevo Pedido";
  isEditMode: boolean = false;
  selectedPedido: Pedidos | null = null;


  constructor(private pedidoService: PedidosService,
    private formBuilder: FormBuilder
  ){
    this.pedidosForm = this.formBuilder.group({
      idPedido: [null],
      nombre:['',[Validators.required, Validators.maxLength(50)]],
      descripcion:['',[Validators.required, Validators.maxLength(50)]],
      precio:['',[Validators.required]],
      stock:['',[Validators.required]],

    })

  }

ngOnInit(): void{
  this.loadPedidos();
   
}

loadPedidos():void{
  this.pedidoService.getPedido().subscribe({
    next: data => {
      this.pedidos = data;
      console.log("Hola mundo", data);
    }
  })
}

toggleForm(): void{
  this.showForm = !this.showForm;
  this.textoModal = "Nuevo pedido";
  this.isEditMode = false;
  this.selectedPedido = null;
  this.pedidosForm.reset();
}

/* ESTATUS STYLE */
estadoColor: String = 'text-warning';
estadoStyle( estado: string): String{
  this.estadoColor = '';
  
  if(estado == '0'  ){
    this.estadoColor = 'text-danger'; 
  }

  if(estado == '1'  ){
    this.estadoColor = 'text-primary'; 
  }
  
  if(estado == '2'  ){
    this.estadoColor = 'text-warning';
  }

  if(estado == '3'  ){
    this.estadoColor = 'text-success';
  }
  return this.estadoColor;
}

/*ESTATUS TO STRING
estadoText : string = 'unchanged';
estadoToString (estado : string): string{

 
  switch(estado) {
    case '0' : {
      this.estadoText='CANCELADO';
      return this.estadoText;
      break;
    }

    case '1' : {
      this.estadoText = 'PENDIENTE';
      return this.estadoText;
    }

    case '2' : {
      this.estadoText = 'ENVIADO';
      return this.estadoText;
    }

    case '3' : {
      this.estadoText = 'ENTREGADO';
      return this.estadoText;
    }

    default: {
      this.estadoText= 'INDEFINIDO';
      return this.estadoText;
    }
  }
}
*/

estadoText : string = '';
estadoToString(estado: string): string {
  const mapping: { [key: string]: string } = {
      '0': 'CANCELADO',
      '1': 'PENDIENTE',
      '2': 'ENVIADO',
      '3': 'ENTREGADO',
  };

  this.estadoText = mapping[estado] || 'INDEFINIDO';
  return this.estadoText;
}

crearPedidos(): void{
  if(this.pedidosForm.invalid){
    return;
  }


  const pedidoData: Pedidos = this.pedidosForm.value;

  if(this.isEditMode){
    this.pedidoService.updatePedido(pedidoData).subscribe({
      next: (updatePedido) =>{
        const index = this.pedidos.findIndex(a=>a.idPedido === pedidoData.idPedido);
        if(index ! == -1){
          this.pedidos[index] = updatePedido;
        }
        Swal.fire({
          title: updatePedido.idProductos + "actualizada",
          text: "el pedido fue actualizado exitosamente",
          icon:"success"
        })
      }
    })
  }
}

}
