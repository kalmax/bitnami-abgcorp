 jQuery(function ($) {

  let controller = new ScrollMagic.Controller();

  $(document).ready(function () {
    
    /* ########## ANIMATIONS ###########*/

    /* FROM Tabs - Widget */
    $('.from-tabs .tab-link').click(function(e){
      
      e.preventDefault();
      
      let tl = new TimelineMax();
      tl
      .fromTo(
        $(".from-tabs .col-image .thumbnail"),
        0.5,
        { y: 50, autoAlpha: 0, ease: Power1.easeOut },
        { y: 0, autoAlpha: 1 }
      );

    });

    /* Button Links*/
    $(".btn-from-link").mouseenter(function () {
      var btnLinkLine = $(this).find(".line");
      var tl = new TimelineMax();
      //tl.fromTo(btnLinkLine, 0.1, { width: "100%" }, { width: "0px" })
      tl.fromTo(btnLinkLine, 0.5, { delay: 0.3, width: "0" }, { delay: 0.3, width: "100%" });
    });

    /* ########## ANIMATIONS ###########*/

    /* ########## GLOBAL SLIDERS ###########*/

    // Peakaboo Slider
    $('.peakaboo-slider > div > div').slick({
      infinite: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: false,
      arrows: true,
      draggable: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            arrows: false,
            draggable: true,
            centerMode: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true
          }
        }
      ]
    });

    /* ########## GLOBAL SLIDERS ###########*/

  });

});

