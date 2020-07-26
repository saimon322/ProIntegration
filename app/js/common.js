var winWidth = $(window).width();
var winHeight = $(window).height();
var isDesktop = false;

$(document).ready(function () {
  if (winWidth >= 1200) {isDesktop = true;}
  else isDesktop = false;
  $(window).resize(function(){
      winWidth = $(window).width();
      winHeight = $(window).height();
      if (winWidth >= 1200) {
        isDesktop = true;
        // Close mobile menu on desktop
        if ($(".mobile-panel.active").length) {
          $(".hamburger, .mobile-panel, #overlay").removeClass("active");
          $("#overlay").fadeOut();
          $("body").removeClass("overflow");
          if ($(".main-page").length) {
            $.fn.fullpage.setAllowScrolling(true);
          }
        }
      }
      else isDesktop = false;
  });

  // Main page padding
  if ($(".main-page").length) {
    $("main").css({"padding": "0"});
  }

  // Fixed scroll header
  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 100) {
      $("header").addClass("is-fixed");
    } else {
      $("header").removeClass("is-fixed");
    }
  });

  // Header lang
  $(".header-lang__current").click(function(e){
    e.preventDefault();
    $(".header-lang").toggleClass("active");
  })
  $(document).mouseup(function(e) {
    if (!$(".header-lang").is(e.target) && 
        $(".header-lang").has(e.target).length === 0) {
      $(".header-lang").removeClass("active");
    }
  })

  // Header hover line
  var headerLine = $(".js-header-line");
  $(".js-header-target").hover(function(){
    let paddingLeft = parseInt($(this).css("padding-left"));
    let paddingRight = parseInt($(this).css("padding-right"));
    let width = $(this).width() + paddingLeft + paddingRight;
    let marginLeft = parseInt($(this).css("margin-left"));
    let left = $(this).position().left + marginLeft;
    headerLine.css({"width": width, "left": left, "opacity": 1})
  }, function(){
    headerLine.css({"opacity": 0})
  })

  // Hamburger
  $(".hamburger").click(function(e){
    $(".hamburger, .mobile-panel").toggleClass("active");
    $("#overlay").fadeToggle().toggleClass("active");
    $("body").toggleClass("overflow");
    if ($(".main-page").length) {
      let panelOpen = $(".mobile-panel.active").length;
      $.fn.fullpage.setAllowScrolling(panelOpen ? false : true);
    }
  });

  // Overlay
  $("#overlay").click(function(){
    $(".hamburger, .mobile-panel").removeClass("active");
    $(".modal, #overlay").removeClass("active").fadeOut();
    $("body").removeClass("overflow");
    if ($(".main-page").length) {
      $.fn.fullpage.setAllowScrolling(true);
    }
  })

  // Modal pop-up
  $(".modal-btn").click(function(e){
    e.preventDefault();
    let id = $(this).attr("href");
    $(id).addClass("active").fadeIn();
    $("#overlay").addClass("active").fadeIn();
    $("body").toggleClass("overflow");
    if ($(".main-page").length) {
      let modalOpen = $(".modal.active").length;
      $.fn.fullpage.setAllowScrolling(modalOpen ? false : true);
    }
  })
  $(".modal-close").click(function() {
    $(".modal, #overlay").removeClass("active").fadeOut();
    $("body").removeClass("overflow");
    if ($(".main-page").length) {
      $.fn.fullpage.setAllowScrolling(true);
    }
  })

  // My-slider carousel
  var my_slider = $(".my-slider");
  var sliderData = {
    items: 1,
    autoWidth: true,
    center: true,
    loop: true,
    smartSpeed: 700,
    dots: true,
    nav: true,
    autoplay: true,
    hoverOnPause: true,
  }
  my_slider.children().each( function( index ) {
    $(this).attr( 'data-position', index );
  });
  my_slider.owlCarousel(sliderData);
  $(document).on('click', '.my-slider__slide', function() {
    my_slider.trigger('to.owl.carousel', [$(this).data( 'position' ), 700] );
  });
  $(window).resize(function(){
    my_slider.trigger('destroy.owl.carousel');
    my_slider.owlCarousel(sliderData);
  });


  // Main page
  if ($(".main-page").length) {
    // Full page plugin
    $('.main-page').fullpage({
      responsive: true,
      resize: true,
      css3: true,
      scrollingSpeed: 800,
      autoScrolling: true,
      scrollBar: false,
      easing: 'easeInOutCubic',
      easingcss3: 'ease',
      setAllowScrolling: false,
      scrollOverflow: true,
      scrollOverflowEndPrevent: { 
        delay: 250, 
        reversal: false 
      },
      licenseKey: '28B27742-9C0644F4-853CD239-DCF3F188',
      afterRender: function(){
        $(".title-section").addClass("show");
      },
      onLeave: function(origin, destination, direction){
        if (destination > 1) {
          $("header").addClass("is-fixed");
        } else {
          $("header").removeClass("is-fixed");
        }
        $(".section").eq(destination - 1).addClass("show");
      }
    });

    // Scroll button
    $(".js-scroll-btn").click(function(){
      $.fn.fullpage.moveSectionDown();
    })

    // Main page footer
    $(".footer-section .fp-tableCell").append($(".footer"));
  }


  // Solutions page
  if ($(".solutions-page").length) {
    $(".solutions-nav__toggler").click(function(e){
      e.preventDefault();
      let toggler = $(this);
      let item = $(this).parent();
      let subList = $(this).siblings();
      $(".solutions-nav__sublist").not(subList).removeClass("active").stop().slideUp();
      subList.stop().slideDown();
      if (winWidth < 1200 && item.hasClass("active")) {
        $(".solutions-nav__item").toggleClass("show");
        if (!item.hasClass("show")) {
          subList.stop().slideUp();
        }
      }
    })

    $(".solutions-nav__link").click(function(e){
      e.preventDefault();
      if (!$(this).hasClass("active")) {
        $(".solutions-nav__link").removeClass("active");
        $(this).addClass("active");

        let navItem = $(this).parents(".solutions-nav__item");
        $(".solutions-nav__item").removeClass("active");
        navItem.addClass("active");
        
        let item = $(this).attr("href");
        $(".solutions__item").removeClass("active");
        $(item).addClass("active");

        if (winWidth < 1200) {
          let contentTop = $(".solutions__content").offset().top - 50;
          setTimeout(function(){
            $("html, body").animate({scrollTop: contentTop}, 700);
          }, 200)
        }
      }
    })


    if (winWidth >= 1200) {
      $(".solutions-nav__item.active .solutions-nav__sublist").show();
    }
    $(window).resize(function(){
      if (winWidth >= 1200) {
        $(".solutions-nav__item.active .solutions-nav__sublist").show();
      } else {
        $(".solutions-nav__item.active .solutions-nav__sublist").hide();
      }
    })
  }


  // About page
  if ($(".about-page").length) {
    let mission1 = ".mission__item:nth-child(1)";
    let mission2 = ".mission__item:nth-child(2)";

    $(window).scroll(function() {
      let winScroll = $(window).scrollTop();
      let mission1Top = $(mission1).offset().top;
      let mission2Top = $(mission2).offset().top;
      let value1 = Math.max(((mission1Top - winScroll)) / 500, 0);
      let value2 = Math.max(((mission2Top - winScroll)) / 500, 0);

      TweenLite.to(mission1 + " img", 0.25, { filter: 'grayscale(' + value1 + ')' });
      TweenLite.to(mission2 + " img", 0.25, { filter: 'grayscale(' + value2 + ')' });
    });
  }


  // Products page
  if ($(".products-page").length) {
    let gallery = $(".product-gallery");
    let galleryItem1 = ".product-gallery__item:nth-child(1)";
    let galleryItem2 = ".product-gallery__item:nth-child(2)";
    let galleryItem3 = ".product-gallery__item:nth-child(3)";
    let galleryItem4 = ".product-gallery__item:nth-child(4)";

    $(window).scroll(function() {
      let galleryTop = gallery.offset().top;
      let winScroll = $(window).scrollTop();
      let value = Math.max(((galleryTop - winScroll - 200)) / 20, 0);

      TweenLite.to(galleryItem1, 0.25, { transform: 'translateX(' + (-value) + '%)' });
      TweenLite.to(galleryItem2, 0.25, { transform: 'translateX(' + value + '%)' });
      TweenLite.to(galleryItem3, 0.25, { transform: 'translateY(' + value * 3 + '%)' });
      TweenLite.to(galleryItem4, 0.25, { transform: 'translate(' + value + '%,' + value + '%)' });
    });
  }


  // wow-js
  new WOW().init();

  // Fancybox
  $("[data-fancybox]").fancybox({
    'loop': true,
  });
  $('.video').fancybox({
    openEffect  : 'none',
    closeEffect : 'none',
    helpers : {
        media : {}
    },   
  });

  // IE fixes
  objectFitImages();

  // 100 vh fix
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

  /**
   * Replace all SVG images with inline SVG
   */
  $('img.svg').each(function(){
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');
    jQuery.get(imgURL, function(data) {
      // Get the SVG tag, ignore the rest
      var $svg = jQuery(data).find('svg');
      // Add replaced image ID to the new SVG
      if(typeof imgID !== 'undefined') {
        $svg = $svg.attr('id', imgID);
      }
      // Add replaced image classes to the new SVG
      if(typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass+' replaced-svg');
      }
      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr('xmlns:a');
      // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
      if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
        $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
      }
      // Replace image with new SVG
      $img.replaceWith($svg);
    }, 'xml');
  });

  // ----------------------------------------------- END OF $(document).ready ----------------------------------------------------
});