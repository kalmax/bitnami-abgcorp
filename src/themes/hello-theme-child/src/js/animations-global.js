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

  });

});
