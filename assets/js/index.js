/**
 * Main JS file for Casper behaviours
 +This is a ghost theme , base on Protfolio (https://github.com/GavickPro/Portfolio-Free-Ghost-Theme)
 +redesgin by caicai..
 */

/*globals jQuery, document */
(function ($) {
    "use strict";

    $(document).ready(function(){
        // move main image to header
        if(
        	$('.post-template').length > 0 || 
        	$('.page-template').length > 0
        ) {
        	var featured_image = $('img[alt="featured-image"]');
        	var featured_video = $('.post__content iframe:first-child')
        	// check if the featured image exists
        	if(featured_image && featured_image.length > 0) {
        		// create container for the image
        		featured_image.appendTo($('.post__media'));
        	} else if(featured_video && featured_video.length > 0) {
        		featured_video.appendTo($('.post__media'));
        	}
        }

        if(
        	$(document.body).hasClass('home-template') ||
        	$(document.body).hasClass('archive-template') ||
        	$(document.body).hasClass('tag-template')
        ) {
          // get the post images
          var blocks = [];
          
          $('.post__wrapper_helper--notloaded').each(function(i, block) {
          	blocks.push(block);
          });
          
          var add_class = function(block, class_name, delay) {
          	setTimeout(function() {
          		$(block).addClass(class_name);
          	}, delay);
          };
          
          for(var i = 0; i < blocks.length; i++) {
          	add_class(blocks[i], 'post__wrapper_helper--animated', i * 200);
          }
          
          $('.post__wrapper_helper--notloaded').each(function(i, wrapper) {
            wrapper = $(wrapper);
            var img = wrapper.find('p > img')[0];
            if(img) {
              // wait for the images
              var timer = setInterval(function() {
                // when the image is laoded
                if(img.complete) {
                  // stop periodical calls
                  clearInterval(timer);
                  // generate the image wrapper
                  var src = $(img).attr('src');
                  img.remove();
                  var img_container = $('<div class="post__image el__transition_long" style="background-image: url(\''+src+'\')"></div>');
                  img_container.appendTo(wrapper);
                  wrapper.removeClass('post__wrapper_helper--notloaded');
                  // add class with delay
                  setTimeout(function() {
                    img_container.addClass('post__image--loaded');
                  }, 250);
                }          
              }, 100);
              // add necessary mouse events
              wrapper.mouseenter(function() {
                wrapper.addClass('post__wrapper_helper--hover');
              });

              wrapper.mouseleave(function() {
                wrapper.removeClass('post__wrapper_helper--hover');
              });
            } else {
              // where there is no image - display the text directly
              wrapper.addClass('post__wrapper_helper--hover');
            }
          });
        }
        // fit videos
        $(".post-header").fitVids();
        $(".post-content").fitVids();
        // menu behaviour
        var main_menu = $(".menu");
        main_menu.click(function() {
          if(main_menu.hasClass("menu--open")) {
            main_menu.removeClass("menu--open");
          } else {
            main_menu.addClass("menu--open");
          }
        });
        // 增加一个简单的当前页面active状态，不过有个缺陷，这里匹配的url和你的导航名字要一样，如果不一样，则不能识别
        var menus = $(".menu__wrap a"), i = 0 , l = menus.length;
        var path = window.location.pathname;
        
        if (path !== '/') {
          for (; i < l; i++) {
            var _menu = menus.eq(i);
            _menu.removeClass('menu__item--active')
            if (path.indexOf(_menu.text().toLowerCase()) != -1) {
              _menu.addClass('menu__item--active')
            }
          }
        }
    });
}(jQuery));