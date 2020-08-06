# Promogroup

### Install npm packages

Install the `npm` packages described in the `package.json`:

`npm install`

### npm scripts

These are the most useful commands defined in `package.json`:

- `npm run start` - Run development server in watch mode.
- `npm run build` - Build production files.
- `npm run watch` - Run in tests in watch mode.
- `npm run clean` - Delete `_site` folder.

### Other scripts

These are the other commands in `gulpfile.js`:

- `gulp` - Run development server in watch mode as `npm run start`.
- `gulp build` - Build production files as `npm run build`.
- `gulp watch` - Run in tests in watch mode as `npm run watch`.
- `gulp vendor-css` - Compile vendor CSS.
- `gulp vendor-js` - Compile vendor JS.
- `gulp vendor-clean` - Delete compiled vendor CSS and JS.
- `gulp fancybox-css` - Compile Fancybox CSS.
- `gulp fancybox-css-clean` - Delete compiled Fancybox CSS.
- `gulp css` - Compile CSS/SCSS partials to `main.min.css` file.
- `gulp css-clean` - Delete compiled `main.min.css` file.
- `gulp js` - Compile JS partials to `main.min.js` file.
- `gulp js-clean` - Delete compiled `main.min.js` file.
- `gulp imagegm` - Image manipulation with GraphicsMagick.
- `gulp imagegm-tools-thumbnail` - Generate thumbnails from images of tools.
- `gulp imagemin` - Minify images.

### Formspark.io

First you need to register this [link](https://formspark.io/) and create a form.

And you can give form's action in `_config.yml` file.

- `formspark_contact_form_action_url`: Action url of the form.
