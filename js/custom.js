jQuery.noConflict();
jQuery(document).ready(function($) {	

	"use strict";
	
	var isMobile = (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/Blackberry/i)) || (navigator.userAgent.match(/Windows Phone/i)) ? true : false;
	var $px, currentWidth;
	
	// Services Pretty Photo
	if($("a[data-gal^='prettyPhoto[pp_menucard]']").length) {
		$("a[data-gal^='prettyPhoto[pp_menucard]']").prettyPhoto({ 
			theme: 'dark_rounded',
			overlay_gallery: true, 
			social_tools: false,
			deeplinking: false
		});
	}
	
	//STICKY MENU...
	if($(".dt-sticky-menu").length) {
		$(".dt-sticky-menu").sticky({ topSpacing: 0 });
	}
	
	//TOGGLE PANEL...	
	$("#toggle-panel").on('click', function(e){
		if($('#toggle').hasClass('span')) {
			$('#toggle').removeClass('span');
			$('#toggle').addClass('span1');
		} else {
			$('#toggle').removeClass('span1');
			$('#toggle').addClass('span');
		}
		
		$("#panel").slideToggle("slow");
		e.preventDefault();
		return false;
	});
	
	$('section#panel').attr('style', 'display:none');
	
	
	// Newsletter Ajax Submit And Validation
	if($('form[name="frmnewsletter"]').length) {
			
		$('form[name="frmnewsletter"]').on('submit', function () {
			
			var This = $(this);
			if($(This).valid()) {
				var action = $(This).attr('action');
	
				var data_value = unescape($(This).serialize());
				$.ajax({
					 type: "POST",
					 url:action,
					 data: data_value,
					 error: function (xhr, status, error) {
						 confirm('Something went wrong!');
					   },
					  success: function (response) {
						$('#ajax_subscribe_msg').html(response);
						$('#ajax_subscribe_msg').slideDown('slow');
						if (response.match('success') !== null) $(This).slideUp('slow');
					 }
				});
			}
			return false;
			
		});
		
		$('form[name="frmnewsletter"]').validate({
			rules: { 
				mc_email: { required: true, email: true }
			},
			errorPlacement: function(error, element) { }
		});
		
	}
	
	// Enquiry Form Ajax Submit Ans validation
	if($('form[name="enqform"]').length) {
		
		$('form[name="enqform"]').on('submit', function () {
			var This = $(this);
			
			if($(This).valid()) {
				var action = $(This).attr('action');
	
				var data_value = unescape($(This).serialize());
				$.ajax({
					 type: "POST",
					 url:action,
					 data: data_value,
					 error: function (xhr, status, error) {
						 confirm('The page save failed.');
					   },
					  success: function (response) {
						$('#ajax_contactform_msg').html(response);
						$('#ajax_contactform_msg').slideDown('slow');
						if (response.match('success') !== null) $(This).slideUp('slow');
					 }
				});
			}
			return false;
		});
		
		$('form[name="enqform"]').validate({
			onfocusout: function(element)
			{	
				$(element).valid();
			},
			rules: { 
				txtname: { required: true },
				txtemail: { required: true, email: true },
				txtmessage: { required: true }
			}
		});
	
	}
	
	//Parallax 
	$('.dt-sc-parallax-section').parallax("20%", 0.1);
	
	// Main Menu
	$('#main-menu ul').superfish({
		delay:     400,	  
		cssArrows: false,
		animation: {opacity:'show',height:'show'},
		speed:	   'medium'
	});
	
	// Mobile Menu
	$("#dt-menu-toggle").on("click", function( event ){
		event.preventDefault();
		var $menu = $("nav#main-menu").find("ul.menu:first");
		$menu.slideToggle(function(){
			$menu.css('overflow' , 'visible');
			$menu.toggleClass('menu-toggle-open');
		});
	});

	$(".dt-menu-expand").on("click", function(event){
		if( $(this).hasClass("dt-mean-clicked") ){
			$(this).text("+");
			if( $(this).prev('ul').length ) {
				$(this).prev('ul').slideUp(300);
			} else {
				$(this).prev('.megamenu-child-container').find('ul:first').slideUp(300);
			}
		} else {
			$(this).text("-");
			if( $(this).prev('ul').length ) {
				$(this).prev('ul').slideDown(300);
			} else{
				$(this).prev('.megamenu-child-container').find('ul:first').slideDown(300);
			}
		}
		
		$(this).toggleClass("dt-mean-clicked");
		return false;
	});
	
	// Preloader
	Pace.on("done", function(){
		$("#loader-wrapper").fadeOut(500);
		$(".pace").remove();
	});	
	
	// Animate Number
	$('.dt-sc-counter-number').each(function(){
	  $(this).one('inview', function (event, visible) {
		  if(visible === true) {
			  var val = $(this).find('p').attr('data-value');
			  $(this).find('p').animateNumber({ number: val	}, 5000);
		  }
	  });
	});
	
	// Gallery Pretty Photo
	var $pphoto = $('a[data-gal^="prettyPhoto[gallery]"]');
	if($pphoto.length){
		$("a[data-gal^='prettyPhoto[gallery]']").prettyPhoto({ 
			overlay_gallery: false, 
			social_tools: false,
			deeplinking: false
		});
	}
	
	// Portfolio Load More
	var j = 1;
	$('.loadmore').on('click', function(e){
	
		if(j == 3) {
			$('.loadmore').text('Thats All!').css({"cursor":"default"});
			$('.loadmore').attr('data-hover', 'Thats All!');
		} else {

			$.ajax({
				type: "POST",
				url: "contents/portfolio-content-two-"+j+".html",
				dataType: "html",
				cache: false,
				msg : '',
				beforeSend: function(){
					$('.loadmore').html('Loading...');
					$('.loadmore').attr('data-hover', 'Loading...');
				},
				error: function (xhr, status, error) {
					confirm('Something went wrong!');
				},
				success: function(msg){
					$('.dt-sc-portfolio-container').append(msg);
					$('.dt-sc-portfolio-container').isotope( 'reloadItems' ).isotope();
				},
				complete: function(){
					if(j == 2) {
						$('.loadmore').text('Thats All!').css({"cursor":"default"});
						$('.loadmore').attr('data-hover', 'Thats All!');
					} else {
						$('.loadmore').text('More').css({"cursor":"pointer"});
						$('.loadmore').attr('data-hover', 'More');
					}
					j++;	
					
					//PRETTYPHOTO...
					var $pphoto = $('a[data-gal^="prettyPhoto[gallery]"]');
					if($pphoto.length){
						$("a[data-gal^='prettyPhoto[gallery]']").prettyPhoto({ 
							overlay_gallery: false, 
							social_tools: false,
							deeplinking: false
						});
					}
									
				} 
			});
			
		}
		
		//Isotope relayout...
		setTimeout(function() {
			   $('.dt-sc-portfolio-container').isotope('reLayout');
			   $(window).resize();
		}, 600);
		
		setTimeout(function() {
			   $(window).resize();
		}, 1200);
			   
		e.preventDefault();
		
	});
			
	//Contact Map...
	var $map = $('#contact_map');
	if( $map.length ) {
		$map.gMap({
			address: 'Iamdesigning, 1/52,3/53, Lal Bahadhur Colony,Shringar Nagar Road, Near Gopal Naidu School, Peelamedu, Coimbatore, TN 641004',
			zoom: 16,
			controls: false,
			scrollwheel: false,
			markers: [
				{ 'address' : 'Iamdesigning, 1/52,3/53, Lal Bahadhur Colony,Shringar Nagar Road, Near Gopal Naidu School, Peelamedu, Coimbatore, TN 641004',
				'html' :  'IamDesigning HeadOffice, Coimbatore.',
				'icon' : { 
							image: "js/images/mapicon.png",
							iconsize: [28, 32],
						}  
				}
				
			]
		});
	}
	
	//Contact Map2...
	var $map = $('#contact_map2');
	if( $map.length ) {
		$map.gMap({
			address: 'Iamdesigning, 1/52,3/53, Lal Bahadhur Colony,Shringar Nagar Road, Near Gopal Naidu School, Peelamedu, Coimbatore, TN 641004',
			zoom: 9,
			controls: false,
			scrollwheel: false,
			markers: [
				{ 'address' : 'Iamdesigning, 1/52,3/53, Lal Bahadhur Colony,Shringar Nagar Road, Near Gopal Naidu School, Peelamedu, Coimbatore, TN 641004',
				'html' :  'IamDesigning HeadOffice, Coimbatore.',
				'icon' : { 
							image: "js/images/mapicon.png",
							iconsize: [28, 32],
						}  
				}
				
			]
		});
	}
	if( $map.length ) {
		$map.gMap({
			address: '144, Lal Bahadhur Colony, Bharathi Colony, Peelamedu, Coimbatore, Tamil Nadu',
			zoom: 9,
			controls: false,
			scrollwheel: false,			
			markers: [
				{ 'address' : '144, Lal Bahadhur Colony, Bharathi Colony, Peelamedu, Coimbatore, Tamil Nadu',
				'html' :  'IamDesigning CBE Office, Coimbatore.',
				'icon' : { 
							image: "js/images/mapicon.png",
							iconsize: [28, 32],
						}  
				}
				
			]
		});
	}
	if( $map.length ) {
		$map.gMap({
			address: 'Teachers Colony, Gobichettipalayam, Tamil Nadu ',
			zoom: 9,
			controls: false,
			scrollwheel: false,			
			markers: [
				{ 'address' : 'Teachers Colony, Gobichettipalayam, Tamil Nadu ',
				'html' :  'IamDesigning Gobi Office, Coimbatore.',
				'icon' : { 
							image: "js/images/mapicon.png",
							iconsize: [28, 32],
						}  
				}
				
			]
		});
	}	
	
	// Goto Top
	$().UItoTop({ easingType: 'easeOutQuart' });

	//DONUT CHART...
	$('.dt-sc-donutchart').each(function(){
		$(this).one('inview', function (event, visible) {
			if(visible === true) {
				var bgcolor, fgcolor = "";

				if($(this).attr('data-bgcolor') !== "") bgcolor = $(this).attr('data-bgcolor'); else bgcolor = '#f5f5f5';
				if($(this).attr('data-fgcolor') !== "") fgcolor = $(this).attr('data-fgcolor'); else fgcolor = '#959595';
				
				$(this).donutchart({'size': 200, 'donutwidth': 6, 'fgColor': fgcolor, 'bgColor': bgcolor, 'textsize': 30 });
				$(this).donutchart('animate');
			}
		});
	});
	
	// Animate Skill Bars
    animateSkillBars();
	jQuery(window).scroll(function(){ 
		animateSkillBars();
	});
		
	// Portfolio Box Slider
	if(jQuery(".portfolio-slider").length) {
		jQuery('.portfolio-slider').bxSlider({
			auto: true,
			pager: ''
		});
	}
	
	// Tips Box Slider
	if(jQuery(".dt-sc-tips").length) {
		jQuery('.dt-sc-tips').bxSlider({
			auto: false,
			pager: ''
		});
	}
		
	// Testimonial Carousel
	if( jQuery('.dt-sc-testimonial-carousel-wrapper').length ) {
	  jQuery('.dt-sc-testimonial-carousel').each(function(){
		  var pagger = jQuery(this).parents(".dt-sc-testimonial-carousel-wrapper").find("div.carousel-arrows"),
			  next = pagger.find("a.testimonial-next"),
			  prev = pagger.find("a.testimonial-prev");
				
		  jQuery(this).carouFredSel({
			  responsive:true,
			  auto:true,
			  width:'100%',
			  height: 'variable',
			  pagination: "#pager",
			  scroll:1,
			  items:{ 
				width:510,
				height: 'variable',
				visible: {min: 1,max: 2} 
			  },
			  prev:prev,
			  next:next
		  });
	  });
	}
	
	//Tweets CarouFred...
	if($('.dt-sc-testimonial-carousel-wrapper').length > 0) {
		$('.customer-testimonial').carouFredSel({
			auto:true,
			width: 'auto',
			height: 'auto',
			scroll: 1,
			direction: 'up',
			items: {
				height: 'auto',
				visible: {
					min: 1,
					max: 1
				}
			}
		});
		$('#panel').hide();
	}
	
	//Tweets CarouFred...
	if($('.dt-sc-testimonial-carousel-wrapper').length > 0) {
		$('.customer-testimonial.type2').carouFredSel({
			auto:true,
			width: 'auto',
			height: 'auto',
			scroll: 1,
			direction: 'bottom',
			items: {
				height: 'auto',
				visible: {
					min: 1,
					max: 1
				}
			}
		});
		$('#panel').hide();
	}
	
	// For Parallax Section
	$('.parallax').each(function(){
		$(this).bind('inview', function (event, visible) {
			if(visible == true) {
				$(this).parallax("50%", 0.3);
			} else {
				$(this).css('background-position','');
			}
		});
	});
	
	// Accordion
	jQuery('.dt-sc-toggle').toggle(function(){ jQuery(this).addClass('active'); },function(){ jQuery(this).removeClass('active'); });
	jQuery('.dt-sc-toggle').on('click', function(){ jQuery(this).next('.dt-sc-toggle-content').slideToggle(); });
	jQuery('.dt-sc-toggle-frame-set').each(function(){
		var $this = jQuery(this),
		$toggle = $this.find('.dt-sc-toggle-accordion');
		
		$toggle.on('click', function(){
			if( jQuery(this).next().is(':hidden') ) {
				$this.find('.dt-sc-toggle-accordion').removeClass('active').next().slideUp();
				jQuery(this).toggleClass('active').next().slideDown();
			}
			return false;
		});
	
		// Activate First Item always
		$this.find('.dt-sc-toggle-accordion:first').addClass("active");
		$this.find('.dt-sc-toggle-accordion:first').next().slideDown();
	});
	
	// Tabs
	if(jQuery('ul.dt-sc-tabs-frame.float-right').length > 0) {
		jQuery('ul.dt-sc-tabs-frame').tabs('> .dt-sc-tabs-frame-content');
	}
	
	if(jQuery('ul.dt-sc-tabs-frame').length > 0) {
		jQuery('ul.dt-sc-tabs-frame').tabs('> .dt-sc-tabs-frame-content');
	}
	
	if(jQuery('.dt-sc-tabs-vertical-frame').length > 0){
		
		jQuery('.dt-sc-tabs-vertical-frame').tabs('> .dt-sc-tabs-frame-content');
		jQuery('.dt-sc-tabs-vertical-frame').each(function(){
			jQuery(this).find("li:first").addClass('first').addClass('current');
			jQuery(this).find("li:last").addClass('last');
		});
	
		jQuery('.dt-sc-tabs-vertical-frame li').on('click', function(){ 
			jQuery(this).parent().children().removeClass('current');
			jQuery(this).addClass('current');
		});
	
	}
		
	// Window Load Function	
	jQuery(window).load(function() {
		
		// Preloader
		$('#preloader').fadeOut('slow',function(){$(this).remove();});
		
		//Portfolio isotope
		if(!$('.dt-sc-portfolio-container').hasClass('portfolio-horizontal')) {
			
			var $container = $('.dt-sc-portfolio-container');
			if( $container.length) {
				
				var $width = $container.hasClass("no-space") ? 0 : 34;
				
				$(window).smartresize(function(){
					$container.css({overflow:'hidden'}).isotope({itemSelector : '.column',masonry: { gutterWidth: $width } });
				});
				
				$container.isotope({
				  filter: '*',
				  masonry: { gutterWidth: $width },
				  animationOptions: { duration: 750, easing: 'linear', queue: false  }
				});
				
			}
			
			if($container.parents('#primary').find("div.dt-sc-sorting-container").length){
				$container.parents('#primary').find("div.dt-sc-sorting-container a").on('click', function(){
					$width = $container.hasClass("no-space") ? 0 : 34;				
					$container.parents('#primary').find("div.dt-sc-sorting-container a").removeClass("active-sort");
					var selector = $(this).attr('data-filter');
					$(this).addClass("active-sort");
					$container.isotope({
						filter: selector,
						masonry: { gutterWidth: $width },
						animationOptions: { duration:750, easing: 'linear',  queue: false }
					});
				return false;	
				});
			}
		
		}
		//Portfolio isotope End			
		  		
	});

	function animateSkillBars(){
		 var applyViewPort = ( $("html").hasClass('csstransforms') ) ? ":in-viewport" : "";
		 
		 $('.dt-sc-progress'+applyViewPort).each(function(){
			 var progressBar = $(this),
				 progressValue = progressBar.find('.dt-sc-bar').attr('data-value');
				 
				 if (!progressBar.hasClass('animated')) {
					 progressBar.addClass('animated');
					 progressBar.find('.dt-sc-bar').animate({width: progressValue + "%"},600,function(){ progressBar.find('.dt-sc-bar-text').fadeIn(400); });
				 }
		 });
  	} 
	
	// ANIMATE CSS + JQUERY INVIEW CONFIGURATION
	(function ($) {
		"use strict";
		$(".animate").each(function () {
			$(this).one('inview', function (event, visible) {
				var $delay = "";
				var $this = $(this),
					$animation = ($this.data("animation") !== undefined) ? $this.data("animation") : "slideUp";
					$delay = ($this.data("delay") !== undefined) ? $this.data("delay") : 300;
	
				if (visible === true) {
					setTimeout(function () {
						$this.addClass($animation);
					}, $delay);
				} else {
					setTimeout(function () {
						$this.removeClass($animation);
					}, $delay);
				}
			});
		});
	})(jQuery);

});