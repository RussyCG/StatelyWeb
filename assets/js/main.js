"user strict";
/* --------------Table Of content ------------------
	1. Preloader
	2.Active menu  
	3.Responsive Menu toggle
	4.Smooth scroll
	5.text-animation
	6.Portfolio
	7.Portfolio Dynamic modal JS
	8.Contact Form Submit
	9.Team modal 
	10. Gear box
*/
/*--------------- 1.Preloader JS ----------------*/
	setTimeout(function(){
		$('.preloader').slideUp(700);
	}, 500);
	//Preloader

/* ---------------- 2.Active menu JS -----------------*/
jQuery(document).ready(function ($) {
	var secondaryNav = $('.site-menu '),
		TopHeadrHeight = $('.site-header').height(),
		secondaryNavHeight = $('.site-menu ul').height();
	animate_btn = $('.animate_btn, .site-logo'),
		site_menu_trigger = $('.site-menu-trigger'),
		contentSections = $('.ps-section'),
		secondaryNavTopPosition = secondaryNav.offset().top,
		taglineOffesetTop = $('.banner-text').offset().top + $('.banner-text').height() + parseInt($('.banner-text').css('paddingTop').replace('px', '')),
		ps_main_content = $('.ps-main-content');
	$(window).on('scroll', function () {
		if ($(window).scrollTop() > $('#banner').height()) {
			secondaryNav.addClass('is-fixed');
			ps_main_content.addClass('has-top-margin');
			$('#masthead').addClass('fixed');
			setTimeout(function () {
				animate_btn.addClass('slide-in');

			}, 50);

		} else {
			secondaryNav.removeClass('is-fixed');
			ps_main_content.removeClass('has-top-margin');
			$('#masthead').removeClass('fixed');
			setTimeout(function () {
				animate_btn.removeClass('slide-in');
			}, 50);

		}
		($(window).scrollTop() > taglineOffesetTop) ? animate_btn.addClass('is-hidden'): animate_btn.removeClass('is-hidden');

		updateSecondaryNavigation();
	});

	function updateSecondaryNavigation() {
		contentSections.each(function () {
			var actual = $(this),
				actualHeight = actual.height() + parseInt(actual.css('paddingTop').replace('px', '')) + parseInt(actual.css('paddingBottom').replace('px', '')),
				actualAnchor = secondaryNav.find('a[href="#' + actual.attr('id') + '"]');
			if ((actual.offset().top - secondaryNav.height() <= $(window).scrollTop()) && (actual.offset().top + actualHeight - secondaryNav.height() > $(window).scrollTop())) {
				actualAnchor.addClass('active');
			} else {
				actualAnchor.removeClass('active');
			}
		});
	}
	// Sticky Header  js END 

	/* ---------------- 3.Responsive Menu toggle JS -----------------*/
	site_menu_trigger.on('click', function (event) {
		event.preventDefault();
		$(this).toggleClass('menu-is-open');
		secondaryNav.find(' ul.menu').toggleClass('is-visible');
	});
	//  Responsive Menu toggle JS END 

	/*----------------- 4.Smooth scroll --------------- */
	$('.site-menu a, .redirect-btn').on('click', function (event) {
		if ($(this).parent().hasClass('menu-item-has-children')) {
			event.preventDefault();
		}
		var target = $(this.hash);
		event.preventDefault();

		$('body,html').animate({
			'scrollTop': target.offset().top - secondaryNav.height() + 1
		}, 400);
		site_menu_trigger.removeClass('menu-is-open');
		secondaryNav.find(' ul.menu').removeClass('is-visible');
	});
	// Smooth scroll END

	/*----------------- 5.text-animation ---------------------*/
	$(".text-rotator .rotate").textrotator({
		/* animation: "spin",*/
		speed: 3500
	}); //text-animation END 

	/*------------------- 6.Portfolio -----------------------*/
	$(function () {
		var filterList = {
			init: function () {
				$('.portfolio-list').mixItUp({
					selectors: {
						target: '.portfolio-item',
						filter: '.filter'
					},
					load: {
						filter: '*'
					}
				});
			}
		};
		// Run the portfolio 
		filterList.init();
	}); // Porfolio-mixitUP END

	//Porfolio Responsive tabs Dropdown
	if ($(window).width() < 767) {
		$('.portfolio_tabs_toogle').on('click', function () {
			$('.portfolio-tabs, .portfolio_tabs_toogle').toggleClass('tabs_open');
		});
		$('.portfolio-tabs li').each(function () {
			$(this).on('click', function () {
				var current_active = $(this).html();
				$('.portfolio_tabs_toogle').attr('data-active', current_active);
				$('.portfolio-tabs, .portfolio_tabs_toogle').removeClass('tabs_open');

			});

		});
	} // Porfolio Dropdown END


}); // Main document ready END

