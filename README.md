# GitHub Guide for Students

An interactive, multilingual educational guide teaching students how to create a GitHub account, use GitHub Copilot, and publish websites with GitHub Pages. Built with HTML, CSS, and JavaScript with a modern todo-list/modal interface.

## 📁 Project Structure

```
/
├── index.html          # Main HTML with todo-list and modal structure
├── main.js            # Modal interactions and language switching
├── translations.js    # Translation strings for all languages
├── styles.css         # Todo-list and modal styling
├── fonts/
│   └── Garuda.ttf    # Thai font support
└── images/
    ├── 1-2.png        # GitHub signup
    ├── 2-1.png        # GitHub Copilot page
    ├── 2-3b.png       # GitHub home page
    ├── 2-3c.png       # New repository button
    ├── 2-4b.png       # Codespaces
    ├── 2-7.png        # Keep and commit changes
    └── 2-9.png        # Repository URL
```

## 🌍 Supported Languages

The guide supports 7 languages with full RTL (Right-to-Left) support:
- **Icelandic (is)** - Íslenska
- **English (en)**
- **Estonian (et)** - Eesti
- **Thai (th)** - ไทย
- **Persian (fa)** - فارسی (RTL)
- **Arabic (ar)** - العربية (RTL)
- **Ukrainian (uk)** - Українська

## 🎯 Key Features

### 1. **Interactive Todo-List Interface**
- 13 clickable steps organized into 3 chapters
- Checkboxes to track progress (saved to `localStorage`)
- Click any step to open detailed instructions in a modal
- Modern, clean design with gradient backgrounds

### 2. **Modal System**
- Each step opens in a full-screen modal overlay
- Contains screenshots, step-by-step instructions, and clickable links
- Close via X button, outside click, or Escape key
- Smooth animations (fadeIn and slideUp effects)

### 3. **Language System**
All translatable elements use the `data-translate` attribute:
```html
<h1 data-translate="presentationTitle">GitHub leiðbeiningar fyrir nemendur</h1>
```

- Supports HTML content in translations (links, formatting)
- Language choice stored in `localStorage` and persists across sessions
- Instant language switching without page reload

### 4. **RTL (Right-to-Left) Support**
Arabic and Persian automatically switch to RTL layout:
- Text direction changes to right-to-left
- Maintains full functionality in RTL mode

### 5. **Progress Tracking**
- Checkbox states persist in browser storage
- Students can track completed steps
- Progress maintained across sessions

### 6. **Font Support**
- Thai language uses custom Garuda font
- All other languages use system fonts with fallbacks

## 🔧 How It Works

### Modal System (`main.js`)
```javascript
// Open modal when todo item is clicked
todoItems.forEach(item => {
    item.addEventListener('click', (e) => {
        const modalId = item.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        modal.classList.add('active');
    });
});

// Close modal (X button, outside click, Escape key)
// Save/load checkbox states to localStorage
```

### Translation System
1. User selects language from dropdown
2. `updateLanguage()` function is called
3. System looks up translations in `translations[currentLang]`
4. All elements with `data-translate` attributes are updated using `innerHTML` (supports HTML links)
5. Language choice is saved to `localStorage`
6. RTL direction applied for Arabic/Persian

## 📚 Content Structure

The guide is organized into 3 chapters:

### Chapter 1: Create GitHub Account (Steps 1.1-1.6)
- Navigate to GitHub and sign up
- Complete registration with email and password
- Verify account
- Access GitHub Student Developer Pack

### Chapter 2: Use GitHub Copilot (Steps 2.1-2.10)
- Access GitHub Copilot
- Choose free subscription
- Create a new repository
- Open Codespaces
- Use Copilot chat to create a website
- Save changes with commits
- Test the code
- Submit the assignment URL

### Chapter 3: Publish with GitHub Pages (Steps 3.1-3.3)
- Navigate to repository
- Enable GitHub Pages
- Wait for publication and access live site

### Adding New Content

**To add a new step:**
1. Add todo-item and modal HTML to `index.html`:
```html
<!-- Todo Item -->
<div class="todo-item" data-modal="modalNewStep">
    <div class="todo-checkbox">
        <input type="checkbox" id="stepNew">
        <label for="stepNew"></label>
    </div>
    <div class="todo-content">
        <span class="todo-text" data-translate="stepNewTitle">New Step</span>
    </div>
</div>

<!-- Modal -->
<div id="modalNewStep" class="modal">
    <div class="modal-dialog">
        <span class="close-modal">&times;</span>
        <div class="modal-body">
            <img src="images/new.png" alt="Description" class="modal-image">
            <h3 data-translate="stepNewTitle">New Step</h3>
            <p class="modal-text" data-translate="stepNewContent">Instructions...</p>
        </div>
    </div>
</div>
```

2. Add translations to `translations.js` for ALL 7 languages:
```javascript
const translations = {
    is: {
        stepNewTitle: "Nýtt skref",
        stepNewContent: "Leiðbeiningar á íslensku..."
    },
    en: {
        stepNewTitle: "New Step",
        stepNewContent: "Instructions in English..."
    },
    // ... add for all 7 languages (is, en, et, th, fa, ar, uk)
};
```

