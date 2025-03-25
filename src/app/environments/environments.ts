//conexion a base de datos

export const environment={
    production:false,

    //traer datos por medio de direccion ip
    //cuando se haga cambio en el levantamiendo de la tabla esta direccion debera de cambiar
    /* apiUrl:'http://192.168.0.191:1521/'
 */
    //traer datos por medio apigateway
    /* apiUrl:'http://localhost:8090/api/' */

    apiClientes:'http://localhost:8081/',
    apiUrl:'http://localhost:8090/api/'
}