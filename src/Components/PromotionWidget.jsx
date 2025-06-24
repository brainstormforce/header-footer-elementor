import { useEffect } from '@wordpress/element';

const PromotionWidget = () => {
    useEffect(() => {
        const handleMouseDown = (e) => {
            const proWidgets = parent.document.querySelectorAll('#elementor-panel-category-hfe-widgets .elementor-element--promotion');
            if (!proWidgets.length) {
                return;
            }

            for (let i = 0; i < proWidgets.length; i++) {
                if (!proWidgets[i].contains(e.target)) {
                    continue;
                }

                const updateDialog = (attempt = 0) => {
                    const dialog = parent.document.querySelector('#elementor-element--promotion__dialog');
                    if (!dialog) {
                        if (attempt < 10) {
                            setTimeout(() => updateDialog(attempt + 1), 50);
                        }
                        return;
                    }

                    const defaultBtn = dialog.querySelector('.dialog-buttons-action');
                    const icon = proWidgets[i].querySelector('.icon > i');

                    // Clean up any previous custom buttons
                    dialog.querySelectorAll('.uae-upgrade-button').forEach((b) => b.remove());

                    if (icon && icon.className.includes('hfe')) {
                        if (defaultBtn) {
                            defaultBtn.style.display = 'none';
                        }

                        const button = document.createElement('a');
                        button.textContent = 'Upgrade to Pro';
                        button.setAttribute('href', 'https://your-upgrade-url.com');
                        button.setAttribute('target', '_blank');
                        button.classList.add('dialog-button', 'dialog-action', 'dialog-buttons-action', 'elementor-button', 'go-pro', 'elementor-button-success', 'uae-upgrade-button');

                        if (defaultBtn) {
                            defaultBtn.insertAdjacentElement('afterend', button);
                        } else {
                            dialog.appendChild(button);
                        }
                    } else if (defaultBtn) {
                        defaultBtn.style.display = '';
                    }
                };

                updateDialog();
                break;
            }
        };

        const initProWidgets = () => {
            if (typeof parent.document === 'undefined') {
                return;
            }
            parent.document.addEventListener('mousedown', handleMouseDown);
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
