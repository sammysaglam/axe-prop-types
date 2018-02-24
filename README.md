# axe-prop-types
Same as React PropTypes, but allows you to read/extract inputted values during runtime (useful for automating component documentation).
No need to modify any existing code: just follow steps 1 & 2 of installation, and extract!

> Requirements:
> - Webpack

## Example
Extracting the prop-types of "BrowserRouter" component (from the famous React Router) will output the following object:
```javascript
{
    basename: {
        isRequired: false,
        propTypeName: "string"
    },
    forceRefresh: {
        isRequired: false,
        propTypeName: "bool"
    },
    getUserConfirmation: {
        isRequired: false,
        propTypeName: "func"
    },
    getUserConfirmation: {
        isRequired: false,
        propTypeName: "func"
    },
    keyLength: {
        isRequired: false,
        propTypeName: "number"
    },
    children: {
        isRequired: false
        propTypeName: "node"
    }
}
```

To achieve the above, try the following code:
```javascript
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

const forEachPropType = (propTypesObject, callback) => Object.keys(propTypesObject).forEach(key => callback({
    key,
    propType: propTypesObject[key]
}));

// log the extracted propType data
forEachPropType(BrowserRouter.propTypes, ({ key, propType }) => {
    console.log(
        key,
        propType.info
    );
});
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

const forEachPropType = (propTypesObject, callback) => Object.keys(propTypesObject).forEach(key => callback({
    key,
    propType: propTypesObject[key]
}));

// log the extracted propType data
forEachPropType(YourComponent.propTypes, ({ key, propType }) => {
    console.log(
        key,
        propType.info
    );
});
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
        path: path.resolve(__dirname, 'build'),
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