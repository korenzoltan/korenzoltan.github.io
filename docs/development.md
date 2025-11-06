# 📘 Development Guide (Gulp + ImageMagick)

## 🧩 Installation

### 1. Install npm packages

Run:

```bash
npm install
```

### 2. Make sure ImageMagick is installed

Check whether it’s available:

```bash
convert -version
```

If not found, install it (macOS + Homebrew):

```bash
brew install imagemagick
```

---

## ⚙️ npm Scripts

| Command         | Description                                  |
| --------------- | -------------------------------------------- |
| `npm run start` | Start development server with watch mode.    |
| `npm run build` | Build production-ready files.                |
| `npm run watch` | Watch for changes and rebuild automatically. |
| `npm run clean` | Delete `_site` folder.                       |

---

## ⚙️ Gulp Tasks

These are the actual Gulp tasks defined in your current `gulpfile.js`.

### 🧱 General

| Command      | Description                                                            |
| ------------ | ---------------------------------------------------------------------- |
| `gulp`       | Start local development server + watch (same as `npm run start`).      |
| `gulp build` | Clean, compile CSS & JS, and rebuild Jekyll (same as `npm run build`). |
| `gulp watch` | Watch files for changes and rebuild automatically.                     |

---

### 🎨 CSS

| Command             | Description                                                                    |
| ------------------- | ------------------------------------------------------------------------------ |
| `gulp vendor-css`   | Compile and minify vendor CSS (Bootstrap + PurgeCSS + Autoprefixer + cssnano). |
| `gulp fancybox-css` | Build and minify Fancybox CSS.                                                 |
| `gulp css`          | Compile `_sass/styles.scss` → `assets/css/main.min.css`.                       |
| `gulp clean-css`    | Delete all compiled CSS files from `assets/css`.                               |

---

### ⚡ JavaScript

| Command          | Description                                                                   |
| ---------------- | ----------------------------------------------------------------------------- |
| `gulp vendor-js` | Concatenate and minify vendor JS (jQuery + Bootstrap + Fancybox + lazysizes). |
| `gulp js`        | Concatenate and minify project JS partials → `assets/js/main.min.js`.         |

---

### 🖼️ Image Processing (ImageMagick based)

| Command                           | Description                                                         |
| --------------------------------- | ------------------------------------------------------------------- |
| `gulp image-home-tools`           | Resize all images in `assets/images/home/tools` (1366×768).         |
| `gulp image-home-tools-thumbnail` | Generate thumbnails (290×190) using ImageMagick.                    |
| `gulp image-promobike`            | Generate resized thumbnails (450 px) for `assets/images/promobike`. |
| `gulp image-promovan`             | Generate resized thumbnails (450 px) for `assets/images/promovan`.  |
| `gulp optimize-images`            | Run all the above image tasks + compress images via `imagemin`.     |
| `gulp clean-thumbnails`           | Delete the entire `assets/images/thumbnail` folder.                 |

🧩 **Note:**  
All `image-*` tasks use **ImageMagick’s** `convert` command internally.  
If you prefer **GraphicsMagick**, set `useImageMagick = false` in your `gulpfile.js`.

---

### 🧰 Formspark.io Integration

1. Register and create a form on [Formspark.io](https://formspark.io/).
2. Copy your form’s **action URL**.
3. Paste it into `_config.yml`:
   ```yaml
   formspark_contact_form_action_url: 'https://submit.formspark.io/YOUR_FORM_ID'
   ```
