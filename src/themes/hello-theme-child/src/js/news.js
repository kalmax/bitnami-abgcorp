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