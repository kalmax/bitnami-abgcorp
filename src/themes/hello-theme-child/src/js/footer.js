jQuery(function ($) {
  $(document).ready(function () {
    console.log("footer.js");

    /** SET Footer container background color */
    /** ESG pages (with subpages) must have green footer */
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
});