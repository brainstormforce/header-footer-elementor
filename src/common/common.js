// When the route changes, we need to update wp-admin's menu with the correct section & current link
window.wcfWpNavMenuChange = function ( path ) {
	const pageSlug = cartflows_admin.admin_base_slug;
	let pageUrl = '';
	if (
		'store-checkout' === path &&
		'' !== cartflows_admin.global_checkout_id
	) {
		pageUrl =
			'admin.php?page=' +
			pageSlug +
			'&path=store-checkout&action=wcf-edit-flow&flow_id=' +
			encodeURIComponent( cartflows_admin.global_checkout_id );
	} else {
		if ( 'store-checkout-library' === path ) {
			path = 'store-checkout';
		}
		pageUrl = path
			? 'admin.php?page=' +
			  pageSlug +
			  '&path=' +
			  encodeURIComponent( path )
			: 'admin.php?page=' + pageSlug;
	}

	const currentItemsSelector = `.wp-submenu-wrap li > a[href$="${ pageUrl }"]`;

	const currentItems = document.querySelectorAll( currentItemsSelector );

	/* Remove current */
	Array.from( document.getElementsByClassName( 'current' ) ).forEach(
		function ( item ) {
			if ( item.parentElement.classList.contains( 'wp-submenu' ) ) {
				item.classList.remove( 'current' );
			}
		}
	);

	/* Add current */
	Array.from( currentItems ).forEach( function ( item ) {
		item.parentElement.classList.add( 'current' );
	} );
};

window.wcfUnsavedChanges = false;

window.onbeforeunload = function () {
	if ( wcfUnsavedChanges ) {
		return 'Unsaved Changes';
	}
};

window.wcfCartflowsPro = function () {
	if ( cartflows_admin.is_pro ) {
		return true;
	}

	return false;
};

window.wcfCartflowsTypePro = function () {
	if ( cartflows_admin.is_pro && 'pro' === cartflows_admin.cf_pro_type ) {
		return true;
	}

	return false;
};

window.wcfCartflowsTypePlus = function () {
	if ( cartflows_admin.is_pro && 'plus' === cartflows_admin.cf_pro_type ) {
		return true;
	}

	return false;
};

window.wcfCartflowsTypeStarter = function () {
	if ( cartflows_admin.is_pro && 'starter' === cartflows_admin.cf_pro_type ) {
		return true;
	}

	return false;
};

window.wcfCartflowsTypePlusPro = function () {
	return wcfCartflowsTypePlus() || wcfCartflowsTypePro();
};

window.wcfInactiveProPlus = function () {
	const inactive_cf_plan = cartflows_admin.cf_pro_type_inactive;

	if (
		'inactive' === cartflows_admin.cf_pro_status &&
		[ 'CartFlows Pro', 'CartFlows Plus' ].includes( inactive_cf_plan )
	) {
		return true;
	}

	return false;
};

window.wcfInactivepluginType = function () {
	const inactive_cf_plan = cartflows_admin.cf_pro_type_inactive;

	let slug = '';

	switch ( inactive_cf_plan ) {
		case 'CartFlows Pro':
			slug = 'pro';
			break;

		case 'CartFlows Plus':
			slug = 'plus';
			break;

		case 'CartFlows Starter':
			slug = 'starter';
			break;
	}

	return slug;
};

window.getUpgradeToProUrl = function ( args = '' ) {
	let baseUrl =
		cartflows_admin?.cf_upgrade_to_pro_url ||
		cartflows_admin?.cf_domain_url;

	// Check if the URL has the '?' in the URL
	const hasQuestionMark = baseUrl.includes( '?' );

	if ( '' !== args ) {
		if ( hasQuestionMark ) {
			baseUrl += '&' + args;
		} else {
			baseUrl += '?' + args;
		}
	}

	// Return the fully modified URL
	return baseUrl;
};
