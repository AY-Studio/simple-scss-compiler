const chokidar = require('chokidar');
const fs = require('fs-extra');
const sass = require('node-sass');
const cleanCss = require('clean-css');

const inputPath = 'src/scss/main.scss';
const outputPath = 'dist/css/main.css';
const sourceMapPath = 'dist/css/main.css.map';
const jsSourcePath = 'src/js';
const jsOutputPath = 'dist/js';
const imagesSourcePath = 'src/images';
const imagesOutputPath = 'dist/images';

// Function to compile Sass
const compileSass = () => {
    sass.render(
        {
            file: inputPath,
            outFile: outputPath,
            outputStyle: 'expanded',
            sourceMap: true,
        },
        (sassError, result) => {
            if (!sassError) {
                fs.writeFile(outputPath, result.css, (writeError) => {
                    if (!writeError) {
                        console.log(`Sass compiled successfully. Output: ${outputPath}`);
                        fs.writeFile(sourceMapPath, result.map, (mapWriteError) => {
                            if (!mapWriteError) {
                                console.log(`Source map generated successfully. Output: ${sourceMapPath}`);
                            } else {
                                console.error('Error writing source map file:', mapWriteError);
                            }
                        });

                        // Minify CSS
                        const minifiedCss = new cleanCss().minify(result.css).styles;
                        fs.writeFile(outputPath, minifiedCss, (minifyError) => {
                            if (!minifyError) {
                                console.log('CSS minified successfully.');
                            } else {
                                console.error('Error minifying CSS:', minifyError);
                            }
                        });
                    } else {
                        console.error('Error writing CSS file:', writeError);
                    }
                });
            } else {
                console.error('Error compiling Sass:', sassError);
            }
        }
    );
};

// Function to copy JS files
const copyJs = () => {
    fs.copy(jsSourcePath, jsOutputPath)
        .then(() => console.log(`JavaScript files copied to ${jsOutputPath}`))
        .catch((err) => console.error('Error copying JavaScript files:', err));
};

// Function to copy images
const copyImages = () => {
    fs.copy(imagesSourcePath, imagesOutputPath)
        .then(() => console.log(`Images copied to ${imagesOutputPath}`))
        .catch((err) => console.error('Error copying images:', err));
};

// Initial compilation, copying, and image copying
compileSass();
copyJs();
copyImages();

// Watch for changes in Sass, JS, and image files
chokidar.watch([
    inputPath,
    `${jsSourcePath}/**/*.js`,
    `${imagesSourcePath}/**/*.{jpg,png}`,
]).on('all', (event, path) => {
    console.log(`File ${path} changed. Recompiling...`);

    if (path.endsWith('.scss')) {
        compileSass();
    } else if (path.endsWith('.js')) {
        copyJs();
    } else if (path.endsWith('.jpg') || path.endsWith('.png')) {
        copyImages();
    }
});