const { useContext } = wp.element;
import { RouterContext, history } from './context';
import classNames from 'classnames';
import { match } from 'path-to-regexp';

export function Link( props ) {
	const { to, onClick, children, activeClassName } = props;
	const { route } = useContext( RouterContext );

	const state = { ...props };
	delete state.activeClassName;

	const isActive = () => {
		const checkMatch = match( `${ to }` );
		return checkMatch( `${ route.hash.substr( 1 ) }` );
	};

	const handleClick = ( e ) => {
		e.preventDefault();

		if ( route.path === to && ! e.target.classList.contains( 'hfe-user-icon' ) ) {
			return;
		}
		// Trigger onClick prop manually.
		if ( onClick ) {
			onClick( e );
		}

		if ( to === 'elementor-hf' && hfeSettingsData.header_footer_builder ) {
			window.location.href = hfeSettingsData.header_footer_builder;
			return;
		}

		const { search } = history.location;
		const expectedPage = 'admin.php?page=hfe';
		const currentHash = window.location.hash;

		// Verify if the current URL is as expected
		if ( ! search.includes( expectedPage ) || ! currentHash.includes( to ) ) {
			// Redirect to the expected URL
			window.location.href = `${ hfeSettingsData.hfe_settings_url }#${ to }`;
			return;
		}

		if ( ! to.includes( 'settings' ) ) {
			// Remove &tab from the URL.
			const newSearch = search.replace( /&tab=[^&]*/, '' );
			// Use history API to navigate page.
			history.push( `${ newSearch }#${ to }` );
		} else {
			const changeSearch = search + '&tab=1';

			if ( e.target.classList.contains( 'hfe-user-icon' ) && window.location.hash.includes( 'settings' ) ) {
				window.location.href = `${ changeSearch }#${ to }`;
			} else {
				// Use history API to navigate page.
				history.push( `${ search }#${ to }` );
			}
		}
	};

	return (
		<a
			{ ...state }
			className={ classNames( { [ activeClassName ]: isActive() }, props.className ) }
			onClick={ handleClick }
		>
			{ children }
		</a>
	);
}
