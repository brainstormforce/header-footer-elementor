import apiFetch from '@wordpress/api-fetch';

export const activate_plugin = ( plugin, reload = true ) => {
	return new Promise( ( resolve, reject ) => {
		// Activating plugin.
		const formData = new window.FormData();
		formData.append( 'action', 'cartflows_activate_plugin' );
		formData.append( 'init', plugin.init );
		formData.append( 'security', cartflows_admin.activate_plugin_nonce );

		apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( ( response ) => {
			console.log( 'Helper.js', response );
			if ( response.success ) {
				resolve( response );

				//  Reload the page if required on the basis of option.
				if ( reload ) {
					window.location.reload();
				}
			} else {
				reject( response );
			}
		} );
	} );
};

export const install_plugin = ( plugin ) => {
	return new Promise( ( resolve, reject ) => {
		console.log( 'plugin.slug', plugin.slug );
		// @see /wp-admin/js/updates.js
		wp.updates.queue.push( {
			action: 'install-plugin', // Required action.
			data: {
				slug: plugin.slug,
				init: plugin.init,
				name: plugin.name,
				success( response ) {
					console.log(
						'Installed Successfully! Activating plugin ',
						plugin.slug
					);
					resolve( response, plugin );
				},
				error( response ) {
					reject( response, plugin );
				},
			},
		} );

		// Required to set queue.
		wp.updates.queueChecker();
	} );
};
