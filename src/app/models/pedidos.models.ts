import { Clientes } from 'src/app/models/clientes.model';



export interface Pedidos{
    idPedido: number | null;
    idCliente: String | null;
    idProductos: String;
    total: String;
    fechaCreacion: string;
    estado: string;
}
