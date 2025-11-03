# GitHub Copilot Presentation

A multilingual slideshow presentation system built with HTML, CSS, and JavaScript. Originally created for international students at Tækniskólinn (Technical School of Iceland).

## 📁 Project Structure

```
/
├── index.html          # Main HTML structure with slides
├── main.js            # Slideshow logic and language switching
├── translations.js    # Translation strings for all languages
├── styles.css         # Complete styling and animations
├── fonts/
│   └── Garuda.ttf    # Thai font support
└── images/
    └── image.png     # Project images
```

## 🌍 Supported Languages

The presentation supports 6 languages with full RTL (Right-to-Left) support:
- **Icelandic (is)** - Íslenska
- **English (en)**
- **Thai (th)** - ไทย
- **Persian (fa)** - فارسی (RTL)
- **Arabic (ar)** - العربية (RTL)
- **Ukrainian (uk)** - Українська

## 🎯 Key Features

### 1. **Multi-slide System**
- Slides are organized in `index.html` with the class `.slide`
- Only one slide is active at a time (`.slide.active`)
- Navigation via buttons or keyboard arrows (← →)

### 2. **Language System**
All translatable elements use the `data-i18n` attribute:
```html
<h1 data-i18n="welcomeTitle">Velkomin í fyrsta hópaverkefnið!!</h1>
```

The language is stored in `localStorage` and persists across sessions.

### 3. **RTL (Right-to-Left) Support**
Arabic and Persian automatically switch to RTL layout:
- Text direction changes
- Language selector moves to left side
- Navigation buttons flip order

### 4. **Font Support**
- Thai language uses custom Garuda font
- All other languages use system fonts with fallbacks

## 🔧 How It Works

### Slideshow Navigation (`main.js`)
```javascript
// Core variables
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

// Show slide by index
function showSlide(n) {
    // Removes .active from all slides
    // Adds .active to current slide
    // Updates slide counter
}

// Navigation functions
function nextSlide() { showSlide(currentSlide + 1); }
function prevSlide() { showSlide(currentSlide - 1); }
```

### Translation System
1. User selects language from dropdown
2. `updateLanguage(lang)` function is called
3. System looks up translations in `translations[lang]`
4. All elements with `data-i18n` attributes are updated
5. Language choice is saved to `localStorage`

### Adding New Content

**To add a new slide:**
1. Add slide HTML to `index.html`:
```html
<div class="slide">
    <div class="slide-content">
        <h1 data-i18n="myNewTitle">Default Text</h1>
        <p data-i18n="myNewContent">Default content</p>
    </div>
</div>
```

2. Add translations to `translations.js` for ALL languages:
```javascript
const translations = {
    is: {
        myNewTitle: "Íslenskur titill",
        myNewContent: "Íslenskt efni"
    },
    en: {
        myNewTitle: "English title",
        myNewContent: "English content"
    },
    // ... add for all 6 languages
};
```

## 🎨 Styling

### CSS Architecture
- **Global styles**: Base font, background gradients
- **Language-specific**: Thai font override, RTL support
- **Component styles**: Slides, cards, tables, forms
- **Animations**: Fade-in, slide-in effects
- **Responsive**: Mobile breakpoints at 768px

### Key CSS Classes
- `.slide` - Individual slide container
- `.slide.active` - Currently visible slide
- `.slide-content` - Centered content area
- `.group-card` - Colorful gradient cards
- `.navigation` - Bottom navigation bar
- `.language-selector` - Top-right language dropdown

### Color Scheme
- Primary: `#667eea` (purple-blue)
- Secondary: `#764ba2` (purple)
- Gradients used throughout for visual interest

## 🚀 Getting Started

1. **Open the presentation:**
   ```bash
   # Simply open index.html in a browser
   open index.html
   # or
   firefox index.html
   ```

2. **Navigate:**
   - Click "Áfram ›" (Next) or "‹ Til baka" (Back)
   - Use keyboard: `→` for next, `←` for previous

3. **Change language:**
   - Use dropdown in top-right corner
   - Selection persists on refresh

## 🛠️ Development Tips

### Testing Different Languages
```javascript
// In browser console:
updateLanguage('th'); // Switch to Thai
updateLanguage('ar'); // Switch to Arabic (RTL)
```

### Debugging
- Slide counter shows current position: `1 / 12`
- Check console for any translation key mismatches
- Verify `data-i18n` attributes match translation keys

### Performance
- All slides are loaded at once (suitable for small presentations)
- Images are loaded lazily by browser
- Translations are in one small JS object

## 📝 Original Content

This was a group project assignment presentation for international students, including:
- Group formation and member lists
- 4-day project schedule
- Detailed daily breakdowns
- Peer evaluation system explanation
- Presentation rubrics and criteria

## 🔄 Current Status

**Modified for GitHub Copilot presentation** - All original slides have been replaced with a single introductory slide for demonstrating GitHub Copilot.

## 📄 License

Open source project for educational purposes.

---

**Technical Notes:**
- No build process required - pure HTML/CSS/JS
- No external dependencies or frameworks
- Works offline once loaded
- Browser support: Modern browsers (ES6+)
