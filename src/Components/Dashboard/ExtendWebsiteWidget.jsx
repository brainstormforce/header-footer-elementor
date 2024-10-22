import React, { useRef } from 'react';
import { Container, Title, Button, Switch, Tooltip, Badge, Label } from "@bsf/force-ui";
import { InfoIcon } from 'lucide-react';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

const ExtendWebsiteWidget = ({
    plugin
}) => {
    const {  
        path,
        slug,
        siteUrl,
        icon,
        type,
        name,
        zipUrl,
        desc,
        wporg,
        isFree,
        action,
        status
    } = plugin

    const buttonRef = useRef(null);

    const getAction = ( status ) => {
		if ( status === 'Activated' ) {
			return '';
		} else if ( status === 'Installed' ) {
			return 'hfe_recommended_plugin_activate';
		}
		return 'hfe_recommended_plugin_install';
	};

	const handlePluginAction = ( e ) => {
		const action = e.currentTarget.dataset.action;
		const formData = new window.FormData();
        const pluginData = {
            init: e.currentTarget.dataset.init,
            type: e.currentTarget.dataset.type,
            slug: e.currentTarget.dataset.slug,
        };

		switch ( action ) {
			case 'hfe_recommended_plugin_activate':
				activatePlugin( pluginData );
				break;

			case 'hfe_recommended_plugin_install':
                if( 'theme' == pluginData.type ) {
                    formData.append(
                        'action',
                        'hfe_recommended_theme_install'
                    );
                } else {
                    formData.append(
                        'action',
                        'hfe_recommended_plugin_install'
                    );
                }
				
				formData.append(
					'_ajax_nonce',
					hfe_admin_data.installer_nonce
				);
				formData.append( 'slug', pluginData.slug );

				e.target.innerText = __( 'Installing...', 'header-footer-elementor' )

				apiFetch( {
					url: hfe_admin_data.ajax_url,
					method: 'POST',
					body: formData,
				} ).then( ( data ) => {
					if ( data.success ) {
						e.target.innerText = __( 'Installed', 'header-footer-elementor' );
                        activatePlugin( pluginData );
					} else {
						e.target.innerText = __( 'Install', 'header-footer-elementor' );
                        if( 'theme' == e.currentTarget.dataset.type ) {
                            alert( __( `Theme Installation failed, Please try again later.`, 'header-footer-elementor' ) );
                        } else {
                            alert( __( `Plugin Installation failed, Please try again later.`, 'header-footer-elementor' ) );
                        }
						
					}
				} );
				break;

			default:
				// Do nothing.
				break;
		}
	};

	const activatePlugin = ( pluginData ) => {

		const formData = new window.FormData();
		formData.append( 'action', 'hfe_recommended_plugin_activate' );
		formData.append( 'nonce', hfe_admin_data.nonce );
		formData.append( 'plugin', pluginData.init );
		formData.append( 'type', pluginData.type );
		formData.append( 'slug', pluginData.slug );
		
        const buttonElement = document.querySelector(`[data-slug="${pluginData.slug}"]`);
        const spanElement = buttonElement.querySelector('span');
        spanElement.innerText = __('Activating...', 'header-footer-elementor');

		apiFetch( {
			url: hfe_admin_data.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( ( data ) => {
			if ( data.success ) {
				// e.target.style.color = '#16A34A';
                buttonElement.classList.add('hfe-plugin-activated'); 
				spanElement.innerText = __( 'Activated', 'header-footer-elementor' );
			} else {
				if( 'theme' == pluginData.type ) {
                    alert( __( `Theme Activation failed, Please try again later.`, 'header-footer-elementor' ) );
                } else {
                    alert( __( `Plugin Activation failed, Please try again later.`, 'header-footer-elementor' ) );
                }
				spanElement.innerText = __( 'Activate', 'header-footer-elementor' );
			}
		} );
	};

    return (
        <Container align="center"
            className="bg-background-primary rounded-md shadow-sm"
            containerType="flex"
            direction="column"
            justify="between"
            gap="lg"
        >
            <div className='flex items-center justify-between w-full'>
                <div className='h-5 w-5'>
                    <img
                        src={icon}
                        alt="Recommended Plugins/Themes"
                        className="w-full  h-auto rounded"
                    />
                </div>

                <div className='flex items-center gap-x-2'>
                    {isFree && (
                        <Badge
                            label="Free"
                            size="xs"
                            type="pill"
                            variant="green"
                        />
                    )}
                        <Button
                            size="xs"
                            variant="link"
                            className="cursor-pointer"
                            onClick={handlePluginAction} // Trigger action on click
                            data-plugin={zipUrl}
                            data-type={type}
                            data-slug={slug} 
                            data-site={siteUrl}
                            data-init={path}
                            data-action={ getAction( status ) }
                            style={{ 
                                color: status === 'Activated' ? '#16A34A' : '#6005FF',
                                pointerEvents: status === 'Activated' ? 'none' : 'auto'
                            }}
                        >
                            { 'Installed' === status ? 'Activate' : status }
                        </Button>
                    </div>
            </div>

            <div className='flex flex-col w-full'>
                <p className='text-sm font-medium text-text-primary pb-1 m-0'>{name}</p>
                <p className='text-sm font-medium text-text-tertiary text-wrap m-0'>{desc}</p>
                {/* <div className='flex items-center justify-between w-full'>
                <p className='text-sm text-text-tertiary m-0'>{status}</p> */}
                        {/* <Tooltip
                    arrow
                    content={infoText}
                    placement="top"
                    title=""
                    triggers={[
                        'hover',
                        'focus'
                    ]}
                    variant="light"
                    width="100px"
                >
                    <InfoIcon className='h-5 w-5' />
                </Tooltip> */}

                {/* </div> */}
            </div>
        </Container>
    )
}

export default ExtendWebsiteWidget
