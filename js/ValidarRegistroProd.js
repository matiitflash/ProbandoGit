
$(function()
{
    let numeros = '1234567890';
    let letras  = 'qwertyuiopasdfghjklñzxcvbnmQWERTYUIOPASDFGHJKLÑZXCVBNM ';
   
    
    $('.txtID').keypress(function(e)
    {
        // obtener el caracter presionado por el usuario
        let caracter = String.fromCharCode(e.which);
        if(numeros.indexOf(caracter) < 0)
            return false;
    })

    $('.txtNombre').keypress(function(e)
    {
        // obtener el caracter presionado por el usuario
        let caracter = String.fromCharCode(e.which);
        if(letras.indexOf(caracter) < 0)
            return false;
    })
    $('.txtDesc').keypress(function(e)
    {
        // obtener el caracter presionado por el usuario
        let caracter = String.fromCharCode(e.which);
        if(letras.indexOf(caracter) < 0)
            return false;
    })

    $('.txtStock').keypress(function(e)
    {
        // obtener el caracter presionado por el usuario
        let caracter = String.fromCharCode(e.which);
        if(numeros.indexOf(caracter) < 0)
            return false;
    })

    $('.txtPrecio').keypress(function(e)
    {
        // obtener el caracter presionado por el usuario
        let caracter = String.fromCharCode(e.which);
        if(numeros.indexOf(caracter) < 0)
            return false;
    })


    $('.btnLimpiar').click(function()
    {
        $('.txtID, .txtNombre, .txtEmail,.txtPrecio,.txtDesc,.txtStock').val('');
        $('.txtID').focus();
    });


    $('.btnAceptar').click(function()
    
    
    {
        if(!$.trim($('.txtID').val()))
        {
            alert("Debe especificar ID");
            $('.txtID').focus();
        }
        else  if(!$.trim($('.txtNombre').val()))
        {
            alert("Debe especificar Nombre");
            $('.txtNombre').focus();
        }
        else  if(!$.trim($('.txtDesc').val()))
        {
            alert("Debe especificar Descripcion");
            $('.txtDesc').focus();
        }
        else if(!$.trim($('.txtStock').val()))
        {
            alert("Debe especificar Stock");
            $('.txtStock').focus();
        }
        else  if(!$.trim($('.txtPrecio').val()))
        {
            alert("Debe especificar precio");
            $('.txtPrecio').focus();
        }
        else if (!esImagen(archivo)) {
          alert("Por favor seleccione un archivo de imagen.");
          event.preventDefault();
        }
    })

});