$(document).ready(function() {
    Obtener_Ordenes_api();

});

function Obtener_Ordenes_api() {
    $.ajax({
        url: "https://eshop-deve.herokuapp.com/api/v2/orders",
        method: "GET",
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkM2NIVUVibVJoc1EzeXhNbzV2VnliSTFzaDZCSDJZRCIsImlhdCI6MTU4NTkzMjYzNDU0OH0.tMSht_M3ryQl5IqCirhYR1gb8j3FQ26vILT4Qpx4XrdFz-zUmqbgFYiKTaZHPpB85etRIMhxVoZf6tOrHy0fnA",
        },
        dataType: "JSON",

    }).then(function(data) {
        var html = '';
        var i;
        $('#numero').html(data.orders.length);
        for (i = 0; i < data.orders.length; i++) {
            html += '<tr>' +
                '<td>' + data.orders[i].items[0].sku + '</td>' +
                '<td>' + data.orders[i].items[0].name + '</td>' +
                '<td>' + data.orders[i].items[0].quantity + '</td>' +
                '<td>' + data.orders[i].items[0].price + '</td>' +

                '</tr>';

            $('#DataResult').html(html);
        }


        $('#TablaDeOrdenes').DataTable({

            language: {
                "sProcessing": "Procesando...",
                "sLengthMenu": "Mostrar _MENU_ resultados",
                "sZeroRecords": "No se encontraron resultados",
                "sEmptyTable": "Ningún dato disponible en esta tabla",
                "sInfo": "Mostrando resultados _START_-_END_ de  _TOTAL_",
                "sInfoEmpty": "Mostrando resultados del 0 al 0 de un total de 0 registros",
                "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                "sSearch": "Buscar:",
                "sLoadingRecords": "Cargando...",
                "oPaginate": {
                    "sFirst": "Primero",
                    "sLast": "Último",
                    "sNext": "Siguiente",
                    "sPrevious": "Anterior"
                },
            }
        });

    }).catch(function(err) {
        console.error(err);
    });
}



$("#frm-agregar").submit(function(event) {
    event.preventDefault();
    var html = '';


    var n = $('tr:last td', $("#TablaDeOrdenes")).length;
    console.log(n);
    html += '<tr role="row">' +
        '<td>' + $(this).find('input[name="sku"]').val() + '</td>' +
        '<td>' + $(this).find('input[name="Nombre"]').val() + '</td>' +
        '<td>' + $(this).find('input[name="Cantidad"]').val() + '</td>' +
        '<td>' + $(this).find('input[name="Precio"]').val() + '</td>' +

        '</tr>';
    $('#TablaDeOrdenes tbody').append(html);
    $('#TablaDeOrdenes').DataTable();
});