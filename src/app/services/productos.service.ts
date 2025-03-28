import { Injectable } from "@angular/core";
import { environment } from "../environments/environments";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Producto } from "../models/productos.models";

@Injectable({
    providedIn: 'root'
  })
export class ProductosService {


    private apiUrl: string = environment.apiUrl + 'productos/';
  constructor(private http: HttpClient){ }
    getProducto():Observable<Producto[]>{
      return this.http.get<Producto[]>(this.apiUrl);

    }

    createProducto(producto: Producto):Observable<Producto>{
      return this.http.post<Producto>(`${this.apiUrl}`,producto);
    }

    
    updateProducto(producto: Producto): Observable<Producto>{
      return this.http.put<Producto>(`${this.apiUrl}${producto.idProducto}`, producto);
    }
    
    deleteProducto(idProducto: number):Observable<Producto>{
      return this.http.delete<Producto>(`${this.apiUrl}${idProducto}`);
    
    }
}