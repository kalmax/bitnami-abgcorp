jQuery(function ($) {
  console.log("theme.js");

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
