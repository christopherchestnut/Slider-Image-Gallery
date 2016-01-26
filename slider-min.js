/*
* Author: Christopher Chestnut
* version:1.0.2
* Date: 17/01/2013
* Description: a simple image slideshow using jquery to cycle through a series of images
* Licensed under the MIT/X11 License (http://opensource.org/licenses/MIT)
* Requirements: jquery, css stylesheet
* Update: 20/02/2013 added pausing and elements pauseHolder and playHolder to hold images to animate the pausing action
* Update: 28/11/2013 allow images to use alt instead of title or be missing the attribute
*
* - Format -
* <div class="slider">
*    <img src="{location of image}" title="title for image" / >
*    .... as many images as you want
* </div>
*
*/
/*
* Author: Christopher Chestnut
* version:1.0.2
* Date: 17/01/2013
* Description: a simple image slideshow using jquery to cycle through a series of images
* Licensed under the MIT/X11 License (http://opensource.org/licenses/MIT)
* Requirements: jquery, css stylesheet
* Update: 20/02/2013 added pausing and elements pauseHolder and playHolder to hold images to animate the pausing action
* Update: 28/11/2013 allow images to use alt instead of title or be missing the attribute
*
* - Format -
* <div class="slider">
*    <img src="{location of image}" title="title for image" / >
*    .... as many images as you want
* </div>
*
*/
function slidermethod(){var i=3e3,e=window.innerWidth,t=window.innerHeight;$(".slider").length&&($(".slider").each(function(){$(this).children(".pauseHolder").remove(),$(this).children(".playHolder").remove();if($(this).children("div").length){if(1!=$(this).children("div").length&&!$(this).hasClass("stopslideshow"))if(0==$(this).children(".currentslide").length)$(this).children("div:first").addClass("currentslide");else if($(this).children(".currentslide").next().length){var i=$(this).children(".currentslide").next();$(this).children("div").removeClass("currentslide"),$(i).addClass("currentslide").children("img").css("visibility","")}else $(this).children("div").removeClass("currentslide"),$(this).children("div:first").addClass("currentslide")}else $(this).children("img").length&&($(this).children("img").css("visibility","hidden"),$(this).children("img").each(function(){var i=$('<div class="slide"></div>').appendTo($(this).parent());if($(this).appendTo($(i)),void 0!==$(this).attr("alt")&&$(this).attr("alt").length>0&&$(this).attr("title",$(this).attr("alt")),void 0!==$(this).attr("title")&&$(this).attr("title").length>0){$('<div class="description">'+$(this).attr("title")+"</div>").appendTo($(i))}}),$(this).children("div:first").addClass("currentslide").children("img").css("visibility",""),$(".slide").unbind("click").click(function(){if(1==$(this).parent().children(".slide").length){var i=$(this).children("img").attr("src"),s=($('<div class="lightboxsheet" tooltip="Click anywhere to minimise"><img src="'+i+'" /></div>').appendTo("body"),$(".lightboxsheet > img")[0].offsetWidth),h=$(".lightboxsheet > img")[0].offsetHeight,l=h/s;s=e-80,h=s*l,h>t-125?(h=t-125,$(".lightboxsheet > img").css("height",h+"px")):$(".lightboxsheet > img").css("width",s+"px");var r=(t-h)/2-50;$(".lightboxsheet > img").css("top",(25>r?25:r)+"px"),$(".lightboxsheet").unbind("click").click(function(){$(this).remove()})}else if($(this).parent().hasClass("stopslideshow")){$(this).parent().children(".pauseHolder").remove(),$(this).parent().addClass("stopslideshow");var d=$('<div class="playHolder"></div>').appendTo($(this).parent());$(d).fadeOut(1500),$(".playHolder").unbind("click").click(function(){$(this).parent().removeClass("stopslideshow"),$(this).parent().children(".playHolder").remove()}),$(this).parent().removeClass("stopslideshow"),$(".zoomHolder").remove()}else{$(this).parent().children(".playHolder").remove(),$(this).parent().addClass("stopslideshow");var n=$('<div class="pauseHolder"></div>').appendTo($(this).parent());$(n).fadeOut(1500);var i=($('<div class="zoomHolder" title="Click here to zoom in"></div>').appendTo($(this).parent()),$(this).children("img").attr("src"));$(".pauseHolder").unbind("click").click(function(){$(this).parent().removeClass("stopslideshow"),$(this).parent().children(".pauseHolder").remove()}),$(".zoomHolder").unbind("click").click(function(){var s=($('<div class="lightboxsheet" tooltip="Click anywhere to minimise"><img src="'+i+'" /></div>').appendTo("body"),$(".lightboxsheet > img")[0].offsetWidth),h=$(".lightboxsheet > img")[0].offsetHeight,l=h/s;s=e-80,h=s*l,h>t-125?(h=t-125,$(".lightboxsheet > img").css("height",h+"px")):$(".lightboxsheet > img").css("width",s+"px");var r=(t-h)/2-50;$(".lightboxsheet > img").css("top",(25>r?25:r)+"px"),$(".lightboxsheet").unbind("click").click(function(){$(this).remove()})})}}))}),repositionHeight(),setTimeout("slidermethod()",i))}function repositionHeight(){repositionDone||$(".slide").each(function(){"10px"==$(this).css("top")&&$(this).children("img").load(function(){var i=$(this)[0].offsetHeight;if(400>i&&0!=i&&15!=i){var e=(400-i)/2;$(this).parent().css("top",e+"px"),$(this).parent().css("height",400-e+10+"px")}})})}!function(i){i(document)}(jQuery);var repositionDone=!1;slidermethod();