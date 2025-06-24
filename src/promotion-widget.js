(function() {
    function initProWidgets() {
        if (typeof parent.document === 'undefined') {
            return;
        }

        let lastIcon = null;
        const checkDelay = 50;
        const maxAttempts = 20;

        function updateDialog() {
            const dialog = parent.document.querySelector('#elementor-element--promotion__dialog');
            if (!dialog) {
                return;
            }

            const defaultBtn = dialog.querySelector('.dialog-buttons-action');
            dialog.querySelectorAll('.uae-upgrade-button').forEach(btn => btn.remove());

            if (lastIcon && lastIcon.className.indexOf('hfe') >= 0) {
                if (defaultBtn) {
                    defaultBtn.style.display = 'none';
                }
                const button = document.createElement('a');
                button.textContent = 'Upgrade to Pro';
                button.href = 'https://your-upgrade-url.com';
                button.target = '_blank';
                button.className = 'dialog-button dialog-action dialog-buttons-action elementor-button go-pro elementor-button-success uae-upgrade-button';
                if (defaultBtn) {
                    defaultBtn.insertAdjacentElement('afterend', button);
                } else {
                    dialog.appendChild(button);
                }
            } else if (defaultBtn) {
                defaultBtn.style.display = '';
            }
        }

        function waitForDialog(attempt) {
            const dialog = parent.document.querySelector('#elementor-element--promotion__dialog');
            if (dialog) {
                updateDialog();
            } else if (attempt < maxAttempts) {
                setTimeout(() => waitForDialog(attempt + 1), checkDelay);
            }
        }

        const observer = new MutationObserver(mutations => {
            for (const m of mutations) {
                for (const node of m.addedNodes) {
                    if (node.id === 'elementor-element--promotion__dialog' || (node.querySelector && node.querySelector('#elementor-element--promotion__dialog'))) {
                        updateDialog();
                        return;
                    }
                }
            }
        });
        observer.observe(parent.document.body, { childList: true, subtree: true });

        parent.document.addEventListener('mousedown', e => {
            const proWidgets = parent.document.querySelectorAll('#elementor-panel-category-hfe-widgets .elementor-element--promotion');
            lastIcon = null;
            for (let i = 0; i < proWidgets.length; i++) {
                if (proWidgets[i].contains(e.target)) {
                    lastIcon = proWidgets[i].querySelector('.icon > i');
                    break;
                }
            }

            setTimeout(() => waitForDialog(0), checkDelay);
        });
    }

    if (window.elementor) {
        elementor.on('preview:loaded', initProWidgets);
    } else {
        window.addEventListener('elementor/frontend/init', initProWidgets);
    }
})();
