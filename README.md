# axe-prop-types
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/sammysaglam/axe-prop-types/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/axe-prop-types.svg?style=flat)](https://www.npmjs.com/package/axe-prop-types)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

Same as React PropTypes, but allows you to read/extract inputted values during runtime (useful for automating component documentation).
No need to modify any existing code: just follow steps 1 & 2 of installation, and extract using `Component.propTypes`

```javascript
console.log(AnyComponent.propTypes.info);

// will output (for example):
{
    key: "color",
    propTypeName: "oneOf",
    isRequired: false,
    allowedValues:[
		"beige",
		"red",
		"green",
		"black",
		"white",
		"purple"
    ]
}
```

## Example
Extracting the prop-types of "BrowserRouter" component (from the famous React Router) will output the following object:
```javascript
{
    key: "basename",
    propTypeName: "string",
    isRequired: false
},
{
    key: "forceRefresh",
    propTypeName: "bool",
    isRequired: false
},
{
    key: "getUserConfirmation",
    propTypeName: "func",
    isRequired: false
},
{
    key: "keyLength",
    propTypeName: "number",
    isRequired: false
},
{
    key: "children",
    propTypeName: "node",
    isRequired: false
}
```

To achieve the above, follow installation step 1 & 2 below, and try the following code:
```javascript
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

const logPropTypes = ({propTypes}) => Object.keys(propTypes).forEach(key => console.log({
    key,
    ...propTypes[key].info
}));

// log the propType data
logPropTypes(BrowserRouter);
```

### Another example:
As you can see below, you can continue using the "prop-types" package; i.e. no need to modify existing code:
```javascript
import React from 'react';
import PropTypes from 'prop-types';

const YourComponent = () => <div>hello!</div>;

YourComponent.propTypes = {
    value: PropTypes.number.isRequired,
    someShape: PropTypes.shape({
        aString: PropTypes.string
    })
};

const logPropTypes = ({propTypes}) => Object.keys(propTypes).forEach(key => console.log({
    key,
    ...propTypes[key].info
}));

// log the propType data
logPropTypes(YourComponent);
```

## Installation
### Step 1: add dependency
```bash
npm install axe-prop-types --save
```

or if you  use yarn:

```bash
yarn add axe-prop-types
```


### Step 2: add to webpack config
Add to your webpack resolve configuration:
```javascript
resolve:{
    alias:{
        'prop-types$': path.join(__dirname, 'node_modules/axe-prop-types')
    }
}
```

#### example webpack.config.js:
```javascript
const path = require('path');

module.exports = {
    entry: './src/entry',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'app.js'
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
    },
    resolve: {
        alias: {
            'prop-types$': path.join(__dirname, 'node_modules/axe-prop-types')
        }
    }
};
```

## License
MIT