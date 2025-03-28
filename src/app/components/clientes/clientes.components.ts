import { Component } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { Clientes } from '../../models/clientes.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  standalone: false,
  styleUrls:['./clientes.components.css'],
  templateUrl: './clientes.components.html',
})

export class ClientesComponent{
    clientes: Clientes[] = [];
    clientesForm: FormGroup;
    showForm: boolean = false;
    textoModal: string = "Nuevo cliente";
    isEditMode: boolean = false;
    selectedCliente: Clientes | null = null;


constructor(private clienteService: ClientesService
    , private formBuilder: FormBuilder
  ) {
    this.clientesForm = this.formBuilder.group({
      idCliente: [null],
      apellido: ['', [Validators.required, Validators.maxLength(50)]],
      direccion: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.maxLength(50)]],
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      telefono: ['', [Validators.required, Validators.maxLength(50)]],

    })

  }

ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.clienteService.getCliente().subscribe({
      next: data => {
        this.clientes = data;
        console.log("Hola mundo" ,data);
      }
    })
  }
  
  toggleForm(): void {
    this.showForm = !this.showForm;
    this.textoModal = "Nuevo cliente";
    this.isEditMode = false;
    this.selectedCliente = null;
    /* con reset vamos a hacer que el formulario quede en limpio */
    this.clientesForm.reset();
    
  }
  
  crearCliente(): void {
    if (this.clientesForm.invalid) {
      return;
      
    }

/*     en Clientes proviene de la interfaz en donde se recibiran los datos */
    const clienteData: Clientes = this.clientesForm.value;
    
    /* console.log("validar guardar", this.crearCliente) */
    console.log("guardar crearCliente", clienteData)
    if (this.isEditMode) {
      this.clienteService.updateCliente(clienteData).subscribe({
        next: (updateCliente) => {
          const index = this.clientes.findIndex(a => a.idCliente === clienteData.idCliente);
          if (index !== -1) {
            this.clientes[index] = updateCliente;
          }
          Swal.fire({
            title: updateCliente.nombre + " actualizada",
            text: "El cliente fue actualizado exitosamente",
            icon: "success"
          });
          
        }, error: (error) => {
          this.mostrarErrores(error);
        }
      });
    } else {
      this.clienteService.createCliente(clienteData).subscribe({
        next: (newCliente) => {
          Swal.fire({
            title: "Cliente" + newCliente.nombre + " creada",
            text: "El cliente fue creada exitosamente",
            icon: "success"
            });
            this.clientes.push(newCliente);
        }, error: (error) => {
            this.mostrarErrores(error);
          }
        })

    }
    this.showForm = false;
    this.clientesForm.reset();

}

mostrarErrores(errorResponse: any): void {
    if (errorResponse && errorResponse.console.error) {
      let errores = errorResponse.error;
      let mensajeErrores = "";
      for (let campo in errores) {
        if (errores.hasOwnProperty(campo)) {
          mensajeErrores += errores[campo];
        }
      }
      Swal.fire({
        title: "Errores encontrados",
        text: mensajeErrores.trim(),
        icon: "error"
      });
    }
  }


  editCliente(cliente: Clientes) {
    this.selectedCliente = cliente;
    this.textoModal = " Editando Cliente: " + cliente.nombre;
    this.isEditMode = true;
    this.showForm = true;

    this.clientesForm.patchValue({
      idCliente: cliente.idCliente,
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      email: cliente.email,
      telefono: cliente.telefono,
      direccion: cliente.direccion,
    })
  }

  deleteCliente(idCliente: number) {
    Swal.fire({
      title: "Eliminar cliente",
      text: "Esta seguro de eliminar al cliente",
      icon: "question",
      showConfirmButton:true,
      showCancelButton:true
    }).then(resp=>{
      if(resp.isConfirmed){
        this.clienteService.deleteCliente(idCliente).subscribe({
          next:(deleteCliente)=>{
            this.clientes=this.clientes.filter(a=>a.idCliente!==idCliente);
            Swal.fire({
              title: "Cliente Eliminado",
              text:"El cliente fue eliminado con exito",
              icon: "success"
            });

          },
          error:(error)=>{
            this.mostrarErrores(error);
          }
        })
      }
    })

  }

}
