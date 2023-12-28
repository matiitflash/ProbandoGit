$(document).ready(function() {
    var divisa = 'CLP'; //Divisa por defecto pesos chilenos
    getProductos(divisa); //Carga el listado de productos con la divisa por defecto
});

//Función para cambiar divisa segun valor seleccionado
$('.cambiar-divisa').on("click", function() {        
    var divisa = $(this).attr("data-divisa"); //Obtiene el valor de la divisa
    getProductos(divisa); //Carga el listado de productos con la divisa por defecto
});

//Función para obtener la divisa por la API segun valor seleccionado 
function obtenerDivisa(divisa) {
    var fecha = getFecha(); //Va a buscar la fecha para traer el valor de la divisa
    var url = 'https://mindicador.cl/api/'+divisa+'/'+fecha; //Crea la url
    return new Promise(function(resolve, reject) { //Consulta la API segun la url creada
        $.getJSON(url, function(data) {
            resolve(data.serie[0].valor); //Guarda el valor encontrado que devuelve la API
        }).fail(function() {
            reject('Error al obtener el valor de la divisa seleccionada');
        });
    });
}

//Función para formatear el valor del precio en CLP
function formatToCLP(precio) {
    return precio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
}

//Función para formatear el valor del precio en USD
function formatToUSD(precio, dolar) {
    var valor = precio / dolar; 
    valor.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
    return valor.toFixed(2);
}

//Función para obtener la fecha
function getFecha(){
    // Crear un objeto de fecha para hoy
    var today = new Date();
    var fecha = new Date(today);

    //Trae dia de la semana
    var diaSemana = today.getDay();

    //Validar si es Sábado o Domingo y restar según corresponda
    //Ya que el valor del dolar del finde semana y el mismo que el del Viernes
    if(diaSemana === 6) {
        fecha.setDate(today.getDate() - 1);
    }else if(diaSemana === 0) {
        fecha.setDate(today.getDate() - 2);
    }
    
    // Formatear la fecha de ayer como una cadena de texto con ceros a la izquierda si es necesario
    var formattedDate = fecha.getDate().toString().padStart(2, '0') + '-' + (fecha.getMonth() + 1).toString().padStart(2, '0') + '-' + fecha.getFullYear();

    // Asignar la fecha de ayer al elemento con ID "fechaAyer"
    return formattedDate;
}

//Función para obtener los productos según la divisa
function getProductos(divisa) {
    
    //Se setean los valores por defecto cada vez que se cargue o actualice
    $('#alimento').html('<h1 style="color: #1b325f;">Alimento</h1>');
    $('#higiene').html('<h1 style="color: #1b325f;">Higiene</h1>');
    $('#juguetes').html('<h1 style="color: #1b325f;">Juguetes</h1>');

    var urlProductos = "json/productos.json";
    var urlBase = "img/imgnproductos/";
    var id = '';
    var nombre = '';
    var descripcion = '';
    var stock = '';
    var precio = '';
    var imagen = '';
    var categoria = '';
    var card = '';
        
    //Validar el tipo de divisa
    if(divisa === 'CLP') {
        $.getJSON(urlProductos, function(productos) {
            $.each(productos, function(key, producto) {
                id = producto.id;
                nombre = producto.nombre;
                descripcion = producto.descripcion;
                stock = producto.stock;
                precio = formatToCLP(producto.precio) + ' CLP';                    
                categoria = producto.categoria;
                imagen = urlBase+categoria+'/'+producto.imagen;
                card = '<div class="col-xs-12 col-sm-6 col-md-3">'+
                                '<div class="card">'+
                                    '<img src="'+imagen+'" class="card-img-top" alt="...">'+
                                    '<div class="card-body" style="background-color: #3a89c9; color: white;">'+
                                        '<h5 class="card-title">'+nombre+'</h5>'+
                                        '<p class="card-text">'+descripcion+'</p><br>'+
                                        '<h6>Stock: '+stock+'</h6><h4 class="card-text">'+precio+'</h4>'+
                                        '<a href="#" class="btn btn-primary" style="background-color: #f26c4f; border-color:#f26c4f;"><span>&#128722;</span>Añadir al Carrito</a>'+
                                    '</div>'+
                                '</div><br>'+
                            '</div>';
                $('#'+categoria).append(card);
            });
        });
    }else if(divisa === 'USD') {
        var valorDolar;
        obtenerDivisa('dolar').then(function(valor) {
            valorDolar = valor;
            $.getJSON(urlProductos, function(productos) {
                $.each(productos, function(key, producto) {
                    id = producto.id;
                    nombre = producto.nombre;
                    descripcion = producto.descripcion;
                    stock = producto.stock;                        
                    precio = formatToUSD(producto.precio, valorDolar) + ' USD';                   
                    categoria = producto.categoria;
                    imagen = urlBase+categoria+'/'+producto.imagen;;
                    card = '<div class="col-xs-12 col-sm-6 col-md-3">'+
                                    '<div class="card">'+
                                        '<img src="'+imagen+'" class="card-img-top" alt="...">'+
                                        '<div class="card-body" style="background-color: #3a89c9; color: white;">'+
                                            '<h5 class="card-title">'+nombre+'</h5>'+
                                            '<p class="card-text">'+descripcion+'</p><br>'+
                                            '<h6>Stock: '+stock+'</h6><h4 class="card-text">$'+precio+'</h4>'+
                                            '<a href="#" class="btn btn-primary" style="background-color: #f26c4f; border-color:#f26c4f;"><span>&#128722;</span>Añadir al Carrito</a>'+
                                        '</div>'+
                                    '</div><br>'+
                                '</div>';
                    $('#'+categoria).append(card);    
                });
            });
        }).catch(function(error) {
            console.error(error);
        });
    }
}