jQuery(document).ready(function(){

    var selector;
    var slickContainer;

    // For the editor page
    jQuery(document).ready(function () {
        // Sanity Check
        if (window.elementorFrontend && 'undefined' !== window.elementorFrontend) {

            elementorFrontend.hooks.addAction('frontend/element_ready/posts-filter.default', function($scope) {
              selector = `.elementor-element-${$scope[0].dataset.id}`;
              slickContainer = window.document.querySelector(`${selector} .from-posts-filter-container`);
              buildPostFilter(slickContainer);
            });

        }
    });

    // Front end
    jQuery(window).on('elementor/frontend/init', function () {

        // Sanity Check
        if (window.elementorFrontend && 'undefined' !== window.elementorFrontend) {

            elementorFrontend.hooks.addAction('frontend/element_ready/posts-filter.default', function($scope) {
              selector = `.elementor-element-${$scope[0].dataset.id}`;
              slickContainer = window.document.querySelector(`${selector} .from-posts-filter-container`);
              buildPostFilter(slickContainer);
            });

        }
    });


    /**
     * @description Initializes widget script
     *
     * @param {object} $scope
     * @return void
     */
    function buildPostFilter(el) {

     if (el && el !== 'undefined') {

        let queryData = {
          action: "from_posts_filter",
          limit: jQuery(el).data('limit')
        };

        jQuery(el).find("#from-posts-filter-select-category").on('change',function(e) {

          e.preventDefault(); 
          queryData['nonce'] = jQuery(this).attr("data-nonce");
          queryData['category_id'] = jQuery(this).val();
          ajaxFilterReq(el, queryData);   

        });

        jQuery(el).find("#from-posts-filter-select-year").on('change',function(e) {
          e.preventDefault(); 
          queryData['nonce'] = jQuery(this).attr("data-nonce");
          queryData['year'] = jQuery(this).val();
          ajaxFilterReq(el, queryData);   

       });


       jQuery(el).find("#from-posts-filter-select-month").on('change',function(e) {
          e.preventDefault(); 
          queryData['nonce'] = jQuery(this).attr("data-nonce");
          queryData['month'] = jQuery(this).val();
          ajaxFilterReq(el, queryData);   

       });

      }

    }

    function dateFormater(date) {
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      var day = date.getDate();
      var month = months[date.getMonth()];
      var year = date.getFullYear();
    
      return month + ' ' + ordinal(day) + ', ' + year;
    }
    
    function ordinal (d) {
      const nth = { '1': 'st', '2': 'nd', '3': 'rd' }
      return `${d}${nth[d] || 'th'}`
    }

    function ajaxFilterReq(el, data){

      jQuery.ajax({
        type : "post",
        dataType : "json",
        url : scriptData.ajaxurl,
        data : data,
        success: function(response) {
          
            // clear all active items
            let body = jQuery(el).find('.body');
            body.html("");
            console.log(response);
            // loop posts and append to body
            for(var post of response) {
              var postDate  = new Date(post.post_date);
              postDate = dateFormater(postDate);
               var postItemHtml = `<div class="from-posts-filter--item-wrapper">
                <a href="${post.page_url}" class="from-posts-filter--image" style="background-image:url(${post.featured_image_thumbnail});"></a> 
                <div class="from-posts-filter--details">
                  <h3 class="from-posts-filter--title"><a href="${post.page_url}" target="_blank">${post.post_title}</a></h3>
                  <p class="from-posts-filter--date">${postDate}</p>
                  <p class="from-posts-filter--description">${post.post_excerpt}</p>
                  <a href="${post.page_url}" class="from-posts-filter--link btn-from btn-from-link">
                    <span style="text-transform:capitalize"> Find out more </span>
                    <span class="line"></span>
                  </a>
                </div>
              </div>`;

               body.append(postItemHtml);
                
            }
        },
        error : function(error){ console.log(error) }
      });
    }

});