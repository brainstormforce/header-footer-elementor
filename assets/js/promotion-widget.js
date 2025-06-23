(function() {
    // Wait for Elementor editor to be ready
    var initProWidgets = function() {
        if (typeof parent.document === "undefined") {
            return false;
        }
        
        // Listen for clicks on promotional widgets
        parent.document.addEventListener("mousedown", function(e) {
            var proWidgets = parent.document.querySelectorAll("#elementor-panel-category-hfe-widgets .elementor-element--promotion");
            
            if (proWidgets.length > 0) {
                for (var i = 0; i < proWidgets.length; i++) {
                    if (proWidgets[i].contains(e.target)) {
                        // Find the promotion dialog
                        var dialog = parent.document.querySelector("#elementor-element--promotion__dialog");
                        var icon = proWidgets[i].querySelector(".icon > i");
                        
                        // Check if it's our plugin's widget (by icon class)
                        if (icon.classList.toString().indexOf("hfe") >= 0) {
                            // Hide Elementor's default button
                            dialog.querySelector(".dialog-buttons-action").style.display = "none";
                            e.stopImmediatePropagation();
                            
                            // Add our custom button if it doesn't exist
                            if (dialog.querySelector(".uae-upgrade-button") === null) {
                                var button = document.createElement("a");
                                var buttonText = document.createTextNode("Upgrade to Pro");
                                button.setAttribute("href", "https://your-upgrade-url.com");
                                button.setAttribute("target", "_blank");
                                button.classList.add("dialog-button", "dialog-action", "dialog-buttons-action", 
                                    "elementor-button", "go-pro", "elementor-button-success", "your-plugin-upgrade-button");
                                button.appendChild(buttonText);
                                dialog.querySelector(".dialog-buttons-action").insertAdjacentHTML("afterend", button.outerHTML);
                            } else {
                                dialog.querySelector(".uae-upgrade-button").style.display = "";
                            }
                        } else {
                            // Not our widget, restore default button
                            dialog.querySelector(".dialog-buttons-action").style.display = "";
                            if (dialog.querySelector(".your-plugin-upgrade-button") !== null) {
                                dialog.querySelector(".your-plugin-upgrade-button").style.display = "none";
                            }
                        }
                        
                        break;
                    }
                }
            }
        });
    };
    
    // Hook into Elementor's init
    if (window.elementor) {
        elementor.on("preview:loaded", initProWidgets);
    } else {
        // Fallback
        window.addEventListener("elementor/frontend/init", initProWidgets);
    }
})();
