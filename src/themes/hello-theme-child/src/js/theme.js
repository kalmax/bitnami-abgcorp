jQuery(function ($) {

  $(document).ready(function () {

    let windowWidth = $(window).height();

    /* #### Scroll maging indicator params #### */
    var indicatorParams = {
      colorTrigger: "white",
      colorStart: "red",
      colorEnd: "blue",
      indent: 5
    };

    if (window.matchMedia("(min-width: 1025px)").matches) {

      /* ############### ANIMATION - Button Links ############# */
      $(".btn-from-link").mouseenter(function () {
        var btnLinkLine = $(this).find(".line");
        var tl = new TimelineMax();
        //tl.fromTo(btnLinkLine, 0.1, { width: "100%" }, { width: "0px" })
        tl.fromTo(btnLinkLine, 0.5, { delay: 0.3, width: "0" }, { delay: 0.3, width: "100%" });
      });

      /* ############### HOME PAGE ############### */
      var controller = new ScrollMagic.Controller();

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

    }

    function animateHomeHeroCarouselByWidth() {

      if (window.matchMedia("(min-width: 1024px)").matches) {
        animateEaseRightToLeft($(".home #hero-carousel-brands .from-carousel .slick-active:lt(4)"));
      }

    }
    
    /*
      Animates an image  - Fades image up with opacity reveal
      @param el - the element
      @param triggerElement - element to trigger when scrolling before the animation
      @@param offset - scroll offset on scroll trigger
    */
    function animateEaseImageUp(params) {

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

    /*
      Animates an image  - Draws a line with a node
      @param el - the element
      @param triggerElement - element to trigger when scrolling before the animation
      @@param offset - scroll offset on scroll trigger
    */
    function animateLineNodeDown(params) {

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

    animateHomeHeroCarouselByWidth();

    /* ############# END OF HOME PAGE ############# */

    /* ################ ANIMATION FUNCTIONS ######################## */
    /* carousel items animation */
    function animateEaseRightToLeft(element) {
      var tl = new TimelineMax();
      tl.staggerFrom(element, 0.3, { x: "+=30", opacity: 0, autoAlpha: 0 }, 0.5);
    }

    /* ############# ABOUT PAGE ############# */

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
    // indicatorInitialPosition = $('#tab-indicator').position().left;

    // $('.btnTab').hover(function () {
    //   // Tab indicator behaviour

    //   // calculating and applying indicator temporary new position
    //   var item = $(this).attr('item')
    //   var indicatorWidth = $('#tab-indicator').width()
    //   var left = item * indicatorWidth
    //   $('#tab-indicator').css({ 'left': left + 'px' })

    //   indicatorTemporaryPosition = left
    // }, () => {

    //   if (!indicatorNewPosition) {
    //     // returning indicator to its initial position
    //     $('#tab-indicator').css({ 'left': indicatorInitialPosition + 'px' })
    //   }
    //   else {
    //     // reseting indicator new and temporary position
    //     indicatorNewPosition = 0
    //     indicatorTemporaryPosition = 0
    //   }

    // })


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



    /* ############# END OF ABOUT PAGE ############# */

    /* ############# ESG PAGE ############# */

    // section - environmental - cover image slide up
    animateEaseImageUp({
      el: "#esg-section-environmental #cover-image .elementor-widget-container",
      triggerElement: "#esg-section-environmental",
      offset: 0,
    });

    // section - social - cover image slide up
    animateEaseImageUp({
      el: "#esg-section-social #cover-image .elementor-widget-container",
      triggerElement: "#esg-section-social",
      offset: -100,
    });
    
    // section - governance - cover image slide up
    animateEaseImageUp({
      el: "#esg-section-governance #cover-image .elementor-widget-container",
      triggerElement: "#esg-section-governance",
      offset: -100,
    });
    
    // section - diversity - cover image slide up
    animateEaseImageUp({
      el: "#esg-section-diversity #cover-image .elementor-widget-container",
      triggerElement: "#esg-section-diversity",
      offset: -100,
    });

    // section - cta download
    animateLineNodeDown({
      el: "#esg-section-cta-download-line-node",
      triggerElement: "#esg-section-cta-download-top-border",
      offset: -100,
    });

    /* ############# END OF ESG PAGE ############# */


  });


});

