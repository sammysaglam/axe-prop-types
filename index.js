// ------------------------------------------------
// load original React prop-types
// ------------------------------------------------
var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
	Symbol.for &&
	Symbol.for('react.element')) ||
	0xeac7;

var isValidElement = function (object) {
	return typeof object === 'object' &&
		object !== null &&
		object.$$typeof === REACT_ELEMENT_TYPE;
};
var throwOnDirectAccess = true;
var PropTypes = require('../prop-types/factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
// ------------------------------------------------
// ------------------------------------------------
// ------------------------------------------------

var AxePropTypes = {};

// function to add key value pair to proptype
var enhancePropType = function (propType, values) {

	propType.info = Object.assign(
		propType.info ? propType.info : {},
		values
	);

	if (propType.isRequired) {
		propType.isRequired.info = Object.assign(
			propType.isRequired && propType.isRequired.info ? propType.isRequired.info : {},
			values
		);

		propType.isRequired.info.isRequired = true;
		propType.info.isRequired = false;
	}

	return propType;
};

// copy original PropTypes to AxePropTypes
Object.keys(PropTypes).forEach(function (propTypeName) {
	if (propTypeName === 'PropTypes') return false;
	AxePropTypes[propTypeName] = enhancePropType(PropTypes[propTypeName], { propTypeName: propTypeName });
});

// override "instanceOf"
AxePropTypes.instanceOf = function (jsClass) {
	return enhancePropType(PropTypes.instanceOf(jsClass), {
		className: jsClass && jsClass.name,
		propTypeName: 'instanceOf'
	});
};

// override "oneOf"
AxePropTypes.oneOf = function (allowedValues) {
	return enhancePropType(PropTypes.oneOf(allowedValues), {
		allowedValues: allowedValues,
		propTypeName: 'oneOf'
	});
};

// override "oneOfType"
AxePropTypes.oneOfType = function (allowedPropTypes) {
	return enhancePropType(PropTypes.oneOfType(allowedPropTypes), {
		allowedPropTypes: allowedPropTypes,
		propTypeName: 'oneOfType'
	});
};

// override "arrayOf"
AxePropTypes.arrayOf = function (allowedChildrenPropType) {
	return enhancePropType(PropTypes.arrayOf(allowedChildrenPropType), {
		allowedChildrenPropType: allowedChildrenPropType,
		propTypeName: 'arrayOf'
	});
};

// override "objectOf"
AxePropTypes.objectOf = function (allowedChildrenPropType) {
	return enhancePropType(PropTypes.objectOf(allowedChildrenPropType), {
		allowedChildrenPropType: allowedChildrenPropType,
		propTypeName: 'objectOf'
	});
};

// override "shape"
AxePropTypes.shape = function (objectShape) {
	return enhancePropType(PropTypes.shape(objectShape), {
		objectShape: objectShape,
		propTypeName: 'shape'
	});
};

// export
AxePropTypes.PropTypes = AxePropTypes;
module.exports = AxePropTypes;
