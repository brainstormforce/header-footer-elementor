import React from 'react'
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

    const getAction = ( status ) => {
		if ( status === 'Activated' ) {
			return '';
		} else if ( status === 'Installed' ) {
			return 'hfe_recommended_plugin_activate';
		}
		return 'hfe_recommended_plugin_install';
	};

	const handlePluginAction = ( e ) => {
		const action = e.target.dataset.action;
		const formData = new window.FormData();
		switch ( action ) {
			case 'hfe_recommended_plugin_activate':
				activatePlugin( e );
				break;

			case 'hfe_recommended_plugin_install':
                if( 'theme' == e.target.dataset.type ) {
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
				formData.append( 'slug', e.target.dataset.slug );

				e.target.innerText = "Installing...";

				apiFetch( {
					url: hfe_admin_data.ajax_url,
					method: 'POST',
					body: formData,
				} ).then( ( data ) => {
					if ( data.success ) {
						e.target.innerText = "Installed";
                        activatePlugin( e );
					} else {
						e.target.innerText = __( 'Install', 'sureforms' );
                        if( 'theme' == e.target.dataset.type ) {
                            alert( __( `Theme Installation failed, Please try again later.`, 'sureforms' ) );
                        } else {
                            alert( __( `Plugin Installation failed, Please try again later.`, 'sureforms' ) );
                        }
						
					}
				} );
				break;

			default:
				// Do nothing.
				break;
		}
	};
	const activatePlugin = ( e ) => {

		const formData = new window.FormData();
		formData.append( 'action', 'hfe_recommended_plugin_activate' );
		formData.append( 'nonce', hfe_admin_data.nonce );
		formData.append( 'plugin', e.target.dataset.init );
		formData.append( 'type', e.target.dataset.type );
		formData.append( 'slug', e.target.dataset.slug );
		e.target.innerText = "Activating...";

		apiFetch( {
			url: hfe_admin_data.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( ( data ) => {
			if ( data.success ) {
				e.target.style.color = '#16A34A';
				e.target.innerText = "Activated";
			} else {
				if( 'theme' == e.target.dataset.type ) {
                    alert( __( `Theme Activation failed, Please try again later.`, 'sureforms' ) );
                } else {
                    alert( __( `Plugin Activation failed, Please try again later.`, 'sureforms' ) );
                }
				e.target.innerText = "Activate";
			}
		} );
	};

    return (
        <Container align="center"
            className="bg-background-primary p-4 rounded-md shadow-sm"
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
                        className="w-full h-auto rounded"
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
                        className="cursor-pointer text-link-primary"
                        onClick={handlePluginAction} // Trigger action on click
                        data-plugin={zipUrl}
                        data-type={type}
                        data-slug={slug} 
                        data-site={siteUrl}
                        data-init={path}
                        data-action={ getAction( status ) }
                        style={{ 
                            color: status === 'Activated' ? '#16A34A' : 'auto',
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
