$(function()
{
    let numeros = '1234567890';
    let letras  = 'qwertyuiopasdfghjklñzxcvbnmQWERTYUIOPASDFGHJKLÑZXCVBNM ';
    
    
    $('.txtEmail').keypress(function(e)
    {
        let patron = letras + numeros + '@._-';
        let caracter = String.fromCharCode(e.which);
        if(patron.indexOf(caracter) < 0)
            return false;
    })

    $('.btnEnviar').click(function()
    {
        $('.txtText, .txtEmail').val('');
        $('.txtEmail').focus();
    });



    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/

    $('.btnEnviar').click(function()
    {
        if(!$.trim($('.txtText').val()))
        {
            alert("Debe especificar direccion");
            $('.txtText').focus();
        }
        else  if(!$.trim($('.txtEmail').val()))
        {
            alert("Debe especificar email");
            $('.txtEmail').focus();
        }
        else  if(!emailRegex.test(($('.txtEmail').val())))
        {
            alert("El formato del correo no es válido");
            $('.txtEmail').focus();
        }

    })
})