jQuery(function ($) {
  
  $(document).ready(function () {
    
    var header = $('.elementor-location-header');
    var mobileMenu = $('.elementor-widget-mobile-menu');
    var jumpToMenu = $(".elementor-widget-jump-to-menu");

   
    if (window.matchMedia("(max-width: 1024px)").matches) {
      
       var lastScrollTop = 0;

      $(window).scroll(function(){
        
        if($(this).scrollTop() > header.outerHeight()) {
          header.addClass("fixed");
        } else {
          header.removeClass("fixed");
        }

        var st = $(this).scrollTop();
        
        if (st > lastScrollTop){
          mobileMenu.hide();
        } else {
          mobileMenu.show();
        }
        lastScrollTop = st;

      });

    }

  });

});
 jQuery(function ($) {

  $(document).ready(function () {
    
    let controller = new ScrollMagic.Controller();
    
    function homeAnimateEaseRightToLeft(element) {
      var tl = new TimelineMax();
      tl.staggerFrom(element, 0.3, { x: "+=30", opacity: 0, autoAlpha: 0 }, 0.5);
    }


    function homeAnimateHeroCarouselByWidth() {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        homeAnimateEaseRightToLeft($(".home #hero-carousel-brands .from-carousel .slick-active:lt(4)"));
      }
    }

    if (window.matchMedia("(min-width: 1025px)").matches) {

      /* Who we are section */
      var tl1 = new TimelineMax();
      tl1.fromTo(
        '.home #section-who-we-are .node-line .elementor-widget-container img',
        0.5,
        { scaleX: 0 },
        { scaleX: 1, transformOrigin: '0% 100%' }
      )
      .staggerFrom(
        '.home #section-who-we-are .node .elementor-widget-container img',
        0.5,
        {
          opacity: 0,
          scale: 0.5,
          transformOrigin: "center center",
          ease: Elastic.easeOut.config(1, 0.5)
        }
      );

      var scene1 = new ScrollMagic.Scene({
        triggerElement: ".home #section-who-we-are",
        reverse: false
      })
      .setTween(tl1)
      .addTo(controller);

      var tl1_2 = new TimelineMax();
      tl1_2
      .fromTo(
        '.home #section-who-we-are #cover-image .elementor-widget-container',
        0.5,
        { y: 30, autoAlpha: 0, ease: Power1.easeOut },
        { y: 0, autoAlpha: 1 }
      );

      var scene1_2 = new ScrollMagic.Scene({
        triggerElement: ".home #section-who-we-are",
        reverse: false
      })
      .setTween(tl1_2)
      .addTo(controller);

      /* Join our team bottom section */
      var tl2 = new TimelineMax();
      tl2
      .set(".home #section-join-team-bottom .node-line .elementor-widget-container img", { height: '0' }, 'start')
      .fromTo(
        '.home #section-join-team-bottom .node-line .elementor-widget-container img',
        0.5,
        { height: 0 },
        { height: '67px' }
      )
      .staggerFrom(
        '.home #section-join-team-bottom .node .elementor-widget-container img',
        0.5,
        {
          opacity: 0,
          scale: 0.5,
          transformOrigin: "center center",
          ease: Elastic.easeOut.config(1, 0.5)
        }
      );

      var scene2 = new ScrollMagic.Scene({
        triggerElement: ".home #section-join-team-bottom",
        reverse: false
      })
      .setTween(tl2)
      .addTo(controller);

      // cover image
      var tl2_2 = new TimelineMax();
      tl2_2
      .fromTo(
        '.home #section-join-team #cover-image .elementor-widget-container',
        0.5,
        { y: 30, autoAlpha: 0, ease: Power1.easeOut },
        { y: 0, autoAlpha: 1 }
      );

      var scene2_2 = new ScrollMagic.Scene({
        triggerElement: ".home #section-join-team",
        offset: -100,
        reverse: false
      })
      .setTween(tl2_2)
      .addTo(controller);

      /* Vision Goals Section */
      var tl3 = new TimelineMax();
      tl3
      .fromTo(
        '.home #section-vision-goals #node-line-1 .elementor-widget-container img',
        0.3,
        { scaleX: 0 },
        { scaleX: 1, transformOrigin: '0% 100%' }
      )
      .staggerFrom(
        '.home #section-vision-goals #icon-1 .elementor-icon',
        0.3,
        {
          scale: 0.8,
          transformOrigin: "center center",
          ease: Elastic.easeOut.config(1, 0.5)
        }
      )
      .fromTo(
        '.home #section-vision-goals #node-line-2 .elementor-widget-container img',
        0.3,
        { scaleX: 0 },
        { scaleX: 1, transformOrigin: '0% 100%' }
      )
      .staggerFrom(
        '.home #section-vision-goals #icon-2 .elementor-icon',
        0.3,
        {
          scale: 0.8,
          transformOrigin: "center center",
          ease: Elastic.easeOut.config(1, 0.5)
        }
      )
      .fromTo(
        '.home #section-vision-goals #node-line-3 .elementor-widget-container img',
        0.3,
        { scaleX: 0 },
        { scaleX: 1, transformOrigin: '0% 100%' }
      )
      .staggerFrom(
        '.home #section-vision-goals #icon-3 .elementor-icon',
        0.3,
        {
          scale: 0.8,
          transformOrigin: "center center",
          ease: Elastic.easeOut.config(1, 0.5)
        }
      )
      .fromTo(
        '.home #section-vision-goals #node-line-4 .elementor-widget-container img',
        0.3,
        { scaleX: 0 },
        { scaleX: 1, transformOrigin: '0% 100%' }
      )
      .staggerFrom(
        '.home #section-vision-goals .node .elementor-widget-container img',
        0.3,
        {
          opacity: 0,
          scale: 0.8,
          transformOrigin: "center center",
          ease: Elastic.easeOut.config(1, 0.5)
        }
      );

      var scene4 = new ScrollMagic.Scene({
        triggerElement: ".home #section-vision-goals",
        offset: 40,
        reverse: false
      })
      // .addIndicators()
      .setTween(tl3)
      .addTo(controller);


      homeAnimateHeroCarouselByWidth();

    }

  });

});

