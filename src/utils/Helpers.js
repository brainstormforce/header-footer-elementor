const admin_slug = cartflows_admin.admin_base_slug;
const admin_url = cartflows_admin.admin_base_url;
import { decode } from 'html-entities';

export function getAdminPageBase() {
	const admin_page_base = `${ admin_url }?page=${ admin_slug }`;

	return admin_page_base;
}

export function getEditPostLink( post_id ) {
	const edit_url = `${ admin_url }post.php?post=${ post_id }&action=edit`;

	return edit_url;
}

export function getEditFlowLink( flow_id = false ) {
	let admin_page_base = '#';

	if ( flow_id ) {
		admin_page_base = getAdminPageBase();
	}

	return admin_page_base;
}

export function validateTitleField( title, max_length, display_length ) {
	const validatedTitle =
		title.length > max_length
			? title.substring( 0, display_length ) + '...'
			: title;
	return decode( validatedTitle );
}

function conditionsHelper() {
	const self = this;

	this.compare = function ( leftValue, rightValue, operator ) {
		switch ( operator ) {
			//Need to check  specifc == condition.
			case '==':
				return leftValue == rightValue; // eslint-disable-line eqeqeq
			//Need to check  specifc != condition.
			case '!=':
				return leftValue != rightValue; // eslint-disable-line eqeqeq
			case '!==':
				return leftValue !== rightValue;
			case 'in':
				return -1 !== rightValue.indexOf( leftValue );
			case '!in':
				return -1 === rightValue.indexOf( leftValue );
			case 'contains':
				return -1 !== leftValue.indexOf( rightValue );
			case '!contains':
				return -1 === leftValue.indexOf( rightValue );
			case '<':
				return leftValue < rightValue;
			case '<=':
				return leftValue <= rightValue;
			case '>':
				return leftValue > rightValue;
			case '>=':
				return leftValue >= rightValue;
			default:
				return leftValue === rightValue;
		}
	};

	this.check = function ( conditions, options ) {
		const isOrCondition = 'or' === conditions.relation;
		let conditionsResult = ! isOrCondition;

		conditions.fields.map( function ( field ) {
			let comparisonResult;

			if ( field.fields ) {
				comparisonResult = self.check( field, options );
			} else {
				comparisonResult = self.compare(
					options[ field.name ],
					field.value,
					field.operator
				);
			}

			if ( isOrCondition ) {
				if ( comparisonResult ) {
					conditionsResult = true;
				}
				return ! comparisonResult;
			}

			if ( ! comparisonResult ) {
				return ( conditionsResult = false );
			}
			return '';
		} );

		return conditionsResult;
	};

	this.isActiveControl = function ( control, options ) {
		const conditions = control?.conditions ? control?.conditions : false;

		if ( conditions && ! self.check( conditions, options ) ) {
			return false;
		}

		return true;
	};
}

export const conditions = new conditionsHelper();
