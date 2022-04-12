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

    /**
     * @description Events for the widget
     *
     * @param {object} $scope
     * @return void
     */
    function buildPostEvents(el) {
   

      if (el && el !== 'undefined') {
        
        let currentPostPage = 2;
        // load more button 
        jQuery(el).find(".from-posts-load-more .btn-load-more").click(function(){
          
          let thisEl = jQuery(this);

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
              let showDateField = body.data('show_date');
              let showReadMore = body.data('show_read_more');

              currentPostPage = currentPostPage + 1;
              
              if(response.posts.length === 0){
                thisEl.css({ "display" : "none" });
              }

              if(response.posts.length > 0){

                // loop posts and append to body
                for(var post of response.posts) {

                  var postItemHtml = `<div class="from-posts--item">
                  <a href="${post.page_url}" class="from-posts--image" style="background-image:url(${post.featured_image_thumbnail});" target="_blank" ></a> 
                  <div class="from-posts--details">
                    <h3 class="from-posts--title"><a href="${post.page_url}" target="_blank" >${post.post_title}</a></h3>`;

                  if(showDateField === "yes"){
                    postItemHtml +=`<p class="from-posts--date">${post.post_date}</p>`;
                  }

                  postItemHtml +=`<p class="from-posts--description">${post.post_excerpt}</p>`;

                  if(showReadMore === "yes"){
                    postItemHtml += `<a href="${post.page_url}" target="_blank" class="from-posts--link btn-from btn-from-link">
                      <span> Find out more </span>
                      <span class="line"></span>
                    </a>`;
                  }
              
                  postItemHtml += `</div>`;
                  postItemHtml += `</div>`;

                  body.append(postItemHtml);

                }

              }

            },
            error : function(error){ console.log(error) }
          });

        });

      }

    }


});