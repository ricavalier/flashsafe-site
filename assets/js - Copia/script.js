$('#myCarousel').carousel({
    interval: 10 * 60 * 1000
})

$('.carousel .carousel-item').each(function() {
    var minPerSlide = 4;
    var next = $(this).next();
    if (!next.length) {
        next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));

    for (var i = 0; i < minPerSlide; i++) {
        next = next.next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }

        next.children(':first-child').clone().appendTo($(this));
    }
});

$(function(){
	$("header .menu a, header a.logo, button.link-roll, footer section.menu .logo").click(function() {
		var $anchor = $(this);
		// if($('header').hasClass('headerFixed')){
            $("header .menu").removeClass('active')
			$('html, body, header').stop().animate({
				scrollTop: ($($anchor.attr('href')).offset().top - 70)
			}, 1000);
		// }else {
		// 	$('html, body, header').stop().animate({
		// 		scrollTop: (($($anchor.attr('href')).offset().top - $('header').outerHeight()) - 70 )
		// 	}, 1000);
		// }
	});
	
	$("footer section.menu .logo").click(function() {
		var $anchor = $(this);
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
	});
    $("header .menu-mobile button").click(function() {
        $("header .menu").toggleClass('active')
    });
});



$(function() {
	$(window).scroll(function()	{
		var scrollTop = $(window).scrollTop(); // qto foi rolado a barra
		var tamPagina = $(document).height(); // altura da página
		var topo = $('.topo').height();
		//console.log(scrollTop);
		 
		if(scrollTop > topo - 10){
			$('button.gotop').css({'display' : 'block'});
		} else {
			$('button.gotop').css({'display' : 'none'});
		}
		
		// if(scrollTop >= 25){
		// 	$('header').addClass("headerFixed");
		// 	//console.log("opa")
		// } else {
		// 	$('header').removeClass("headerFixed");
		// }          
	});
});

$(document).ready(function() { 


    $('#Telefone').mask('(00) 0000-00009');
    $('#Telefone').blur(function(event) {
        console.log(event)
        if($(this).val().length == 15){ // Celular com 9 dígitos + 2 dígitos DDD e 4 da máscara
            $('#Telefone').mask('(00) 00000-0009');
        } else {
            $('#Telefone').mask('(00) 0000-00009');
        }
    });
    $('section.contato button[type="button"]').click(function(){
        $('section.contato .resposta').hide();
    });
	$('#enviaMensagem').validate({
		rules: {
			nome: { required: true, minlength: 2 },
			email: { required: true, email: true },
			telefone: { required: true, minlength: 14 }
			// assunto: { required: true, minlength: 2 },
			// mensagem: { required: true, minlength: 20 }
		},
		messages: {
			nome: { required: 'Informe o seu nome!', minlength: 'No mínimo 2 caracteres!' },
			email: { required: 'Informe o seu email!', email: 'Informe um email válido!' },
			telefone: { required: 'Informe o seu telefone!', minlength: 'Informe o número com DDD com 8 ou 9 dígitos!' }
		},
		submitHandler: function(form) {
			var dados = $( form ).serialize();
			$.ajax({
				type: "POST",
				url: "envia.php", // COLOQUE AQUI O ARQUIVO PHP PARA ENVIO DA MENSAGEM
				data: dados,
				success: function(data)	{
					//alert( data );
					$("#enviaMensagem .resposta").show();
					$("#enviaMensagem input[type='text']").val("");
					$("#enviaMensagem input[type='email']").val("");
				}
			});
			return false;
		}
	});
});