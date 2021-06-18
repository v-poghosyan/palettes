### Tools and Libraries Used

[**Material-UI**](https://material-ui.com/) : React components that implement Google's Material Design

Setup & Import:

`npm install --save @material-ui/core`

`npm install --save @material-ui/icons`

`import Select from '@material-ui/core/Select' `

[**Chroma.js**](https://github.com/gka/chroma.js) : JS library for color manipulations

**Setup & Import:**

 `npm install --save chroma-js`

`import chroma from 'chroma-js'`

[**React-Color:**](https://casesandberg.github.io/react-color/) For the color picker

**Setup & Import:**

> *Note:* Used version *2.17.2* because UI was not updating in the latest version. In *package.json*, set exact version (and not `"^2.17.2"`).

`npm install --save react-color`

`import {ChromePicker} from 'react-color'`

[**Emoji-Mart**](https://github.com/missive/emoji-mart) : An emoji picker for React

[**RC-Slider:**](https://github.com/react-component/slider/) A slider component for the navbar

**Setup & Import:**

`npm install --save rc-slider`

`import Slider from 'rc-slider'`

`import 'rc-slider/assets/index.css'`

[**React-Sortable-HOC**](https://github.com/clauderic/react-sortable-hoc) : Drag and drop functionality

[**React-Copy-to-Clipboard**](https://www.npmjs.com/package/react-copy-to-clipboard) : Access to and manipulation of the user's clipboard

**Setup, Import and usage:**

1. Install using: `npm install --save react-copy-to-clipboard` 

2. Import component using: `import {CopyToClipboard} from 'react-copy-to-clipboard'`
3. Use the `<CopyToClipboard />` component to wrap the source component 
4. `<CopyToClipboard />` takes a `text` prop that's the source text. 
5. `<CopyToClipboard />` also takes a callback function `onCopy` that's fired during copying.

[**React-Form-Validator-Core**](https://www.npmjs.com/package/react-form-validator-core) : For form validation (making sure colors are unique, validating palette names, etc.)

**Setup & Import:**

`npm install --save react-material-ui-form-validator`

[**React-Transition-Group**](https://www.npmjs.com/package/react-transition-group) : Animating React components and transitions between routes

### Things I picked up from this project

**JSS** : Specifying CSS styles in JS, JSS scopes classes to the specific components they are defined in. These types of components automatically receive the JSS styles as part of their `props` through being exported, and are called *higher-order components (HOCs).* Another major advantage of JSS, other than the scoping of classes, is that it allows for dynamically computed styles. 

**Setup, Import and usage:**

1. `npm install @material-ui/styles` (*Note:* this is just one option out of many for implementing HOC's)

2. `import {withStyles} from '@material-ui/styles'`

3. When exporting a component's styles with JSS, wrap the export as follows: 

   `export default withStyles(styles)(MyComponent)`

   Where `styles` is an object whose keys act as CSS classes corresponding to object values containing key-value pairs of styles (*camelCased* instead of *kebab-cased* as in vanilla CSS).

   *For example:*

   ```jsx
   const styles = {
       myClass : {
           backgroundColor : white,
           textDecoration: none
       }
   }
   ```

   At initiation `MyComponent` receives `styles` as part of its `props`.
   If we `console.log()` `props`, we will see something like this:

   ```jsx
   Object
   	classes: { myClass: "MyComponent-myClass-17uslpf" }
   	__proto__: Object
   ```

   This means that the `props` contain an object consisting of the classes (in this case just `myClass`), each corresponding to a unique value (in this case `"MyComponent-myClass-17uslpf"`). This unique value is the class name that's being used under the hood instead of `myClass` to scope the class to this specific component.

   > Note: Inside the `styles` object, we have access to the component's `props`. So we can conditionally style based on the `props`.

4. We may also need the [nested](https://cssinjs.org/jss-plugin-nested?v=v10.6.0) plugin for JSS.

   **Installation:**

   `npm install jss`
   `npm inatall jss-plugin-nested`

   **Import:**

   ```jsx
   import nested from 'jss-plugin-nested';
   import jss from 'jss';
   
   jss.use(nested());
   ```

   This allows us to apply pseudo-classes to nested elements (e.g. .`element1:hover .element2 {...}`) and apply styles to an element with two or more classes using the highest specificity (e.g. `.element1.element2`).

