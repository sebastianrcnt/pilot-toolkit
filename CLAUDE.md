# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pilot Toolkit is a progressive web app (PWA) designed for pilots to quickly access rules of thumb and unit conversions relevant to aviation. It's built as a lightweight, offline-first single-page application optimized for mobile devices with enhanced iOS support. The app uses Tailwind CSS for styling and features a bottom navigation interface for easy one-handed use.

## Architecture

The application follows a simple multi-file structure:

### **app.js** - Core Application Logic
Contains all JavaScript functionality:
- **Theme management**: Light/dark theme toggle with localStorage persistence and system preference detection
  - Uses Tailwind's class-based dark mode (adds/removes `dark` class on `<html>` element)
  - Applies theme via `applyTheme()` function that updates both `data-theme` attribute and Tailwind's `dark` class
  - Updates theme toggle button emoji (🌙 for dark mode, ☀️ for light mode)
  - Dynamically updates meta theme-color for status bar appearance
- **i18n (Internationalization)**: Translation system supporting English and Korean with DOM elements marked with `data-i18n` attributes
  - `translations` object contains `en` and `ko` dictionaries
  - `applyLanguage()` function updates all elements with `data-i18n` attributes
  - Language preference stored in localStorage
- **Calculator modules**: Organized as setup functions for different features:
  - `setupConverters()`: Bidirectional unit converters (pressure, altitude, distance, fuel, temperature, speed, time)
  - `setupDescent()`: Descent planning calculator using rules of thumb
  - `setupTurns()`: Standard rate turn calculations
  - `setupWinds()`: Headwind/crosswind components and groundspeed estimation
  - `setupDensityAltitude()`: Density altitude approximation with performance impact
- **PWA features**: Service worker registration and install prompt handling

**Key pattern**: Most converters use event listeners for bidirectional input synchronization. When one input changes, others update automatically using conversion constants defined at the top of each calculator function.

### **index.html** - User Interface
Modern mobile-first HTML using Tailwind CSS utility classes:
- **Tailwind CSS**: Loaded via CDN (`https://cdn.tailwindcss.com`) with inline configuration for class-based dark mode
- **Sticky Header**: Contains app title, subtitle, theme toggle button, language selector, and install button
- **Section-based Navigation**: Content organized into five main sections, each with `.section` class:
  - `#section-converters`: Unit conversion tools (pressure, altitude, distance, fuel, temperature, speed, time)
  - `#section-descent`: Descent planning calculator
  - `#section-turns`: Standard rate turn calculator
  - `#section-winds`: Wind component and groundspeed calculators
  - `#section-density`: Density altitude calculator
- **Bottom Navigation Bar**: Fixed navigation with five buttons using `data-section` attributes:
  - 🔄 Converters
  - 📉 Descent
  - 🔁 Turns
  - 💨 Winds
  - 🔥 Density
- **iOS Optimizations**:
  - Viewport meta with `viewport-fit=cover` for safe area support
  - Apple-specific PWA meta tags (`apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style`, etc.)
  - Safe area insets for bottom navigation using `env(safe-area-inset-bottom)`
  - User selection disabled on body (except for inputs) to prevent accidental text selection
  - `inputmode="decimal"` on number inputs for optimal mobile keyboards
- **Inline Styles**: Two `<style>` blocks:
  1. In `<head>`: Section animations, result box styling, iOS touch optimizations
  2. Before `</body>`: Navigation button styles with active states and dark mode support
- **Inline JavaScript**: Section switching logic at bottom of file (before `</body>`)
- `data-i18n` attributes for all translatable text
- `data-lang` attributes on language toggle options
- Form input fields with specific `id` attributes that match JavaScript selectors

**Important**: When adding new features:
- Ensure input elements have unique IDs that match the JavaScript selectors (e.g., `#element-id`)
- Add translatable text using `data-i18n="keyName"` and update both `en` and `ko` dictionaries in app.js
- Use Tailwind utility classes for styling (e.g., `bg-gray-50 dark:bg-slate-800 rounded-2xl p-4`)
- If adding a new section, update the bottom navigation and section switching logic

### **styles.css** - Legacy CSS Variables (Mostly Unused)
**Note**: This file is largely deprecated after the Tailwind CSS migration. It contains:
- CSS custom properties originally used for theming (now handled by Tailwind)
- `:root` and `[data-theme="light"]` variable definitions for reference
- Original component class definitions (`.chip`, `.card`, `.field-row`, etc.) - no longer actively used

