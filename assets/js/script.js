function carouselCase() {
    if ($(".carousel-case").length) {
      $(".carousel-case").owlCarousel({
        loop: true,
        margin: 20,
        items: 2,
        nav: true,
        autoplay: false,
        smartSpeed: 1500,
        dots: false,
        responsiveClass: true,
        thumbs: true,
        thumbsPrerendered: true,
        navText: ["<img src='assets/img/icoArrowLeft.svg'>", "<img src='assets/img/icoArrowRight.svg'>"],
        responsive: {
          0: {
            items: 1,
            margin: 30
          },
          991: {
            items: 2,
            margin: 30
          }
        }
      });
    }
  }
  function carouselClientes() {
    if ($(".carousel-cliente").length) {
      $(".carousel-cliente").owlCarousel({
        loop: true,
        margin: 20,
        items: 2,
        nav: true,
        autoplay: false,
        smartSpeed: 1500,
        dots: false,
        responsiveClass: true,
        thumbs: true,
        thumbsPrerendered: true,
        navText: ["<img src='assets/img/icoArrowLeft.svg'>", "<img src='assets/img/icoArrowRight.svg'>"],
        responsive: {
          0: {
            items: 1,
            margin: 30
          },
          767: {
            items: 2,
            margin: 30
          },
          991: {
            items: 3,
            margin: 30
          },
          1180: {
            items: 3,
            margin: 20
          },
          1360: {
            items: 3,
            margin: 20
          }
        }
      });
    }
  }

$(function() {
	$("header .menu a, header a.logo, button.link-roll, footer section.menu .logo").click(function() {
		var $anchor = $(this);
		$("header .menu").removeClass('active')
		$('html, body, header').stop().animate({
			scrollTop: ($($anchor.attr('href')).offset().top - 70)
		}, 1000);
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

		if(scrollTop > topo - 10){
			$('button.gotop').css({'display' : 'block'});
		} else {
			$('button.gotop').css({'display' : 'none'});
		}        
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
    $('section.contato .resposta button').click(function() {
        $('section.contato .resposta').removeClass('active');
    });
    $('section.contato button.envia').click(function() {
        $('section.contato .resposta').addClass('active');
    });
	$('#enviaMensagem').validate({
		rules: {
			nome: { required: true, minlength: 2 },
			email: { required: true, email: true },
			telefone: { required: true, minlength: 14 }
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
					$('section.contato .resposta').addClass('active');
					$("#enviaMensagem input[type='text']").val("");
					$("#enviaMensagem input[type='email']").val("");
				}
			});
			return false;
		}
	});
});
