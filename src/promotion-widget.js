// Script to override Elementor promotion dialog for HFE widgets
(function() {
    const initProWidgets = () => {
        if (typeof parent.document === 'undefined') {
            return false;
        }
        parent.document.addEventListener('mousedown', (e) => {
            const proWidgets = parent.document.querySelectorAll('#elementor-panel-category-hfe-widgets .elementor-element--promotion');
            if (proWidgets.length === 0) {
                return;
            }

            for (let i = 0; i < proWidgets.length; i++) {
                if (!proWidgets[i].contains(e.target)) {
                    continue;
                }

                const dialog = parent.document.querySelector('#elementor-element--promotion__dialog');
                const icon = proWidgets[i].querySelector('.icon > i');

                if (icon.classList.toString().indexOf('hfe') >= 0) {
                    dialog.querySelector('.dialog-buttons-action').style.display = 'none';
                    e.stopImmediatePropagation();

                    if (dialog.querySelector('.uae-upgrade-button') === null) {
                        const button = document.createElement('a');
                        button.appendChild(document.createTextNode('Upgrade to Pro'));
                        button.setAttribute('href', 'https://your-upgrade-url.com');
                        button.setAttribute('target', '_blank');
                        button.classList.add('dialog-button', 'dialog-action', 'dialog-buttons-action', 'elementor-button', 'go-pro', 'elementor-button-success', 'your-plugin-upgrade-button');
                        dialog.querySelector('.dialog-buttons-action').insertAdjacentHTML('afterend', button.outerHTML);
                    } else {
                        dialog.querySelector('.uae-upgrade-button').style.display = '';
                    }
                } else {
                    dialog.querySelector('.dialog-buttons-action').style.display = '';
                    const btn = dialog.querySelector('.your-plugin-upgrade-button');
                    if (btn !== null) {
                        btn.style.display = 'none';
                    }
                }
                break;
            }
        });
    };

    if (window.elementor) {
        elementor.on('preview:loaded', initProWidgets);
    } else {
        window.addEventListener('elementor/frontend/init', initProWidgets);
    }
})();
