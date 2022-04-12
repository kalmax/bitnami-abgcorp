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
    sliderImage.closest('section').addClass('timeline-section-container');

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