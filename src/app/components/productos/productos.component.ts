import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/models/productos.models';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
    productos: Producto[] = [];
    productosForm: FormGroup;
    showForm: boolean = false;
    textoModal: string = "Nuevo producto";
    editIndex:number | null = null;
    isEditMode: boolean = false;
    selectedProducto: Producto | null = null;


    constructor(private ProductoService: ProductosService
      , private formBuilder: FormBuilder
    ) {
      this.productosForm = this.formBuilder.group({
        idProducto: [null],
        nombre: ['', [Validators.required, Validators.maxLength(50)]],
        descripcion: ['', [Validators.required, Validators.maxLength(50)]],
        precio: ['', [Validators.required, Validators.maxLength(50)]],
        stock: ['', [Validators.required, Validators.maxLength(50)]],
  
      })
  
    }

    ngOnInit(): void {
      this.loadProductos();
    }
  
    loadProductos(): void {
      this.ProductoService.getProducto().subscribe({
        next: data => {
          this.productos = data;
          console.log("Hola mundo" ,data);
        }
      })
    }


      
      toggleForm(): void {
        this.showForm = !this.showForm;
        this.textoModal = "Nuevo producto";
        this.isEditMode = false;
        this.selectedProducto = null;
        /* con reset vamos a hacer que el formulario quede en limpio */
        this.productosForm.reset();
        
      }
      
      crearProducto(): void {
        if (this.productosForm.invalid) {
          return;
          
        }
    
    /*     en Clientes proviene de la interfaz en donde se recibiran los datos */
        const productoData: Producto = this.productosForm.value;
        
        /* console.log("validar guardar", this.crearCliente) */
        console.log("guardar producto ", productoData)
        if (this.isEditMode) {
          this.ProductoService.updateProducto(productoData).subscribe({
            next: (updateProducto) => {
              const index = this.productos.findIndex(a => a.idProducto === productoData.idProducto);
              if (index !== -1) {
                this.productos[index] = updateProducto;
              }
              Swal.fire({
                title: updateProducto.nombre + " actualizada",
                text: "El producto fue actualizado exitosamente",
                icon: "success"
              });
              
            }, error: (error) => {
              this.mostrarErrores(error);
            }
          });
        } else {
          this.ProductoService.createProducto(productoData).subscribe({
            next: (newProducto) => {
              Swal.fire({
                title: "Producto " + newProducto.nombre + " creada",
                text: "El producto fue creada exitosamente",
                icon: "success"
                });
                this.productos.push(newProducto);
            }, error: (error) => {
                this.mostrarErrores(error);
              }
            })
    
        }
        this.showForm = false;
        this.productosForm.reset();
        
    
    
    }
    


/* MOSTRAR ERRORES */
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

/* EDITAR de los productos */

     editProducto(producto: Producto) {
        this.selectedProducto = producto;
        this.textoModal = producto.nombre;
        this.isEditMode = true;
        this.showForm = true;
    
        this.productosForm.patchValue({
          idProducto: producto.idProducto,
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: producto.precio,
          stock: producto.stock,
    
        })
      }


/* ELIMINAR */

       deleteProducto(idProducto: number) {
          Swal.fire({
            title: "Eliminar producto",
            text: "Esta seguro de eliminar el producto",
            icon: "question",
            showConfirmButton:true,
            showCancelButton:true
          }).then(resp=>{
            if(resp.isConfirmed){
              this.ProductoService.deleteProducto(idProducto).subscribe({
                next:(deleteProducto)=>{
                  this.productos=this.productos.filter(a=>a.idProducto!==idProducto);
                  Swal.fire({
                    title: "Producto Eliminado",
                    text:"El producto fue eliminado con exito",
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

