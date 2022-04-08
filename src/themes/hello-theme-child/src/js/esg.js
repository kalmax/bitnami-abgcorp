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

