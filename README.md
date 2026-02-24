# CVALTIS System Setup & Admin

Vue 3 CDN–based frontend with **templates (HTML) and logic (JS) separated**.

## Root structure

- **assets/** – logos (`logo/`), design (`design/`)
- **backend/** – `main.php`, `essentials/`, `template/` (e.g. `home.php`, `dashboard.php`, `services/rpt.php`, `plugins/`)
- **frontend/**
  - **css/** – `main.scss` (compiles to `styles.css`), `template/` (e.g. `home.scss`, `dashboard.scss`, `plugins/`, `services/`)
  - **html/** – `core/` (e.g. `header.html`, `footer.html`), `template/` (e.g. `home.html`, `dashboard.html`, `system-setup.html`, `services/rpt.html`)
  - **js/** – `dependencies/` (Vue via CDN, `system-setup-auth.js`, `jquery.js`), `template/` (e.g. `home.js`, `dashboard.js`, `system-setup.js`, `services/rpt.js`)
- **index.php** – main entry (Vue CDN, loads templates from `frontend/html/template/`, app from `frontend/js/template/system-setup.js`)

## Build (Sass + Grunt)

Styles are written in **Sass** (SCSS) and compiled with **Grunt**.

### Setup

```bash
npm install
```

### Commands

| Command | Description |
|---------|-------------|
| `npm run build` or `grunt` | Compile SCSS → CSS (outputs `frontend/style/system-setup.css` and `system-admin.css`) |
| `npm run watch` or `grunt watch` | Watch `scss/**/*.scss` and recompile on change |

### Structure

- **frontend/css/main.scss** – imports `template/home.scss` and `template/dashboard.scss` (optional: point Grunt here to output `frontend/css/styles.css`)
- **scss/** – legacy SCSS; compiles to `frontend/style/` for use by `index.php`

Run the app via HTTP (e.g. `php -S localhost:8000` or your server) and open `index.php`. Templates are loaded from `frontend/html/template/`, JS from `frontend/js/template/`.