## 🎨 Styling

### CSS Architecture
- **Global styles**: Base font, gradient background
- **Language-specific**: Thai font override, RTL support
- **Component styles**: Todo containers, modals, checkboxes, resources
- **Animations**: fadeIn (modals), slideUp (modal dialogs)
- **Responsive**: Mobile breakpoints at 768px

### Key CSS Classes
- `.todo-container` - White container for todo items
- `.todo-item` - Individual clickable step with hover effects
- `.todo-checkbox` - Custom circular checkbox with checkmark
- `.modal` - Full-screen overlay (display: flex when `.active`)
- `.modal-dialog` - White content box with scroll
- `.modal-body` - Modal content area
- `.modal-image` - Screenshots in modals
- `.language-selector` - Fixed top-right language dropdown
- `.congrats-message` - Celebration box at the end

### Color Scheme
- Primary: `#667eea` (purple-blue)
- Secondary: `#764ba2` (purple)
- Background: Linear gradient (purple-blue)
- Containers: White with shadow
- Links/Buttons: Gradient backgrounds

## 🚀 Getting Started

### For Students:
1. **Open the guide:**
   ```bash
   # Simply open index.html in a browser
   open index.html
   # or start a local server
   python3 -m http.server 8000
   ```

2. **Use the guide:**
   - Select your language from the top-right dropdown
   - Click on any step to open detailed instructions
   - Check off steps as you complete them
   - Close modals with X, outside click, or Escape key

3. **Follow along:**
   - Each step includes screenshots and clear instructions
   - Links to GitHub, Student Developer Pack, etc. are clickable
   - Your progress is automatically saved

### For Developers:

1. **Local Development:**
   ```bash
   # Clone the repository
   git clone https://github.com/ellertsmari/UPPTGHCopilot.git
   cd UPPTGHCopilot
   
   # Open in browser or start server
   python3 -m http.server 8000
   ```

2. **File Structure:**
   - `index.html` - Main structure, add new steps here
   - `translations.js` - All text content in 7 languages
   - `main.js` - Modal and checkbox logic
   - `styles.css` - Visual styling
   - `images/` - Add screenshots named by chapter-step (e.g., `2-3.png`)

## 🛠️ Development Tips

### Testing Different Languages
```javascript
// In browser console:
localStorage.setItem('language', 'th'); // Set Thai
location.reload(); // Refresh to see changes

// Or use the dropdown and check all content
```

### Testing Modal Functionality
- Click todo items to open modals
- Test close methods (X, outside, Escape)
- Check checkbox persistence (check, reload, verify)
- Test on mobile (responsive breakpoints)

### Debugging
- Check browser console for errors
- Verify `data-translate` attributes match translation keys
- Ensure modal IDs match `data-modal` attributes
- Test RTL languages (Arabic, Persian) for layout issues

### Adding Images
- Name images by chapter-step: `1-2.png`, `2-3b.png`, etc.
- Use descriptive alt text
- Optimize images for web (compress if large)

### Performance
- All modals loaded at once (manageable for ~15 steps)
- Images loaded lazily by browser
- Translations in single JS object (~465 lines)
- No external dependencies or build process

## 🎓 Educational Use

This guide is designed for:
- **Students** learning GitHub for the first time
- **International classrooms** with diverse language needs
- **Technical schools** teaching web development
- **Self-paced learning** with progress tracking

### Key Learning Outcomes:
1. Create and verify a GitHub account
2. Access and use GitHub Copilot (free tier)
3. Create a repository and use Codespaces
4. Use AI assistance to build a simple website
5. Deploy a website with GitHub Pages
6. Submit work via repository URLs

## 🌟 Features for Educators

- **Progress Tracking**: Students' checkboxes save automatically
- **Visual Learning**: Screenshots guide every step
- **Multilingual**: Accommodate diverse classrooms (7 languages)
- **No Installation**: Works in any modern browser
- **Self-Paced**: Students work at their own speed
- **Accessible**: Clean, high-contrast design

## � External Resources

The guide includes links to:
- [GitHub](https://github.com/) - Main platform
- [GitHub Student Developer Pack](https://education.github.com/pack) - Free premium tools
- [GitHub Documentation](https://docs.github.com) - Official docs
- [GitHub Pages Guide](https://pages.github.com) - Publishing guide
- [Copilot Documentation](https://github.com/features/copilot) - AI assistant info

## 📄 License

Open source project for educational purposes. Created for Tækniskólinn (Technical School of Iceland) students.

## 🤝 Contributing

To add a new language:
1. Add language option to `index.html` language selector
2. Add complete translation object to `translations.js`
3. Test all steps and modals in the new language
4. Submit a pull request

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Contact: Tækniskólinn - Upplýsingatækni

---

**Technical Stack:**
- Pure HTML5/CSS3/JavaScript (ES6+)
- No frameworks or build tools required
- No external dependencies
- Works offline once loaded
- Modern browser support (Chrome, Firefox, Safari, Edge)

**Version:** 2.0 - Todo-list/Modal Interface  
**Last Updated:** November 2025
