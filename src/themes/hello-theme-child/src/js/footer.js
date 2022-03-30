jQuery(function ($) {
  $(document).ready(function () {

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
    addLogoContainer();
    /** END SET Footer container background color*/
  });

  function addLogoContainer() {
    if ($('body.single.single-post div.post.category-news-article').length) {
      /** Add Logos */
      if ($('body[data-elementor-device-mode="desktop"]').length) {
        if ($('section[data-id="a844566"] div.elementor-logo-desktop-container').length == 0) {
          $html = `
            <div class="elementor-logo-container elementor-logo-desktop-container elementor-column-gap-default">
              <ul style="display: flex;flex-flow: row;list-style-type: none;">
                <li><a href="https://www.avis.com/en/customer-service" target="_blank"><img src="http://abgcsi-lb-1321724458.us-west-1.elb.amazonaws.com/wp-content/uploads/2022/03/Avis_Logo.png" /></a></li>
                <li><a href="https://www.budget.com/en/customer-care" target="_blank"><img src="http://abgcsi-lb-1321724458.us-west-1.elb.amazonaws.com/wp-content/uploads/2022/03/Budget_Logo.png" /></a></li>
                <li><a href="https://support.zipcar.com/hc/en-us" target="_blank"><img src="/wp-content/uploads/2022/01/Zipcar_Logo.png" /></a></li>
                <li><a href="https://www.paylesscar.com/en/customer-service/contact-us" target="_blank"><img src="http://abgcsi-lb-1321724458.us-west-1.elb.amazonaws.com/wp-content/uploads/2022/03/Payless_Logo.png" /></a></li>
              </ul>
            </div>
          `;
  
          $('section[data-id="a844566"]').append($html);
        }
      }
      if ($('body[data-elementor-device-mode="mobile"]').length || $('body[data-elementor-device-mode="tablet"]').length) {
        if ($('div.elementor-logo-mobile-container').length == 0) {
          $html = `
            <div class="elementor-logo-container elementor-logo-mobile-container elementor-column-gap-default">
              <ul style="display: flex;flex-flow: row;list-style-type: none;">
                <li><a href="https://www.avis.com/en/customer-service" target="_blank"><img src="http://abgcsi-lb-1321724458.us-west-1.elb.amazonaws.com/wp-content/uploads/2022/03/Avis_Logo.png" /></a></li>
                <li><a href="https://www.budget.com/en/customer-care" target="_blank"><img src="http://abgcsi-lb-1321724458.us-west-1.elb.amazonaws.com/wp-content/uploads/2022/03/Budget_Logo.png" /></a></li>
                <li><a href="https://support.zipcar.com/hc/en-us" target="_blank"><img src="/wp-content/uploads/2022/01/Zipcar_Logo.png" /></a></li>
                <li><a href="https://www.paylesscar.com/en/customer-service/contact-us" target="_blank"><img src="http://abgcsi-lb-1321724458.us-west-1.elb.amazonaws.com/wp-content/uploads/2022/03/Payless_Logo.png" /></a></li>
              </ul>
            </div>
          `;
          $($html).insertAfter('section[data-id="a844566"]');
        }
      }
    }
  }

  $( window ).resize(function() {
    addLogoContainer();
  })
});