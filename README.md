# Install
npm install

# Commands
npm run watch
npm run compile-scss // One off compile

# Modifying scss input/output paths
Edit the compile-scss.js file in your theme root:
const inputPath = 'src/scss/main.scss';
const outputPath = 'assets/css/style.css';
const sourceMapPath = 'assets/css/style.css.map'; // Specify the path for the source map

# Where do I work with SCSS
src/scss is the main folder and the master file is main.scss.
All files that are added should be prefixed with _ e.g. _myfile.scss and included in the main.scss file.

# How do I work with JS
src/js in the main javascript folder, everything added to this folder will be output to dist/js as a direct copy.

# How do I work with images
src/images in the images folder, everything added to this folder will be output to dist/images as a direct copy.

## TODO
- Minify js
- Optimise Images