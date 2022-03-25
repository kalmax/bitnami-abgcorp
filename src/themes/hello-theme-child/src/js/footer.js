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

      /** Add Logos */
      if ($('section[data-id="a844566"] div.elementor-logo-container').length == 0) {
        $html = `
        <div class="elementor-logo-container elementor-column-gap-default">
          <ul style="display: flex;flex-flow: row;list-style-type: none;">
            <li><img src="http://abgcsi-lb-1321724458.us-west-1.elb.amazonaws.com/wp-content/uploads/2022/03/Avis_Logo.png" /></li>
            <li><img src="http://abgcsi-lb-1321724458.us-west-1.elb.amazonaws.com/wp-content/uploads/2022/03/Budget_Logo.png" /></li>
            <li><img src="/wp-content/uploads/2022/01/Zipcar_Logo.png" /></li>
            <li><img src="http://abgcsi-lb-1321724458.us-west-1.elb.amazonaws.com/wp-content/uploads/2022/03/Payless_Logo.png" /></li>
          </ul>
        </div>
        `;

        $('section[data-id="a844566"]').append($html);
      }
    }
    /** END SET Footer container background color*/
  });
});