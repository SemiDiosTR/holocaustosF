import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clientes } from '../models/clientes.model';



@Injectable({
    providedIn: 'root'
  })
export class ClientesService {


  private apiUrl: string = environment.apiUrl + 'clientes/';
  constructor(private http: HttpClient){ }
    getCliente():Observable<Clientes[]>{
      return this.http.get<Clientes[]>(this.apiUrl);

    }

    createCliente(cliente: Clientes):Observable<Clientes>{
      return this.http.post<Clientes>(`${this.apiUrl}`,cliente);
    }

    
    updateCliente(cliente: Clientes): Observable<Clientes>{
      return this.http.put<Clientes>(`${this.apiUrl}${cliente.idCliente}`, cliente);
    }
    
    deleteCliente(idCliente: number):Observable<Clientes>{
      return this.http.delete<Clientes>(`${this.apiUrl}${idCliente}`);
    
    }
}