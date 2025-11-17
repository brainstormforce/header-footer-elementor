/**
 * Counter Widget JavaScript
 * 
 * Handles the counter animation functionality
 */

(function($) {
    'use strict';

    var HfeCounter = {
        
        /**
         * Initialize the counter
         */
        init: function() {
            elementorFrontend.hooks.addAction('frontend/element_ready/hfe-counter.default', this.initCounter);
        },

        /**
         * Initialize counter for specific element
         */
        initCounter: function($scope) {
            var $counter = $scope.find('.hfe-counter-number');
            
            if ($counter.length) {
                HfeCounter.setupCounterAnimation($counter);
            }
        },

        /**
         * Setup counter animation
         */
        setupCounterAnimation: function($counter) {
            var startNumber = parseInt($counter.data('start')) || 0;
            var endNumber = parseInt($counter.data('end'));
            endNumber = isNaN(endNumber) ? 100 : endNumber;            
            var speed = parseInt($counter.data('speed')) || 3000;
            var separator = $counter.data('separator') || '';
            
            // Use Intersection Observer for better performance
            if ('IntersectionObserver' in window) {
                var observer = new IntersectionObserver(function(entries) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting && !$counter.hasClass('hfe-counter-animated')) {
                            $counter.addClass('hfe-counter-animated');
                            HfeCounter.animateCounter($counter[0], startNumber, endNumber, speed, separator);
                            observer.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.5
                });
                
                observer.observe($counter[0]);
            } else {
                // Fallback for older browsers
                $(window).on('scroll', function() {
                    if (HfeCounter.isElementInViewport($counter[0]) && !$counter.hasClass('hfe-counter-animated')) {
                        $counter.addClass('hfe-counter-animated');
                        HfeCounter.animateCounter($counter[0], startNumber, endNumber, speed, separator);
                    }
                });
            }
        },

        /**
         * Animate the counter
         */
        animateCounter: function(element, start, end, duration, separator) {
            var startTime = null;
            var $element = $(element);
            
            function animate(currentTime) {
                if (startTime === null) startTime = currentTime;
                var progress = Math.min((currentTime - startTime) / duration, 1);
                
                // Use easing function for smooth animation
                var easedProgress = HfeCounter.easeOutQuart(progress);
                var currentNumber = Math.floor(start + (end - start) * easedProgress);
                
                $element.text(HfeCounter.formatNumber(currentNumber, separator));
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    $element.text(HfeCounter.formatNumber(end, separator));
                }
            }
            
            requestAnimationFrame(animate);
        },

        /**
         * Format number with separator
         */
        formatNumber: function(number, separator) {
            if (!separator) {
                return number.toString();
            }
            
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
        },

        /**
         * Easing function for smooth animation
         */
        easeOutQuart: function(t) {
            return 1 - (--t) * t * t * t;
        },

        /**
         * Check if element is in viewport (fallback)
         */
        isElementInViewport: function(element) {
            var rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
    };

    // Initialize when Elementor frontend is ready
    $(window).on('elementor/frontend/init', function() {
        HfeCounter.init();
    });

    // Fallback for when Elementor frontend is not available
    $(document).ready(function() {
        if (typeof elementorFrontend === 'undefined') {
            // Create a mock elementorFrontend for standalone use
            window.elementorFrontend = {
                hooks: {
                    addAction: function(event, callback) {
                        $(document).ready(callback);
                    }
                }
            };
        }
        HfeCounter.init();
    });

})(jQuery);