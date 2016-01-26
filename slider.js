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
(function ($) {$(document);}(jQuery));
function slidermethod(){
	var timeoutmilliseconds = 3000;
	var screenwidth = window.innerWidth;
	var screenheight = window.innerHeight;
	if($('.slider').length){
		$('.slider').each(function(){
			$(this).children('.pauseHolder').remove();
			$(this).children('.playHolder').remove();
			var slider
			if($(this).children('div').length){
				if($(this).children('div').length != 1){
					if(!$(this).hasClass('stopslideshow')){
						if($(this).children(".currentslide").length == 0){
							$(this).children('div:first').addClass("currentslide");
						}
						else{
							if($(this).children('.currentslide').next().length){
								var nextchild = $(this).children('.currentslide').next();
								$(this).children('div').removeClass('currentslide');
								$(nextchild).addClass("currentslide").children("img").css("visibility","");
							}else{
								$(this).children('div').removeClass('currentslide');
								$(this).children('div:first').addClass("currentslide");
							}

						}
					}
				}
			}else if($(this).children('img').length){
				$(this).children('img').css("visibility","hidden");
				$(this).children('img').each(function(){
					var divelem = $('<div class="slide"></div>').appendTo($(this).parent());
					$(this).appendTo($(divelem));
					if($(this).attr("alt")!==undefined && $(this).attr("alt").length > 0){
						$(this).attr("title",$(this).attr("alt"));
					}
					if($(this).attr("title")!==undefined && $(this).attr("title").length > 0){
						var titlehoverbar = $('<div class="description">'+$(this).attr("title")+'</div>').appendTo($(divelem));
					}
				});
				$(this).children('div:first').addClass("currentslide").children("img").css("visibility","");
				$('.slide').unbind('click').click(function(){
					if($(this).parent().children('.slide').length == 1){
						var childurl = $(this).children('img').attr('src');
						var lightboxsheet = $('<div class="lightboxsheet" tooltip="Click anywhere to minimise"><img src="'+childurl+'" /></div>').appendTo('body');
						var imageWidth = $('.lightboxsheet > img')[0].offsetWidth;
						var imageHeight = $('.lightboxsheet > img')[0].offsetHeight;
						var ratioW = imageHeight / imageWidth;
						var ratioH = imageWidth / imageHeight;
						imageWidth = (screenwidth - 80)
						imageHeight = imageWidth * ratioW;
						if(imageHeight > (screenheight - 125)){
							imageHeight = (screenheight - 125);
							$('.lightboxsheet > img').css("height",imageHeight + "px");
						}else{
							$('.lightboxsheet > img').css("width", imageWidth + "px");
						}
						var toppos = (screenheight-imageHeight)/2 - 50;
						$('.lightboxsheet > img').css("top", (toppos < 25 ? 25 : toppos) + "px");
						$('.lightboxsheet').unbind('click').click(function(){
								$(this).remove();
						});
					}else{
						if($(this).parent().hasClass('stopslideshow')){
							$(this).parent().children('.pauseHolder').remove();
							$(this).parent().addClass('stopslideshow');
							var playHolder = $('<div class="playHolder"></div>').appendTo($(this).parent());
							$(playHolder).fadeOut(1500);
								$('.playHolder').unbind('click').click(function(){
									$(this).parent().removeClass('stopslideshow');
									$(this).parent().children('.playHolder').remove();
							});
							$(this).parent().removeClass('stopslideshow');
							$('.zoomHolder').remove();
						}else{
							$(this).parent().children('.playHolder').remove();
							$(this).parent().addClass('stopslideshow');
							var pauseholder = $('<div class="pauseHolder"></div>').appendTo($(this).parent());
							$(pauseholder).fadeOut(1500);
							var zoomholder = $('<div class="zoomHolder" title="Click here to zoom in"></div>').appendTo($(this).parent());
							var childurl = $(this).children('img').attr('src');
							$('.pauseHolder').unbind('click').click(function(){
								$(this).parent().removeClass('stopslideshow');
								$(this).parent().children('.pauseHolder').remove();
							});
							$('.zoomHolder').unbind('click').click(function(){
								var lightboxsheet = $('<div class="lightboxsheet" tooltip="Click anywhere to minimise"><img src="'+childurl+'" /></div>').appendTo('body');
								var imageWidth = $('.lightboxsheet > img')[0].offsetWidth;
								var imageHeight = $('.lightboxsheet > img')[0].offsetHeight;
								var ratioW = imageHeight / imageWidth;
								var ratioH = imageWidth / imageHeight;
								imageWidth = (screenwidth - 80)
								imageHeight = imageWidth * ratioW;
								if(imageHeight > (screenheight - 125)){
									imageHeight = (screenheight - 125);
									$('.lightboxsheet > img').css("height",imageHeight + "px");
								}else{
									$('.lightboxsheet > img').css("width", imageWidth + "px");
								}
								var toppos = (screenheight-imageHeight)/2 - 50;
								$('.lightboxsheet > img').css("top", (toppos < 25 ? 25 : toppos) + "px");
								$('.lightboxsheet').unbind('click').click(function(){
										$(this).remove();
								});
							});
						}
					}
				});
			}

		});
		repositionHeight();
		setTimeout("slidermethod()",timeoutmilliseconds);
	}
}
var repositionDone = false;
function repositionHeight(){
	if(!repositionDone){
		$(".slide").each(function(){
			if($(this).css("top") == "10px"){
				$(this).children("img").load(function() {
					var offHeight = $(this)[0].offsetHeight;
					if(offHeight < 400 && offHeight != 0 && offHeight != 15){
						var topoffset = ((400 - offHeight) / 2);
						$(this).parent().css("top",topoffset + "px");
						$(this).parent().css("height",(400 - topoffset)+10 + "px");
					}
				});
			}
		});
	}
}
slidermethod();