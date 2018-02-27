var PropTypes = require('../prop-types');

var AxePropTypes = {};

// function to add key value pair to proptype
var enhancePropType = function(propType, values) {

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
Object.keys(PropTypes).forEach(function(propTypeName) {
	if (propTypeName === 'PropTypes') return false;
	AxePropTypes[propTypeName] = enhancePropType(PropTypes[propTypeName], { propTypeName });
});

// override "instanceOf"
AxePropTypes.instanceOf = function(jsClass) {
	return enhancePropType(PropTypes.instanceOf(jsClass), {
		className: jsClass.name,
		propTypeName: 'instanceOf'
	});
};

// override "oneOf"
AxePropTypes.oneOf = function(allowedValues) {
	return enhancePropType(PropTypes.oneOf(allowedValues), {
		allowedValues,
		propTypeName: 'oneOf'
	});
};

// override "oneOfType"
AxePropTypes.oneOfType = function(allowedPropTypes) {
	return enhancePropType(PropTypes.oneOfType(allowedPropTypes), {
		allowedPropTypes,
		propTypeName: 'oneOfType'
	});
};

// override "arrayOf"
AxePropTypes.arrayOf = function(allowedChildrenPropType) {
	return enhancePropType(PropTypes.arrayOf(allowedChildrenPropType), {
		allowedChildrenPropType,
		propTypeName: 'arrayOf'
	});
};

// override "objectOf"
AxePropTypes.objectOf = function(allowedChildrenPropType) {
	return enhancePropType(PropTypes.objectOf(allowedChildrenPropType), {
		allowedChildrenPropType,
		propTypeName: 'objectOf'
	});
};

// override "shape"
AxePropTypes.shape = function(objectShape) {
	return enhancePropType(PropTypes.shape(objectShape), {
		objectShape,
		propTypeName: 'shape'
	});
};

// export
AxePropTypes.PropTypes = AxePropTypes;
module.exports = AxePropTypes;