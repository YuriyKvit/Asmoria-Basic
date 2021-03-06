/**
 * Created by Asmoria-Y on 20.01.2015.
 */

var sUrl_r = '/profiler/register';      // Url for registration
var sUrl_a = '/profiler';          // Url for authorization
var Form;

$(document).ready(function () {

});

function ajaxSubmit_c(s) {
    switch (s) {
        case 'register':
            event.preventDefault ? event.preventDefault() : (event.returnValue = false);
            var form = document.forms.namedItem("register_main");
            $(form.parentNode).html();
            var oData_r = new FormData(document.forms.namedItem("register_main"));
            $.ajax({
                url: sUrl_r,
                type: 'POST',
                data: oData_r,
                dataType: 'JSON',
                contentType: false,
                processData: false,
                success: function (sResponce) {
                    if (sResponce.status === true) {
                        $('.modal-body').html(sResponce.content);
                        $('#success, .auth_form').hide();
                        $('.logout-wrap').html(sResponce.loginBar);
                    }
                    else {
                        $('.modal-body').html(sResponce.errors + $(form.parentNode).html());
                    }
                }
            });
            break;
        case 'auth':
            event.preventDefault ? event.preventDefault() : (event.returnValue = false);
            Form = $('.logout-wrap').html();
            var oData_a = new FormData(document.forms.namedItem("auth_main"));
            $.ajax({
                url: sUrl_a,
                type: 'POST',
                data: oData_a,
                contentType: false,
                processData: false,
                dataType: 'JSON',
                success: function (sResponce) {
                    $('.navbar-right').html(sResponce);
                    if (sResponce.status == 'ok') {
                        $('.auth_form').hide();
                        $('.logout-wrap').html(sResponce.content);
                    }
                    else {
                        $('.auth_form').hide();
                        $('.logout-wrap').html('<div class = "error-text">'+sResponce.content+'</div>');
                        if(sResponce.reload == "true"){
                            location.reload();
                        }
                        setTimeout("$('.logout-wrap').html(Form);", 3000);
                    }
                }
            });
            break;
        default:
            document.write('Error JS');
    }
}
