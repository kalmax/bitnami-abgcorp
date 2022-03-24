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