jQuery(function ($) {
 
  $(document).ready(function () {
    
    let controller = new ScrollMagic.Controller();
    function esgAnimateEaseImageUp(params) {

      let tl = new TimelineMax();
      tl
      .fromTo(
        params.el,
        0.5,
        { y: 30, autoAlpha: 0, ease: Power1.easeOut },
        { y: 0, autoAlpha: 1 }
      );

      var scene = new ScrollMagic.Scene({
        triggerElement: params.triggerElement,
        offset: params.offset ? params.offset : 0,
        reverse: false
      })
      .setTween(tl)
      .addTo(controller);

    }

    if (window.matchMedia("(min-width: 1366px)").matches) {
      
      function esgAnimateLineNodeDown(params) {

        let tl = new TimelineMax();
        tl
        .set(`${params.el} .node-line .elementor-widget-container img`, { height: '0' }, 'start')
        .fromTo(
          `${params.el} .node-line .elementor-widget-container img`,
          0.5,
          { height: 0 },
          { height: '67px' }
        )
        .staggerFrom(
          `${params.el} .node .elementor-widget-container img`,
          0.5,
          {
            opacity: 0,
            scale: 0.5,
            transformOrigin: "center center",
            ease: Elastic.easeOut.config(1, 0.5)
          }
        );

        var scene = new ScrollMagic.Scene({
          triggerElement: params.triggerElement,
          reverse: false
        })
        .setTween(tl)
        .addTo(controller);
        
      }

      // section - environmental - cover image slide up
      esgAnimateEaseImageUp({
        controller: controller,
        el: "#esg-section-environmental #cover-image .elementor-widget-container",
        triggerElement: "#esg-section-environmental",
        offset: 0,
      });

      // section - social - cover image slide up
      esgAnimateEaseImageUp({
        controller: controller,
        el: "#esg-section-social #cover-image .elementor-widget-container",
        triggerElement: "#esg-section-social",
        offset: -100,
      });

      // section - governance - cover image slide up
      esgAnimateEaseImageUp({
        controller: controller,
        el: "#esg-section-governance #cover-image .elementor-widget-container",
        triggerElement: "#esg-section-governance",
        offset: -100,
      });

      // section - diversity - cover image slide up
      esgAnimateEaseImageUp({
        controller: controller,
        el: "#esg-section-diversity #cover-image .elementor-widget-container",
        triggerElement: "#esg-section-diversity",
        offset: -100,
      });

      // section - cta download
      esgAnimateLineNodeDown({
        controller: controller,
        el: "#esg-section-cta-download-line-node",
        triggerElement: "#esg-section-cta-download-top-border",
        offset: -100,
      });

    }
    
    // section - governance - cover image slide up
    esgAnimateEaseImageUp({
      controller: controller,
      el: ".tab-contents-item.active .thumbnail",
      triggerElement: ".tab-contents",
      offset: -100,
    });
    
  });

});


jQuery(function ($) {

  $(document).ready(function () {
    
    let controller = new ScrollMagic.Controller();

    function esgDiversityAnimateLineNodeRight(params) {
      let tl = new TimelineMax();
      tl
        .fromTo(
          `${params.el} .node-line .elementor-widget-container img`,
          0.5,
          { scaleX: 0 },
          { scaleX: 1, transformOrigin: '0% 100%' }
        )
        .staggerFrom(
          `${params.el} .node .elementor-widget-container img`,
          0.5,
          {
            opacity: 0,
            scale: 0.5,
            transformOrigin: "center center",
            ease: Elastic.easeOut.config(1, 0.5)
          }
        );

      var scene = new ScrollMagic.Scene({
        triggerElement: params.triggerElement,
        reverse: false,
        offset: params.offset ? params.offset : 0
      })
        .setTween(tl)
        .addTo(controller);
    }

    if (window.matchMedia("(min-width: 1366px)").matches) {
    
      // section - diversity - cover image slide up
      esgDiversityAnimateLineNodeRight({
        el: "#esg-sub-diversity-section-gender #cover-image .elementor-widget-container",
        triggerElement: "#esg-sub-diversity-section-gender",
        offset: -100,
      });

      esgDiversityAnimateLineNodeRight({
        el: "#esg-sub-diversity-section-ceo-message-line-node",
        triggerElement: "#esg-sub-diversity-section-ceo-message",
        offset: -100
      });

    }

  });

});




