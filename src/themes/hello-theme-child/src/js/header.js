jQuery(function ($) {
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

        $('#headerSection .elementor-item,#headerSection .elementor-sub-item').mouseover(function () {
            var offset = $('#headerSection').data('scroll') ? $('#headerSection').data('scroll') : 0
            if (offset > -60 && offset <= 0) {
                $('div.page-content').addClass('offsetTop')

            } else {
                $('#headerSection').addClass('headerOpen')

            }

            $('#contactUs').addClass('contactUs')
            $('#rentCar').addClass('rentCar')
            $('#headerSection .elementor-item').addClass('hovered')
            $('#headerSection .elementor-widget-theme-site-logo img').addClass('coloredLogo')
            $('.openSearch').addClass('searchColored')
        })
            .mouseout(function () {
                var offset = $('#headerSection').data('scroll') ? $('#headerSection').data('scroll') : 0
                if (offset > -60 && offset <= 0) {
                    $('div.page-content').removeClass('offsetTop')
                    $('#headerSection .elementor-item').removeClass('hovered')
                    $('#contactUs').removeClass('contactUs')
                    $('#rentCar').removeClass('rentCar')
                }

                $('#headerSection').removeClass('headerOpen')

                $('#headerSection .elementor-widget-theme-site-logo img').removeClass('coloredLogo')
                $('.openSearch').removeClass('searchColored')
            });


        $('.menu-item > a').mouseover(function () {
            var path = $(this).attr('href')
            if (path.indexOf("external") >= 0) {
                $(this).parent().addClass('external')
                if ($(this).children().length > 0) {
                    $(this).children().children().addClass('fa fa-external-link')
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
            $('.searchBox').removeClass('showSearch')
            $('.searchBox').addClass('hideSearch')
        })

        $('#headerSection').mouseover(function () {
            $('#headerSection').addClass('headerHover')
            $('#headerSection .elementor-item').addClass('hovered')
            $('#contactUs').addClass('contactUs')
            $('#rentCar').addClass('rentCar')
            $('#headerSection .elementor-widget-theme-site-logo img').addClass('coloredLogo')
            $('.openSearch').css({ 'color': '#20438C' })
            $('.openSearch').addClass('searchColored')
        }).mouseout(function () {
            $('#headerSection').removeClass('headerHover')
            $('#headerSection .elementor-item').removeClass('hovered')
            $('#contactUs').removeClass('contactUs')
            $('#rentCar').removeClass('rentCar')
            $('#headerSection .elementor-widget-theme-site-logo img').removeClass('coloredLogo')
            $('.openSearch').css({ 'color': '#fff' })
            $('.openSearch').removeClass('searchColored')
        });
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

        } else {
            $('#headerSection .elementor-item').removeClass('hovered')
            $('#contactUs').removeClass('contactUs')
            $('#rentCar').removeClass('rentCar')
            $('#headerSection .elementor-icon svg').removeClass('scrolledMobileNav')
            $('.openSearch').removeClass('searchColored')

        }


        $('div.page-content').removeClass('offsetTop')
    });
});