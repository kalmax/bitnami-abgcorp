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

        $('.searchBox').attr('id', 'animated-show-search');
        var anim = document.getElementById('animated-show-search');
        anim.addEventListener('animationstart', () => {
        });
        anim.addEventListener('animationend', () => {
            console.log('ADD event listener - animation end on anim element');
            console.log('HAS CLASS ', $('#animated-show-search').hasClass('hideSearch'));
            if ($('#animated-show-search').hasClass('hideSearch')) {
                $('#animated-show-search').css({"display": "none"});
            }
        });

        $('.openSearch').on('click', () => {
            $('#animated-show-search').css({"display": "block"});
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