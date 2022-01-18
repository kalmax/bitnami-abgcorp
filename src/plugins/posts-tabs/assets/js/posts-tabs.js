jQuery(document).ready(function(){

    let selector;
    let tabContainer;

    // For the editor page
    jQuery(document).ready(function () {
        // Sanity Check
        if (window.elementorFrontend && 'undefined' !== window.elementorFrontend) {

            elementorFrontend.hooks.addAction('frontend/element_ready/posts-tabs.default', function($scope) {
              selector = `.elementor-element-${$scope[0].dataset.id}`;
              tabContainer = window.document.querySelector(`${selector} .from-posts-tabs-container`);
              buildPostTabs(tabContainer);
            });

        }
    });

    // Front end
    jQuery(window).on('elementor/frontend/init', function () {

        // Sanity Check
        if (window.elementorFrontend && 'undefined' !== window.elementorFrontend) {

            elementorFrontend.hooks.addAction('frontend/element_ready/posts-tabs.default', function($scope) {
              selector = `.elementor-element-${$scope[0].dataset.id}`;
              tabContainer = window.document.querySelector(`${selector} .from-posts-tabs-container`);
              buildPostTabs(tabContainer);
            });

        }
    });

    /**
     * @description Builds tabs based on posts
     *
     * @param {object} $scope
     * @return void
     */
    function buildPostTabs(el) {
   
     if (el && el !== 'undefined') {

        // set first tab content open
        openTab(el, 0);

        jQuery(el).find(".tab-link").on('click', function (e) {

          // setting new indicator position if tab is clicked
          //indicatorNewPosition = indicatorTemporaryPosition

          // Hide and Show of tab contents
          var tabId = jQuery(this).attr('id').replace("posts-tabs-nav-","");

          // open tab
          openTab(el, tabId);
          // $('.tabContent').css({ 'display': 'none' })
          // $('#' + content).css({ 'display': 'block' })
          // $('#tab-indicator').css({ 'left': indicatorNewPosition + 'px' })

          // // setting new initial indicator position
          // indicatorInitialPosition = indicatorNewPosition

          e.preventDefault();

        });

      // jQuery(el).find()

      }

    }

    function openTab(el, tabId) {
      
      let tablinks = jQuery(el).find(".tab-contents .tab-contents-item");

      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
        console.log(tablinks[i]);
      }

      jQuery(el).find(`.tab-contents #posts-tabs-content-${tabId}`).addClass("active");

    }



});