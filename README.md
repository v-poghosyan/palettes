### 📄 About

Palettes is an app that facilitates the creation, management, and access of color palettes for your next design project. Simply add colors using the built-in color picker or generate random ones. Use the drag and drop functionality to rearrange the order of the colors. Once your palette is ready, save it by giving it a name and a descriptive emoji. To access the colors in your palette all you have to do is adjust the lightness level of the colors, and click on a color box to copy its HEX, RGB, or RGBA values.

### 🕹️ Demo



### 💻 How to use

Palettes is published on Github Pages at the following [link](https://v-poghosyan.github.io/palettes/). 

If you wish to run Palettes locally instead follow these steps:
1. Clone the project: `git clone https://github.com/v-poghosyan/palettes.git`
2. Go to the project folder: `cd palettes`;
3. Download the dependencies: `npm install`;
4. Start the application: `npm start`.

### 🔧 Tools and libraries used

[**Material-UI**](https://material-ui.com/) : React components that implement Google's Material Design


[**Chroma.js**](https://github.com/gka/chroma.js) : JS library for color manipulations


[**React-Color:**](https://casesandberg.github.io/react-color/) For the color picker

[**Emoji-Mart**](https://github.com/missive/emoji-mart) : An emoji picker for React

[**RC-Slider:**](https://github.com/react-component/slider/) A slider component for the navbar

[**React-Sortable-HOC**](https://github.com/clauderic/react-sortable-hoc) : Drag and drop functionality

[**React-Copy-to-Clipboard**](https://www.npmjs.com/package/react-copy-to-clipboard) : Access to and manipulation of the user's clipboard


[**React-Form-Validator-Core**](https://www.npmjs.com/package/react-form-validator-core) : For form validation (making sure colors are unique, validating palette names, etc.)

[**React-Transition-Group**](https://www.npmjs.com/package/react-transition-group) : Animating React components and transitions between routes

[**GH-Pages**](https://www.npmjs.com/package/gh-pages) : Deploying react apps to Github Pages

### 💡 What I learned from this project

**JSS** 
**Overview** : Specifying CSS styles in JS, JSS scopes classes to the specific components they are defined in. These types of components automatically receive the JSS styles as part of their `props` through being exported *with styles* as *higher-order components (HOCs).* Another major advantage of JSS, other than the scoping of classes, is that it allows for dynamically computed styles based on the component's `props`. 

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
