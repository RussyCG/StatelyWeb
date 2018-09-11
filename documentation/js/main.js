/*------------------------------------- 2.smooth scroll --------------------------------*/
$(document).ready(function(){
 $('#nav ul a').on('click', function(event){
    event.preventDefault();
    var target= $(this.hash);  
        $('body,html').animate({
          'scrollTop': target.offset().top
          }, 400
      );
  
    
	});
 });

 /*-------- smooth scroll-end -----------*/
jQuery(document).ready(function($){
	var secondaryNav = $('.site-menu'),
		secondaryNavTopPosition = secondaryNav.offset().top,
		taglineOffesetTop = $('#bannr_text').offset().top + $('#bannr_text').height() + parseInt($('#bannr_text').css('paddingTop').replace('px', '')),
		contentSections = $('.ps-section');
	
	$(window).on('scroll', function(){
		//on desktop - assign a position fixed to logo and action button and move them outside the viewport
		( $(window).scrollTop() > taglineOffesetTop ) ? $('#ps-logo, .ps-btn').addClass('is-hidden') : $('#ps-logo, .ps-btn').removeClass('is-hidden');
		
		//on desktop - fix secondary navigation on scrolling
		if($(window).scrollTop() > secondaryNavTopPosition ) {
			//fix secondary navigation
			secondaryNav.addClass('is-fixed');
			//push the .ps-main-content giving it a top-margin
			$('.ps-main-content').addClass('has-top-margin');	
			//on Firefox CSS transition/animation fails when parent element changes position attribute
			//so we to change secondary navigation childrens attributes after having changed its position value
			setTimeout(function() {
	            secondaryNav.addClass('animate-children');
	            $('#ps-logo').addClass('slide-in');
				$('.ps-btn').addClass('slide-in');
	        }, 50);
		} else {
			secondaryNav.removeClass('is-fixed');
			$('.ps-main-content').removeClass('has-top-margin');
			setTimeout(function() {
	            secondaryNav.removeClass('animate-children');
	            $('#ps-logo').removeClass('slide-in');
				$('.ps-btn').removeClass('slide-in');
	        }, 50);
		}
		//on desktop - update the active link in the secondary fixed navigation
		updateSecondaryNavigation();
	});
	function updateSecondaryNavigation() {
		contentSections.each(function(){
			var actual = $(this),
				actualHeight = actual.height() + parseInt(actual.css('paddingTop').replace('px', '')) + parseInt(actual.css('paddingBottom').replace('px', '')),
				actualAnchor = secondaryNav.find('a[href="#'+actual.attr('id')+'"]');
			if ( ( actual.offset().top - secondaryNav.height() <= $(window).scrollTop() ) && ( actual.offset().top +  actualHeight - secondaryNav.height() > $(window).scrollTop() ) ) {
				actualAnchor.addClass('active');
			}else {
				actualAnchor.removeClass('active');
			}
		});
	}
	//on mobile - open/close secondary navigation clicking/tapping the .site-menu-trigger
	$('.site-menu-trigger').on('click', function(event){
		event.preventDefault();
		$(this).toggleClass('menu-is-open');
		secondaryNav.find(' ul').toggleClass('is-visible');
	});
	//smooth scrolling when clicking on the secondary navigation items
	secondaryNav.find('ul a').on('click', function(event){
        event.preventDefault();
        var target= $(this.hash);
        $('body,html').animate({
        	'scrollTop': target.offset().top - secondaryNav.height() + 1
        	}, 400
        ); 
        //on mobile - close secondary navigation
        $('.site-menu-trigger').removeClass('menu-is-open');
        secondaryNav.find(' ul').removeClass('is-visible');
    });
    //on mobile - open/close primary navigation clicking/tapping the menu icon
	$('.ps-primary-nav').on('click', function(event){
		if($(event.target).is('.ps-primary-nav')) $(this).children('ul').toggleClass('is-visible');
	});
});
$(document).ready(function() {
	$('.accordion').find('.accordion-toggle').click(function() {
		$(this).next().slideToggle('600');
		$(".accordion-content").not($(this).next()).slideUp('600');
	});
	$('.accordion-toggle').on('click', function() {
		$(this).toggleClass('active').siblings().removeClass('active');
	});
});