**Current styling approach**:
- Tailwind utility classes in HTML (e.g., `bg-white dark:bg-slate-950`)
- Inline `<style>` blocks in index.html for custom behaviors:
  - Section show/hide animations
  - Result box layout using `@apply` with Tailwind classes
  - Navigation button states
  - iOS-specific adjustments

### **sw.js** - Service Worker
Implements cache-first strategy for offline support:
- Caches core assets on install: HTML, CSS, JS, manifest, and icon files
- Cleans up old caches on activation
- Serves cached content first, falls back to network
- **Important**: Increment `CACHE_NAME` version (currently `"pilot-toolkit-v1"`) when making significant changes

### **manifest.webmanifest** - PWA Metadata
Defines app name, icons, theme colors, and display mode for installation on home screen.

## Common Development Tasks

### Adding a New Converter
1. Add translation keys to both `en` and `ko` objects in the `translations` object in app.js
2. Create HTML structure in the appropriate section in index.html:
   - Use Tailwind utility classes (e.g., `bg-gray-50 dark:bg-slate-800 rounded-2xl p-4`)
   - Wrap in a container div with spacing classes
   - Use `grid` layout for input fields (e.g., `grid grid-cols-2 gap-3`)
   - Add `data-i18n` attributes for labels
   - Use `inputmode="decimal"` on number inputs for mobile keyboards
3. Add a setup function in app.js that:
   - Gets element references by ID using `document.getElementById()`
   - Adds `input` event listeners to each input field
   - Uses `toNumber()` helper for parsing input values
   - Updates other fields or calls `setOutput()` for display
4. Call the setup function in the `DOMContentLoaded` event handler

### Adding a Calculator/Tool
Follow the same pattern as existing calculators (descent, turns, winds, density altitude):
1. Create a new section in index.html within `<main>`:
   - Add a `<section>` with `id="section-name"` and classes `section section-padding space-y-3`
   - Use card-style containers: `bg-gray-50 dark:bg-slate-800 rounded-2xl p-4 space-y-3`
   - Add input fields with unique IDs
   - Create result boxes using the `.result-box`, `.result-label`, and `.result-value` classes
2. Add a setup function in app.js that calculates results on input
3. Use helper functions:
   - `toNumber(value)`: Safely parses input to a finite number (returns `null` if invalid)
   - `setOutput(id, value, decimals)`: Updates output element with formatted value or "–" if null
4. Add translation keys for all labels, hints, and UI text
5. If creating a major new feature, consider adding it to the bottom navigation

### Updating Translations
Add/update keys in the `translations` object for both languages, then use the new key in `data-i18n` attributes in HTML.

### Theme/Styling Changes
The app now uses Tailwind CSS with class-based dark mode:
- Use Tailwind utility classes with dark mode variants: `bg-white dark:bg-slate-950`
- Common color patterns:
  - Background: `bg-white dark:bg-slate-950` (page), `bg-gray-50 dark:bg-slate-800` (cards)
  - Text: `text-gray-900 dark:text-gray-50` (primary), `text-gray-600 dark:text-gray-400` (secondary)
  - Borders: `border-gray-200 dark:border-slate-800`
  - Inputs: `bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600`
  - Accent: `text-blue-500` or `bg-blue-500`
- Theme is controlled by adding/removing `dark` class on `<html>` element
- For custom styles not covered by Tailwind, add to the inline `<style>` blocks in index.html

## Deployment Notes

- This is a static site; no build process required. Serve as-is via any static host.
- **External dependency**: Tailwind CSS loaded from CDN (`https://cdn.tailwindcss.com`)
- Service worker cache needs manual version bump in `sw.js` when assets change
- All user data (theme, language preference) is stored in localStorage
- The app works offline after first load (PWA with service worker caching)
- Optimized for mobile/touch devices with special iOS PWA support

## Testing Approach

Features can be tested manually by:
1. Opening index.html in a browser (preferably mobile view or responsive mode)
2. Testing navigation: Click each bottom nav button to verify section switching
3. Toggling theme and language to verify persistence across page reloads
4. Testing each converter/calculator with sample inputs in all sections
5. Inspecting localStorage to verify preference storage (`theme` and `lang` keys)
6. Testing offline mode in DevTools by going offline and refreshing
7. Testing on actual iOS device:
   - Add to home screen to test PWA experience
   - Verify safe area insets work correctly on devices with notches
   - Check that theme-color updates status bar correctly
8. Verifying mobile keyboard types appear correctly (`inputmode="decimal"` should show numeric keyboard)
