/*
* follows best practices from http://net.tutsplus.com/tutorials/javascript-ajax/principles-of-maintainable-javascript/
*/


//IE Fallback if console does not exist
if(!window.console) {console={}; console.log = function(){};}


//our namespace
var raptus = raptus || {};


(function($) {
    /*
    * private scope
    */


    raptus.imageslider = (function () {


        var DEBUG = true;


        var log = function(data) {
            if (DEBUG) {console.log(data);}
        };


        var resizeScrollable = function(scrollable) {
            /*
             * resize the width of all list-items to the width of the scrollable
             * and set the height of the scrollable to the height of the biggest
             * list-item.
             * (idea taken from http://cooshtee.com/blog/2013/04/making-jquery-tools-scrollable-responsive/)
             */
            
            var scrollableWidth = scrollable.width();
            scrollable.find('li').css('width', scrollableWidth);
            
            
            // find highest child element and use it's height
            // taken from http://stackoverflow.com/a/13332924/810427
            function thisHeight(){
                return $(this).height();
            }
            var bannerHeight = Math.max.apply(Math, scrollable.find('li').map(thisHeight))
            scrollable.css('height', bannerHeight);
            
            // Use the api to reposition the slide once it's been resized (if the broswer is resized)
            var api = scrollable.data('scrollable');
            var currentSlide = api.getIndex();
            api.seekTo(currentSlide, 50);
        };


        
        var initScrollable = function (slider, autoscroll) {
            /**
             * initialize the .scrollable within the container slider as a
             * responsive scrollable
             * 
             * set autoscroll to a dictionary containing autoscroll
             * configuration parameters to enable the autoscroll plugin
             * 
             * returns the api so additional configuration can be done 
             * after initialization.
             * (http://jquerytools.org/documentation/scrollable/#api)
             * 
             * eg: 
             * var api = initScrollable($('.imageSliderTeaser'));
             * api.getConf()['speed'] = 200;
             */

            if (typeof interval === 'undefined') { interval = 1000; }
            
            var scrollable = slider.find('.scrollable');
            
            log("initializing", scrollable);
            
            //Initiate scrollable as normal
            var api = scrollable.scrollable();
                        
            // Call our responsive function
            resizeScrollable(scrollable);
            
            // Call our responsive funtion every time the browser window is resized
            slider.resize(function() {
                resizeScrollable(scrollable);
            });
            
            // add navigator (useless in case template has no div.navi)
            scrollable.navigator();

            if (autoscroll && (api.data('scrollable').getSize()>1) ) {
                log("more than one item and autoscrolling activated");
                api.data('scrollable').getConf()['circular'] = true;
                api.autoscroll(autoscroll);
            }

            
            return api.data('scrollable');
            
        };
        
        var init = function () {
            //initScrollable($('.imageSliderTeaser'));
        };   



        // Return the public facing methods for the App
        return {
            init: init,
            initScrollable: initScrollable
        };

    }());

    $(function() {
        /*
        * on document ready
        */
        raptus.imageslider.init();

    });

})(jQuery);