jQuery(document).ready(function(){

    var selector;
    var elContainer;

    // For the editor page
    jQuery(document).ready(function () {
        // Sanity Check
        if (window.elementorFrontend && 'undefined' !== window.elementorFrontend) {

            elementorFrontend.hooks.addAction('frontend/element_ready/from-posts.default', function($scope) {
              selector = `.elementor-element-${$scope[0].dataset.id}`;
              elContainer = window.document.querySelector(`${selector}`);
              buildPostEvents(elContainer);
            });

        }
    });

    // Front end
    jQuery(window).on('elementor/frontend/init', function () {
       
        // Sanity Check
        if (window.elementorFrontend && 'undefined' !== window.elementorFrontend) {
 
            elementorFrontend.hooks.addAction('frontend/element_ready/from-posts.default', function($scope) {
              selector = `.elementor-element-${$scope[0].dataset.id}`;
              elContainer = window.document.querySelector(`${selector}`);
              buildPostEvents(elContainer);
            });

        }
    });

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


    /**
     * @description Events for the widget
     *
     * @param {object} $scope
     * @return void
     */
    function buildPostEvents(el) {
   

      if (el && el !== 'undefined') {
        
        let currentPostPage = 2;
        let hasMore = false;

        // load more button 
        jQuery(el).find(".from-posts-load-more .btn-load-more").click(function(){

          let data = {
            action: "from_posts_filter",
            page: currentPostPage,
            limit: jQuery(el).data('limit')
          }

          if(jQuery(el).data('nonce')){
            data['nonce'] = jQuery(el).data('nonce');
          }

          if(jQuery(el).data('category_id')){
            data['category_id'] = jQuery(el).data('category_id')
          }

          if(jQuery(el).data('years')){
            data['year'] = jQuery(el).data('year')
          }    

          jQuery.ajax({
            type : "post",
            dataType : "json",
            url : scriptData.ajaxurl,
            data : data,
            success: function(response) {
              
              let body = jQuery(el).find(".post-list");
              currentPostPage = currentPostPage + 1;
              
              if(response.posts.length > 0){

                // loop posts and append to body
                for(var post of response.posts) {

                  var postDate  = new Date(post.post_date);
                  postDate = dateFormater(postDate);

                  var postItemHtml = `<div class="from-posts--item">
                    <a href="${post.page_url}" class="from-posts--image" style="background-image:url(${post.featured_image_thumbnail});" target="_blank" ></a> 
                    <div class="from-posts--details">
                      <h3 class="from-posts--title"><a href="${post.page_url}" target="_blank" >${post.post_title}</a></h3>
                      <?php if($show_date_field === "yes"):?>
                        <p class="from-posts--date"><?=$post_date;?> </p>
                      <?php endif;?>
                      <a href="${post.page_url}" target="_blank" class="from-posts--link btn-from btn-from-link">
                        <span> Find out more </span>
                        <span class="line"></span>
                      </a>
                    </div>
                  </div>`;

                  body.append(postItemHtml);

                }

              } else {
                hasMore = false
              }

            },
            error : function(error){ console.log(error) }
          });

          console.log(hasMore);


        });

      }

    }


});