function conditionsHelper() {
	const self = this;

	this.compare = function ( leftValue, rightValue, operator ) {
		switch ( operator ) {
			//Need to check specifc == condition.
			case '==':
				return leftValue == rightValue; // eslint-disable-line eqeqeq
			//Need to check specifc != condition.
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

	this.check = function ( conditions, current_ob ) {
		const isOrCondition = 'or' === conditions.relation;
		let conditionsResult = ! isOrCondition;

		conditions.fields.map( function ( field ) {
			let comparisonResult;

			if ( field.fields ) {
				comparisonResult = self.check( field, current_ob );
			} else {
				comparisonResult = self.compare(
					current_ob[ field.name ],
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

	this.isActiveControl = function ( control, current_ob ) {
		const conditions = control?.conditions ? control?.conditions : false;
		if ( conditions && ! self.check( conditions, current_ob ) ) {
			return false;
		}

		return true;
	};
}

export const conditions = new conditionsHelper();