jQuery(function ($) {
    // about page tab
    var indicatorInitialPosition, indicatorNewPosition, indicatorTemporaryPosition = 0;

    $('.btnTab').on('click', function () {

      // setting new indicator position if tab is clicked
      indicatorNewPosition = indicatorTemporaryPosition

      // Hide and Show of tab contents
      var content = $(this).attr('target')
      $('.tabContent').css({ 'display': 'none' })
      $('#' + content).css({ 'display': 'block' })
      $('#tab-indicator').css({ 'left': indicatorNewPosition + 'px' })

      // setting new initial indicator position
      indicatorInitialPosition = indicatorNewPosition


    });

    // getting inital indicator position
    if ($('#tab-indicator').length > 0) {
      indicatorInitialPosition = $('#tab-indicator').position().left;
    }

    $('.btnTab').hover(function () {
      // Tab indicator behaviour

      // calculating and applying indicator temporary new position
      var item = $(this).attr('item')
      var indicatorWidth = $('#tab-indicator').width()
      var left = item * indicatorWidth
      $('#tab-indicator').css({ 'left': left + 'px' })

      indicatorTemporaryPosition = left
    }, () => {

      if (!indicatorNewPosition) {
        // returning indicator to its initial position
        $('#tab-indicator').css({ 'left': indicatorInitialPosition + 'px' })
      }
      else {
        // reseting indicator new and temporary position
        indicatorNewPosition = 0
        indicatorTemporaryPosition = 0
      }

    })


    // Timeline Slider
    var sliderContent = $('.timeline-content-slider > div > div');
    var sliderImage = $('.timeline-image-slider > div > div');
    var sliderYear = $('.timeline-year-slider > div > div');

    sliderContent.slick({
      accessibility: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: false,
      arrows: false,
      draggable: false,
      vertical: true,
      asNavFor: '.timeline-image-slider > div > div,.timeline-year-slider > div > div',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            vertical: false
          }
        },
      ]
    });

    sliderImage.slick({
      accessibility: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: false,
      arrows: false,
      draggable: false,
      vertical: true,
      asNavFor: '.timeline-content-slider > div > div,.timeline-year-slider > div > div',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            vertical: false
          }
        },
      ]
    });

    sliderYear.slick({
      accessibility: false,
      infinite: true,
      centerMode: false,
      focusOnSelect: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      draggable: false,
      vertical: true,
      asNavFor: '.timeline-content-slider > div > div,.timeline-image-slider > div > div',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            vertical: false,
            arrows: true,
            centerMode: true,
            centerPadding: '10px',
          }
        },
      ]
    });

    $('#timeline-up img').on('click', () => {
      sliderContent.slick('slickPrev')
    });

    $('#timeline-down img').on('click', () => {
      sliderContent.slick('slickNext')
    });


    $('.swiper-slide-active').addClass('activeBrand')

    $('.swiper-slide').click(function() {
    $('.swiper-slide').removeClass('activeBrand');
    $(this).addClass('activeBrand');

    // Hide and Show of tab contents
    var content = $(this).attr('data-swiper-slide-index')
    $('.brandContent').css({ 'display': 'none' })
    $('.brandContent[data-index="'+ content +'"]').css({ 'display': 'block' })
    })

});
jQuery(function ($) {
    // Get the menu instance
   // Ultimately smartmenus is expecting a <ul> input, so you need to target the <ul> of the drop-down you're trying to affect. Below is how it best work for my menu. #desktopMenu is the unique name I gave the menu in the Elementor widget options.
   var $menu = $('#headerSection .elementor-nav-menu:first');

   // Get rid of the existing menu
   $menu.smartmenus('destroy');
 
   // Re-instantiate the new menu, with no delay settings
   $menu.smartmenus( {
       subIndicatorsText: '',
       subIndicatorsPos: 'append',
       subMenusMaxWidth: '1000px',
       hideFunction: null,
       hideDuration: 0,
       hideTimeout: 0,
   });

    $(document).ready(function () {
        $('.home .elementor-widget-mobile-menu .header .logo a img').attr('src', "/wp-content/uploads/2022/01/Assets-Logo.png");
        $('body:not(.elementor-editor-active) .elementor-widget-menu-anchor').addClass('fromTop')
        $('#headerSection .elementor-item,#headerSection .elementor-sub-item').on('click', () => {
            var offset = $('#headerSection').data('scroll') ? $('#headerSection').data('scroll') : 0
            if (offset < -60) {

                // alert('from scrolled')

                $('body:not(.elementor-editor-active) .elementor-widget-menu-anchor').removeClass('fromTop')
                $('body:not(.elementor-editor-active) .elementor-widget-menu-anchor').addClass('fromScrolled')

            } else {
                // alert('from top')

                $('body:not(.elementor-editor-active) .elementor-widget-menu-anchor').addClass('fromTop')
                $('body:not(.elementor-editor-active) .elementor-widget-menu-anchor').removeClass('fromScrolled')

            }
        })

        $('#headerSection').mouseover(function () {
            headHoverOn()
            // $('.searchBox').css({"display": "block"})
        })
        .mouseout(function () {
            var offset = $('#headerSection').data('scroll') ? $('#headerSection').data('scroll') : 0
            if (offset > -60 && offset <= 0) {
                // closeSearch()
                headHoverOff()
            }

        })

        function headHoverOn(){
            $('#headerSection').removeClass('headerShadowed')
           
            $('#headerSection .elementor-item').addClass('hovered')

            $('#headerSection').addClass('headerHover')
            $('#contactUs').addClass('contactUs')
            $('#rentCar').addClass('rentCar')
            $('#headerSection .elementor-widget-theme-site-logo img').addClass('coloredLogo')
            $('.openSearch').css({ 'color': '#20438C' })
            $('.openSearch').addClass('searchColored')
        }

        function headHoverOff(){
            $('#headerSection').addClass('headerShadowed')
            $('#headerSection').removeClass('headerHover')
            $('#headerSection .elementor-item').removeClass('hovered')
            $('#contactUs').removeClass('contactUs')
            $('#rentCar').removeClass('rentCar')
            $('#headerSection .elementor-widget-theme-site-logo img').removeClass('coloredLogo')
            $('.openSearch').removeClass('searchColored')
        }

        $('#headerSection .elementor-item,#headerSection .elementor-sub-item').mouseover(function () {
            var offset = $('#headerSection').data('scroll') ? $('#headerSection').data('scroll') : 0

            // if offet is top 0
            if (offset > -60 && offset <= 0) {
                $('div.page-content').addClass('offsetTop')

            } else {
                $('#headerSection').addClass('headerOpen')

            }
        })
        .mouseout(function () {
            var offset = $('#headerSection').data('scroll') ? $('#headerSection').data('scroll') : 0
            if (offset > -60 && offset <= 0) {
                $('div.page-content').removeClass('offsetTop')
            }

            $('#headerSection').removeClass('headerOpen')

        });


        $('.menu-item > a').mouseover(function () {
            var path = $(this).attr('href')
            if (path.indexOf("external") >= 0) {
                $(this).parent().addClass('external')
                if ($(this).children().length > 0) {
                    $(this).children('.sub-arrow:first').append("<i class='fa fa-external-link'></i>")
                } else {
                    $(this).append("<span class='sub-arrow'><i class='fa fa-external-link'></i>")
                }
            }
        }).mouseout(function () {
            $(this).children().children().removeClass('fa fa-external-link')
        })

        $('.openSearch').on('click', () => {
            $('.searchBox').removeClass('hideSearch')
            $('.searchBox').addClass('showSearch')
        })

        $('.closeSearch').on('click', () => {
            closeSearch()
        })

        function closeSearch(){
            $('.searchBox').removeClass('showSearch')
            $('.searchBox').addClass('hideSearch')
        }

        $('#headerSection').addClass('headerShadowed')


    });

    $(document).on('scroll', function () {
        var scrollTop = $(window).scrollTop(),
            elementOffset = $('div.page-content').offset().top,
            distance = (elementOffset - scrollTop);

        $('#headerSection').data('scroll', distance)

        if (distance < -60) {
            $('#headerSection .elementor-item').addClass('hovered')
            $('#contactUs').addClass('contactUs')
            $('#rentCar').addClass('rentCar')
            $('#headerSection .elementor-icon svg').addClass('scrolledMobileNav')
            $('.openSearch').css({ 'color': '#20438C' })
            $('.openSearch').addClass('searchColored')

            $('#headerSection').removeClass('headerShadowed')
            
        } else {
            $('#headerSection .elementor-item').removeClass('hovered')
            $('#contactUs').removeClass('contactUs')
            $('#rentCar').removeClass('rentCar')
            $('.openSearch').removeClass('searchColored')

            $('#headerSection').addClass('headerShadowed')
            $('#headerSection').removeClass('headerHover')
            $('#headerSection .elementor-widget-theme-site-logo img').removeClass('coloredLogo')
        }


        $('div.page-content').removeClass('offsetTop')
    });
});
jQuery(function ($) {
  $(document).ready(function () {

    // Client Dropdown populate options
    var targetElement = $('#mediaLogo  a.elementor-gallery-title');
    var optionCount = targetElement.length;

    for (var i = 0; i < optionCount; i++) {
      var value = $('#mediaLogo a.elementor-gallery-title[data-gallery-index="' + i + '"]').html();
      $('#clientFilter').append('<option data-gallery-index="' + i + '">' + value + '</option>');
    };


    $('#clientFilter').change( () => {

      // get selected data tag
      var id = $('#clientFilter').find(":selected").data('gallery-index');

      // replicate the action of existing filter of gallery widget for logo
      $('#mediaLogo a.elementor-gallery-title[data-gallery-index="' + id + '"]').trigger("click");

      var haveImages = $('#mediaImage a.elementor-gallery-title[data-gallery-index="' + id + '"]').length;

      if (!haveImages) {
          $('#mediaImageSectionHeader').css({ 'display': 'none' })
          $('#mediaImageSectionContent').css({ 'display': 'none' })
      } else {
          $('#mediaImageSectionHeader').css({ 'display': 'block' })
          $('#mediaImageSectionContent').css({ 'display': 'block' })

          // replicate the action of existing filter of gallery widget for image
          $('#mediaImage a.elementor-gallery-title[data-gallery-index="' + id + '"]').trigger("click");
      }

    });

    function download(source) {
      const fileName = source.split('/').pop();
      var el = document.createElement("a");
      el.setAttribute("href", source);
      el.setAttribute("download", fileName);
      document.body.appendChild(el);
      el.click();
      el.remove();
    }

    $('body').on('click','.e-gallery-item',() => {
      var url = $(this).find('.elementor-gallery-item__image').data('thumbnail');
      alert(url)
      // download(url)
    });

    if ($('.jet-select').length) {
      $('.jet-select').addClass('selectdiv');
    }
  });
})
jQuery(function ($) {
  $(document).ready(function () {

    /* ############# CONTACT US PAGE ############# */

    $('#btn-moreBrands').on('click', (e) => {
      e.preventDefault();
      console.log('Trigger Load more brands section load');
    });

    var filteredImages = $('#brands-gallery .gallery-item');

    //Edit the links HERE
    var links = [
      'https://www.avis.com/en/customer-service',
      'https://www.budget.com/en/customer-care',
      'https://www.budgettruck.com/contact-us',
      'https://www.paylesscar.com/en/customer-service/contact-us',
      'https://support.zipcar.com/hc/en-us',
      'https://www.maggiore.it/en/if-you-need-help/online-assistance/',
      'https://www.francecars.fr/contact-s220.html',
      'https://www.apexrentals.co.nz/customer-support',
      'https://www.amicoblu.it/en/if-you-need-help/online-assistance/',
      'https://support.flexcar.com/hc/en-us',
      'https://www.morinirent.com/en/booking-customer/'
    ];

    var _loope = function _loope(i) {
      filteredImages[i].addEventListener('click', function () {
        // location = links[i];
        window.open(links[i]);
      });
    }

    for (var i = 0; i < filteredImages.length; i++) {
      console.log('IMAGES TO LINK');
      _loope(i);
    }

    /* ############# END CONTACT US PAGE ############# */
  });
});
jQuery(function ($) {
  $(document).ready(function () {

    /** SET Footer container background color */
    /** ESG pages (with subpages) must have green footer */
    $('.elementor-location-footer').removeClass('grey');
    $('.elementor-location-footer').removeClass('green');
    $('.elementor-location-footer').removeClass('blue');

    if ($('body.page.page-id-5730, body.page.page-child.parent-pageid-5730').length) {
      $('.elementor-location-footer').addClass('green');
    }
    /** Contact US pages must have blue footer */
    if ($('body.page.page-id-7377').length) {
      $('.elementor-location-footer').addClass('blue');
    }
    /** News Article pages must have grey footer */
    if ($('body.single.single-post div.post.category-news-article').length) {
      $('.elementor-location-footer').addClass('grey');
    }
    addLogoContainer();
    /** END SET Footer container background color*/
  });

  function addLogoContainer() {
    if ($('body.single.single-post div.post.category-news-article').length) {
      /** Add Logos */
      if ($('body[data-elementor-device-mode="desktop"]').length) {
        if ($('section[data-id="a844566"] div.elementor-logo-desktop-container').length == 0) {
          $html = `
            <div class="elementor-logo-container elementor-logo-desktop-container elementor-column-gap-default">
              <ul style="display: flex;flex-flow: row;list-style-type: none;">
                <li><a href="https://www.avis.com/en/customer-service" target="_blank"><img src="http://abgcsi-lb-1321724458.us-west-1.elb.amazonaws.com/wp-content/uploads/2022/03/Avis_Logo.png" /></a></li>
                <li><a href="https://www.budget.com/en/customer-care" target="_blank"><img src="http://abgcsi-lb-1321724458.us-west-1.elb.amazonaws.com/wp-content/uploads/2022/03/Budget_Logo.png" /></a></li>
                <li><a href="https://support.zipcar.com/hc/en-us" target="_blank"><img src="/wp-content/uploads/2022/01/Zipcar_Logo.png" /></a></li>
                <li><a href="https://www.paylesscar.com/en/customer-service/contact-us" target="_blank"><img src="http://abgcsi-lb-1321724458.us-west-1.elb.amazonaws.com/wp-content/uploads/2022/03/Payless_Logo.png" /></a></li>
              </ul>
            </div>
          `;
  
          $('section[data-id="a844566"]').append($html);
        }
      }
      if ($('body[data-elementor-device-mode="mobile"]').length || $('body[data-elementor-device-mode="tablet"]').length) {
        if ($('div.elementor-logo-mobile-container').length == 0) {
          $html = `
            <div class="elementor-logo-container elementor-logo-mobile-container elementor-column-gap-default">
              <ul style="display: flex;flex-flow: row;list-style-type: none;">
                <li><a href="https://www.avis.com/en/customer-service" target="_blank"><img src="http://abgcsi-lb-1321724458.us-west-1.elb.amazonaws.com/wp-content/uploads/2022/03/Avis_Logo.png" /></a></li>
                <li><a href="https://www.budget.com/en/customer-care" target="_blank"><img src="http://abgcsi-lb-1321724458.us-west-1.elb.amazonaws.com/wp-content/uploads/2022/03/Budget_Logo.png" /></a></li>
                <li><a href="https://support.zipcar.com/hc/en-us" target="_blank"><img src="/wp-content/uploads/2022/01/Zipcar_Logo.png" /></a></li>
                <li><a href="https://www.paylesscar.com/en/customer-service/contact-us" target="_blank"><img src="http://abgcsi-lb-1321724458.us-west-1.elb.amazonaws.com/wp-content/uploads/2022/03/Payless_Logo.png" /></a></li>
              </ul>
            </div>
          `;
          $($html).insertAfter('section[data-id="a844566"]');
        }
      }
    }
  }

  $( window ).resize(function() {
    addLogoContainer();
  })
});