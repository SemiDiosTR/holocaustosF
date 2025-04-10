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
          title: updatePedido.lista_producto + "actualizada",
          text: "el pedido fue actualizado exitosamente",
          icon:"success"
        })
      }
    })
  }
}

}
