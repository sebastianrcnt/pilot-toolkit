# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pilot Toolkit is a progressive web app (PWA) designed for pilots to quickly access rules of thumb and unit conversions relevant to aviation. It's built as a lightweight, offline-first single-page application with no external dependencies.

## Architecture

The application follows a simple three-file structure:

### **app.js** - Core Application Logic
Contains all JavaScript functionality:
- **Theme management**: Light/dark theme toggle with localStorage persistence and system preference detection
- **i18n (Internationalization)**: Translation system supporting English and Korean with DOM elements marked with `data-i18n` attributes
- **Calculator modules**: Organized as setup functions for different features:
  - `setupConverters()`: Bidirectional unit converters (pressure, altitude, distance, fuel, temperature, speed, time)
  - `setupDescent()`: Descent planning calculator using rules of thumb
  - `setupTurns()`: Standard rate turn calculations
  - `setupWinds()`: Headwind/crosswind components and groundspeed estimation
  - `setupDensityAltitude()`: Density altitude approximation with performance impact
- **PWA features**: Service worker registration and install prompt handling

**Key pattern**: Most converters use event listeners for bidirectional input synchronization. When one input changes, others update automatically using conversion constants defined at the top of each calculator function.

### **index.html** - User Interface
Semantic HTML with:
- `data-i18n` attributes for all translatable text
- `data-lang` attributes on language toggle options
- Form input fields with specific `id` attributes that match JavaScript selectors
- Sections for each calculator/converter feature
- Hidden install button that shows only when PWA install prompt is available

**Important**: When adding new features, ensure input elements have unique IDs that match the JavaScript selectors (e.g., `#element-id`), and translatable text uses `data-i18n="keyName"`.

### **styles.css** - Theme-Based Styling
CSS variables for theming:
- Dark theme (default): `--bg: #050509`, accent blue `#4f8dff`
- Light theme: `--bg: #f4f4f8`, accent blue `#2965ff`
- Controlled via `[data-theme="light/dark"]` on HTML element
- Components use BEM-like class naming (`.chip`, `.card`, `.field-row`, etc.)

### **sw.js** - Service Worker
Implements cache-first strategy for offline support. Updates `CACHE_NAME` version when assets change.

### **manifest.webmanifest** - PWA Metadata
Defines app name, icons, and display mode for installation.

## Common Development Tasks

### Adding a New Converter
1. Add translation keys to both `en` and `ko` objects in `translations`
2. Create HTML structure in index.html with unique input IDs
3. Add a setup function in app.js that:
   - Gets element references by ID
   - Adds `input` event listeners
   - Uses `toNumber()` for parsing and `setOutput()` for display
4. Call the setup function in the DOMContentLoaded handler

### Adding a Calculator/Tool
Follow the same pattern as existing calculators (descent, turns, winds, density altitude). Use helper functions:
- `toNumber(value)`: Safely parses input to a finite number
- `setOutput(id, value, decimals)`: Updates output element with formatted value or "–" if null

### Updating Translations
Add/update keys in the `translations` object for both languages, then use the new key in `data-i18n` attributes in HTML.

### Theme/Styling Changes
Modify CSS custom properties in `:root` and `[data-theme="light"]` rules. All color values should use variables to maintain theme consistency.

## Deployment Notes

- This is a static site; no build process required. Serve as-is via any static host.
- Service worker cache needs manual version bump in `sw.js` when assets change
- All user data (theme, language preference) is stored in localStorage
- No external APIs or dependencies—fully self-contained

## Testing Approach

Features can be tested manually by:
1. Opening index.html in a browser
2. Toggling theme and language to verify persistence
3. Testing each converter/calculator with sample inputs
4. Inspecting localStorage to verify preference storage
5. Testing offline mode in DevTools by going offline and refreshing
