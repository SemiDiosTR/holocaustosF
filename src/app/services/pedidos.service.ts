import { Injectable } from "@angular/core";
import { environment } from "../environments/environments";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Producto } from "../models/productos.models";
import { Pedidos } from "../models/pedidos.models";

@Injectable({
    providedIn: 'root'
})

export class PedidosService{
    private apiUrl: string = environment.apiUrl + 'pedidos/';
    constructor(private http: HttpClient){} /* ////// */
    
    /* CREACION DE METODOS */

    getPedido():Observable<Pedidos[]>{
        return this.http.get<Pedidos[]>(this.apiUrl);
    }

    createPedido(pedidos: Pedidos):Observable<Pedidos>{
        return this.http.post<Pedidos>(`${this.apiUrl}`, pedidos);
    }





    /* CORREGIR, SOLO ESTA DE PRUEBA PUEDE QUE NO SEA ASI */
    updatePedido(pedidos: Pedidos): Observable<Pedidos>{
        return this.http.put<Pedidos>(`${this.apiUrl}`, pedidos.idPedido)
    }


    deleteProducto(idPedidos: number):Observable<Pedidos>{
        return this.http.delete<Pedidos>(`${this.apiUrl}${idPedidos}`);
    }
    
}