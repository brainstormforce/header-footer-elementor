(function (jQuery) {
    jQuery(document).ready(function () {
        // Function to calculate the scroll progress
        function updateProgressBar() {
            var scrollTop = jQuery(window).scrollTop(); // Current scroll position
            var windowHeight = jQuery(window).height(); // Height of the window
            var documentHeight = jQuery(document).height(); // Total height of the document

            // Calculate the scroll percentage
            var scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

            // Log the values for debugging
            console.log('Scroll Top:', scrollTop);
            console.log('Window Height:', windowHeight);
            console.log('Document Height:', documentHeight);
            console.log('Scroll Percent:', scrollPercent + '%');

            // Update the width of the progress bar
            jQuery('.hfe-reading-progress-fill').css('width', scrollPercent + '%');
            console.log('Progress bar updated to:', scrollPercent + '%');
        }

        // Initial call
        updateProgressBar();

        // Call the function on scroll
        jQuery(window).on('scroll', function () {
            console.log('Scroll event detected'); // Log when the user scrolls
            updateProgressBar();
        });

        // Set CSS variables for colors
        function setProgressBarColors(bgColor, fillColor) {
            jQuery('.hfe-reading-progress').css('--progress-bar-bg-color', bgColor);
            jQuery('.hfe-reading-progress-fill').css('--progress-bar-fill-color', fillColor);
            console.log('Progress bar colors set: BG Color:', bgColor, 'Fill Color:', fillColor);
        }

        // Example: Set colors from user settings (replace these with actual settings)
        const userSettings = {
            bgColor: '#e0e0e0', // Replace with actual value from settings
            fillColor: '#1fd18e' // Replace with actual value from settings
        };

        setProgressBarColors(userSettings.bgColor, userSettings.fillColor);
    });
})(jQuery);