/*--------------------------- 7.Portfolio Dynamic modal JS --------------------*/
$(".port-link").on('click', function (e) {
	$(this).closest('.portfolio-item').addClass('active');
	var imgsrc = $(this).closest('.portfolio-inner').find(".portfolio_img").css('background-image'),
		imgsrc = imgsrc.replace('url(','').replace(')','');
		port_logo = $(this).closest('.portfolio-inner').find("img.port_logo").attr('src');
	port_title = $(this).closest('.portfolio-inner').find("span.port-title").html(),
		port_tag = $(this).closest('.portfolio-inner').find(".port_tag").html(),
		port_content = $(this).closest('.portfolio-inner').find(".port_content").html(),
		$('#port_img').css('background-image', 'url('+ imgsrc +')');
	$('#port_modal_logo').attr('src', port_logo);
	$('.port_modal h3').html(port_title);
	$('.port_modal small').html(port_tag);
	$('.port_modal #port-content').html(port_content);
	$('.port_modal').fadeIn(300);
});
$(".modal_close_btn").on('click', function () {
	$('.port_modal').fadeOut(200);
	$('.portfolio-item.active').removeClass('img_active');
});
//Portfolio Dynamic modal END

/*--------------------------------- 8.Contact Form Submit Js -----------------------*/
$(function () {
	var form = $('#ajax-contact');
	var formMessages = $('#form-messages');
	$(form).submit(function (e) {
		e.preventDefault();
		var formData = $(form).serialize();
		$.ajax({
				type: 'POST',
				url: $(form).attr('action'),
				data: formData
			})
			.done(function (response) {
				$(formMessages).removeClass('error');
				$(formMessages).addClass('success');
				setTimeout(function(){
					$(formMessages).removeClass('error, success');
				}, 5000);
				$(formMessages).text(response);
				$('#name').val('');
				$('#email').val('');
				$('#phone').val('');
				$('#message').val('');
			})
			.fail(function (data) {
				$(formMessages).removeClass('success');
				$(formMessages).addClass('error');
				if (data.responseText !== '') {
					$(formMessages).text(data.responseText);
				} else {
					$(formMessages).text('Oops! An error occured and your message could not be sent.');
				}
			});
	});
});
// Contact Form Submit Js END 

/*----------------------------- 9.Team modal Js ------------------------*/
$(".team_modal_link").on('click', function (e) {
	$(this).closest('.our-team').addClass('active');
	var imgsrc = $(this).closest('.team-inner').find("img").attr('src'),
		title = $(this).closest('.team-inner').find("h3").html(),
		work = $(this).closest('.team-inner').find("span").html(),
		content = $(this).closest('.team-inner').find("aside").html(),
		team_social = $(this).closest('.team-inner').find('.social').html();
	$('#expert_modal h3').html(title);
	$('#team_img').attr('src', imgsrc);
	$('#expert_modal aside').html(content);
	$('#expert_modal span').html(work);
	$('#expert_modal .team_modal_social').html(team_social);

	$('#expert_modal').fadeIn(300);
});
$(".modal_close_btn").on('click', function () {
	$('.port_modal').fadeOut(200);
	$('.portfolio-item.active').removeClass('img_active');
});
// Team modal Js END

/*------------------- 10.Gear BOX -------------------*/
$('.gear').on('click', function () {
	$('.gear-box').toggleClass('open');
})
$(document).ready(function () {
	if ($('body').hasClass('video-template')) {
		$('a.video-template').addClass('active');
	} else {
		$('a.image-template').addClass('active');
	}
});
//Gear BOX END
