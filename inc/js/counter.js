/**
 * HFE Counter Widget JavaScript
 * Following Elementor's modern approach with elementorModules
 */

class HfeCounter extends elementorModules.frontend.handlers.Base {
    
    getDefaultSettings() {
        return {
            selectors: {
                counterNumber: '.hfe-counter-number'
            }
        };
    }

    getDefaultElements() {
        const selectors = this.getSettings('selectors');
        return {
            $counterNumber: this.$element.find(selectors.counterNumber)
        };
    }

    onInit() {
        super.onInit();
        
        // Use Elementor's scroll observer if available, fallback to custom
        if (elementorModules.utils && elementorModules.utils.Scroll) {
            this.intersectionObserver = elementorModules.utils.Scroll.scrollObserver({
                callback: event => {
                    if (event.isInViewport) {
                        this.intersectionObserver.unobserve(this.elements.$counterNumber[0]);
                        this.animateCounter();
                    }
                }
            });
            this.intersectionObserver.observe(this.elements.$counterNumber[0]);
        } else {
            // Fallback to custom intersection observer
            this.setupCustomObserver();
        }
    }

    animateCounter() {
        const $counter = this.elements.$counterNumber;
        
        // Skip if already animated
        if ($counter.hasClass('hfe-counter-animated')) {
            return;
        }
        
        const data = $counter.data();
        const startNumber = parseInt(data.start, 10) || 0;
        const endNumber = parseInt(data.end, 10) || 100;
        const speed = parseInt(data.speed, 10) || 3000;
        const separator = data.separator || '';
        
        // Check for decimal places
        const decimalDigits = endNumber.toString().match(/\.(.*)/);
        let decimalPlaces = 0;
        if (decimalDigits) {
            decimalPlaces = decimalDigits[1].length;
        }
        
        $counter.addClass('hfe-counter-animated');
        
        // Try to use Elementor's numerator if available
        if (typeof $counter.numerator === 'function') {
            const numeratorData = {
                fromValue: startNumber,
                toValue: endNumber,
                duration: speed,
                rounding: decimalPlaces
            };
            $counter.numerator(numeratorData);
        } else {
            // Fallback to custom animation
            this.customAnimate($counter[0], startNumber, endNumber, speed, separator, decimalPlaces);
        }
    }

    customAnimate(element, start, end, duration, separator, decimalPlaces) {
        const startTime = performance.now();
        const $element = $(element);
        
        const animate = (currentTime) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easedProgress = this.easeOutQuart(progress);
            
            let currentNumber = start + (end - start) * easedProgress;
            
            // Handle decimal places
            if (decimalPlaces > 0) {
                currentNumber = parseFloat(currentNumber.toFixed(decimalPlaces));
            } else {
                currentNumber = Math.floor(currentNumber);
            }
            
            $element.text(this.formatNumber(currentNumber, separator));
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                $element.text(this.formatNumber(end, separator));
            }
        };
        
        requestAnimationFrame(animate);
    }

    setupCustomObserver() {
        const $counter = this.elements.$counterNumber;
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !$counter.hasClass('hfe-counter-animated')) {
                        this.animateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.3,
                rootMargin: '0px 0px -50px 0px'
            });
            
            observer.observe($counter[0]);
        } else {
            // Fallback for older browsers
            const scrollHandler = this.throttle(() => {
                if (this.isElementInViewport($counter[0]) && !$counter.hasClass('hfe-counter-animated')) {
                    this.animateCounter();
                    $(window).off('scroll', scrollHandler);
                }
            }, 100);
            
            $(window).on('scroll', scrollHandler);
        }
    }

    formatNumber(number, separator) {
        if (!separator) {
            return number.toString();
        }
        
        // Handle decimal numbers
        const parts = number.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
        return parts.join('.');
    }

    easeOutQuart(t) {
        return 1 - (--t) * t * t * t;
    }

    isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Register the handler with Elementor
jQuery(window).on('elementor/frontend/init', () => {
    elementorFrontend.hooks.addAction('frontend/element_ready/hfe-counter.default', ($scope) => {
        new HfeCounter({ $element: $scope });
    });
});