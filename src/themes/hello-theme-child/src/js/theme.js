jQuery(function ($) {

  $(document).ready(function () {


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


    /* ############# NEWS PAGE ############# */
    // Media Section

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
    })


    /* ############# END OF NEWS PAGE ############# */
    $('body:not(.elementor-editor-active) .elementor-widget-menu-anchor').addClass('fromTop')
    $('#headerSection .elementor-item,#headerSection .elementor-sub-item').on('click', ()=>{
      var  offset = $('#headerSection').data('scroll') ? $('#headerSection').data('scroll') : 0
      if(offset < -60){

        // alert('from scrolled')

        $('body:not(.elementor-editor-active) .elementor-widget-menu-anchor').removeClass('fromTop')
        $('body:not(.elementor-editor-active) .elementor-widget-menu-anchor').addClass('fromScrolled')
        
      }else{
        // alert('from top')

        $('body:not(.elementor-editor-active) .elementor-widget-menu-anchor').addClass('fromTop')
        $('body:not(.elementor-editor-active) .elementor-widget-menu-anchor').removeClass('fromScrolled')

      }
    })

    $('#headerSection .elementor-item,#headerSection .elementor-sub-item').mouseover(function() {
      var  offset = $('#headerSection').data('scroll') ? $('#headerSection').data('scroll') : 0
      if(offset > -60 && offset <= 0){
        $('div.page-content').addClass('offsetTop')

      }else{
        $('#headerSection').addClass('headerOpen')

      }

      $('#contactUs').addClass('contactUs')
      $('#rentCar').addClass('rentCar')
      $('#headerSection .elementor-item').addClass('hovered')
      $('#headerSection .elementor-widget-theme-site-logo img').addClass('coloredLogo')
    })
    .mouseout(function() {
      var  offset = $('#headerSection').data('scroll') ? $('#headerSection').data('scroll') : 0
      if(offset > -60 && offset <= 0){
        $('div.page-content').removeClass('offsetTop')
        $('#headerSection .elementor-item').removeClass('hovered')
        $('#contactUs').removeClass('contactUs')
        $('#rentCar').removeClass('rentCar')
      }
      
      $('#headerSection').removeClass('headerOpen')
      
      $('#headerSection .elementor-widget-theme-site-logo img').removeClass('coloredLogo')
    });

    $('body').on('click','.elementor-item-anchor', function(){
      $('#jumpToTitle span').html($(this).html())
    })

    $('.menu-item > a').mouseover( function(){
        var path = $(this).attr('href') 
        if (path.indexOf("external") >= 0) {
          $(this).parent().addClass('external')
          if($(this).children().length > 0){
            $(this).children().children().addClass('fa fa-external-link')
          }else{
            $(this).append("<span class='sub-arrow'><i class='fa fa-external-link'></i>")
          }
        } 
    }).mouseout(function() {
      $(this).children().children().removeClass('fa fa-external-link')
    })

    $('.openSearch').on('click', () => {
      $('.searchBox').removeClass('hideSearch')
      $('.searchBox').addClass('showSearch')
    })

    $('.closeSearch').on('click', () => {
      $('.searchBox').removeClass('showSearch')
      $('.searchBox').addClass('hideSearch')
    })

    $('#headerSection').mouseover( function(){
      $('#headerSection').addClass('headerHover')
      $('#headerSection .elementor-item').addClass('hovered')
      $('#contactUs').addClass('contactUs')
      $('#rentCar').addClass('rentCar')
      $('#headerSection .elementor-widget-theme-site-logo img').addClass('coloredLogo')
      $('.openSearch').css({'color': '#20438C'})
    }).mouseout(function() {
      $('#headerSection').removeClass('headerHover')
      $('#headerSection .elementor-item').removeClass('hovered')
      $('#contactUs').removeClass('contactUs')
      $('#rentCar').removeClass('rentCar')
      $('#headerSection .elementor-widget-theme-site-logo img').removeClass('coloredLogo')
      $('.openSearch').css({'color': '#fff'})
    });

  });
  
  
  $(document).on('scroll', function(){
    var scrollTop     = $(window).scrollTop(),
          elementOffset = $('div.page-content').offset().top,
          distance      = (elementOffset - scrollTop);

    $('#headerSection').data('scroll', distance )

    if(distance < -60){
      $('#headerSection .elementor-item').addClass('hovered')
      $('#contactUs').addClass('contactUs')
      $('#rentCar').addClass('rentCar')
      $('#headerSection .elementor-icon svg').addClass('scrolledMobileNav')
      $('.openSearch').css({'color': '#20438C'})

    }else{
      $('#headerSection .elementor-item').removeClass('hovered')
      $('#contactUs').removeClass('contactUs')
      $('#rentCar').removeClass('rentCar')
      $('#headerSection .elementor-icon svg').removeClass('scrolledMobileNav')
      $('.openSearch').css({'color': '#fff'})
      
    }

    // if(screen.width <= 768){
    //   // Switching Jump To
    //   $('.mobile-nav').css({'display': 'none'})
    //   $('.jumpTo').css({'display':'block'})

    //   // Change Title of Jump To After Sroll
    //   anchorIDs = $('.jumpToAnchor  > div > div').map(function() {
    //     return $(this).attr('id');
    //   });
  
  
    //   for(i = 0 ; i < anchorIDs.length; i ++){
    //     var offTop = ($('#'+anchorIDs[i]).offset().top - scrollTop);
    //     console.log('#'+anchorIDs[i] + ' '+offTop)
    //     if(offTop <= 80){
    //       console.log(anchorIDs[i])
    //       $('#jumpToTitle span').html($('#'+anchorIDs[i]).parent().parent().data('title'))
    //     }

    //     // if(($('#'+anchorIDs[0]).offset().top - scrollTop) < 0){
    //     //   $('#jumpToTitle span').html('About Us Overview')
    //     // }
        
    //   }

    // }

    // if(distance === 0 && screen.width <= 768){

    //   // Switching Jump To
    //   $('.mobile-nav').css({'display': 'block'})
    //   $('.jumpTo').css({'display':'none'})
    // }

    $('div.page-content').removeClass('offsetTop')

  });

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


  /** SET Footer container background color */
  /** ESG pages (with subpages?) must have green footer */
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
  /** END SET Footer container background color*/

 
});
