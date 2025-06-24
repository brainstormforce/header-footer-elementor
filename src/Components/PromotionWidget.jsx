import { useEffect } from '@wordpress/element';

const PromotionWidget = () => {
    useEffect(() => {
        let lastIcon = null;

        const handleMouseDown = (e) => {
            const proWidgets = parent.document.querySelectorAll(
                '#elementor-panel-category-hfe-widgets .elementor-element--promotion'
            );
            for (let i = 0; i < proWidgets.length; i++) {
                if (proWidgets[i].contains(e.target)) {
                    lastIcon = proWidgets[i].querySelector('.icon > i');
                    return;
                }
            }
            lastIcon = null;
        };

        const updateDialog = () => {
            const dialog = parent.document.querySelector(
                '#elementor-element--promotion__dialog'
            );
            if (!dialog) {
                return;
            }

            const defaultBtn = dialog.querySelector('.dialog-buttons-action');
            dialog.querySelectorAll('.uae-upgrade-button').forEach((b) => b.remove());

            if (lastIcon && lastIcon.className.includes('hfe')) {
                if (defaultBtn) {
                    defaultBtn.style.display = 'none';
                }

                const button = document.createElement('a');
                button.textContent = 'Upgrade to Pro';
                button.setAttribute('href', 'https://your-upgrade-url.com');
                button.setAttribute('target', '_blank');
                button.classList.add(
                    'dialog-button',
                    'dialog-action',
                    'dialog-buttons-action',
                    'elementor-button',
                    'go-pro',
                    'elementor-button-success',
                    'uae-upgrade-button'
                );

                if (defaultBtn) {
                    defaultBtn.insertAdjacentElement('afterend', button);
                } else {
                    dialog.appendChild(button);
                }
            } else if (defaultBtn) {
                defaultBtn.style.display = '';
            }
        };

        const observeDialog = new MutationObserver(updateDialog);

        const initProWidgets = () => {
            if (typeof parent.document === 'undefined') {
                return;
            }
            parent.document.addEventListener('mousedown', handleMouseDown);
            observeDialog.observe(parent.document.body, {
                childList: true,
                subtree: true,
            });
        };

        if (window.elementor) {
            elementor.on('preview:loaded', initProWidgets);
        } else {
            window.addEventListener('elementor/frontend/init', initProWidgets);
        }

        return () => {
            if (typeof parent.document !== 'undefined') {
                parent.document.removeEventListener('mousedown', handleMouseDown);
            }
            observeDialog.disconnect();
            if (window.elementor && elementor.off) {
                elementor.off('preview:loaded', initProWidgets);
            } else {
                window.removeEventListener('elementor/frontend/init', initProWidgets);
            }
        };
    }, []);

    return null;
};

export default PromotionWidget;
