jQuery(function ($) {
  console.log("esg-diversity.js");
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



