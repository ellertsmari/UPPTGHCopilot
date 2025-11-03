// Language management
let currentLang = localStorage.getItem('language') || 'is';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Set language selector
    const langSelect = document.getElementById('languageSelect');
    if (langSelect) {
        langSelect.value = currentLang;
        langSelect.addEventListener('change', (e) => {
            currentLang = e.target.value;
            localStorage.setItem('language', currentLang);
            updateLanguage();
        });
    }
    
    // Initial translation
    updateLanguage();
    
    // Setup modal handlers
    setupModals();
    
    // Load checkbox states
    loadCheckboxStates();
});

// Update all translatable elements
function updateLanguage() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLang] && translations[currentLang][key]) {
            // Use innerHTML to support HTML links in translations
            element.innerHTML = translations[currentLang][key];
        }
    });
    
    // Update HTML direction for RTL languages
    if (currentLang === 'ar' || currentLang === 'fa') {
        document.documentElement.dir = 'rtl';
    } else {
        document.documentElement.dir = 'ltr';
    }
}

// Modal functionality
function setupModals() {
    const todoItems = document.querySelectorAll('.todo-item');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Add scroll indicators to all modals and track if user has seen all content
    modals.forEach(modal => {
        const modalDialog = modal.querySelector('.modal-dialog');
        if (modalDialog && !modalDialog.querySelector('.scroll-indicator')) {
            // Track if user has scrolled to bottom at least once
            let hasScrolledToBottom = false;
            
            const scrollIndicator = document.createElement('div');
            scrollIndicator.className = 'scroll-indicator';
            scrollIndicator.title = 'Scroll down';
            modalDialog.appendChild(scrollIndicator);
            
            // Store the tracking state on the modal for access during close
            modalDialog.dataset.hasSeenAll = 'false';
            
            // Handle scroll indicator click
            scrollIndicator.addEventListener('click', () => {
                modalDialog.scrollBy({
                    top: 300,
                    behavior: 'smooth'
                });
            });
            
            // Check if modal is scrollable and update indicator visibility
            const checkScroll = () => {
                const hasScroll = modalDialog.scrollHeight > modalDialog.clientHeight;
                const isAtBottom = modalDialog.scrollHeight - modalDialog.scrollTop <= modalDialog.clientHeight + 50;
                
                // Mark as seen if user scrolled to bottom
                if (isAtBottom && hasScroll) {
                    hasScrolledToBottom = true;
                    modalDialog.dataset.hasSeenAll = 'true';
                }
                
                if (hasScroll && !isAtBottom) {
                    scrollIndicator.classList.add('visible');
                } else {
                    scrollIndicator.classList.remove('visible');
                }
            };
            
            // Check on scroll
            modalDialog.addEventListener('scroll', checkScroll);
            
            // Check when modal opens and reset tracking
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        if (modal.classList.contains('active')) {
                            // Reset tracking when modal opens
                            hasScrolledToBottom = false;
                            modalDialog.dataset.hasSeenAll = 'false';
                            setTimeout(checkScroll, 100); // Small delay to ensure layout is complete
                        }
                    }
                });
            });
            observer.observe(modal, { attributes: true });
        }
    });
    
    // Open modal on todo item click
    todoItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Don't open modal if checkbox was clicked
            if (e.target.type === 'checkbox' || e.target.tagName === 'LABEL') {
                return;
            }
            
            const modalId = item.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
            }
        });
    });
    
    // Function to check if user has scrolled to bottom at any point
    const hasSeenAllContent = (modalDialog) => {
        const isScrollable = modalDialog.scrollHeight > modalDialog.clientHeight;
        const hasSeenAll = modalDialog.dataset.hasSeenAll === 'true';
        return !isScrollable || hasSeenAll;
    };
    
    // Function to show warning when closing without seeing all content
    const tryCloseModal = (modal) => {
        const modalDialog = modal.querySelector('.modal-dialog');
        
        if (!hasSeenAllContent(modalDialog)) {
            // Show warning
            const scrollIndicator = modalDialog.querySelector('.scroll-indicator');
            if (scrollIndicator) {
                scrollIndicator.classList.add('pulse-attention');
                setTimeout(() => scrollIndicator.classList.remove('pulse-attention'), 2000);
            }
            
            // Show warning message
            let warningDiv = modalDialog.querySelector('.scroll-warning');
            
            // Get translated text (always get fresh translations)
            const warningText = translations[currentLang]?.scrollWarning || "⚠️ You haven't seen all the content yet!";
            const continueText = translations[currentLang]?.warningContinue || "Continue Reading";
            const closeText = translations[currentLang]?.warningClose || "Close Anyway";
            
            if (!warningDiv) {
                warningDiv = document.createElement('div');
                warningDiv.className = 'scroll-warning';
                warningDiv.innerHTML = `
                    <div class="scroll-warning-content">
                        <p class="warning-text">${warningText}</p>
                        <div class="scroll-warning-buttons">
                            <button class="warning-continue">${continueText}</button>
                            <button class="warning-close">${closeText}</button>
                        </div>
                    </div>
                `;
                modalDialog.appendChild(warningDiv);
                
                // Handle continue button
                warningDiv.querySelector('.warning-continue').addEventListener('click', () => {
                    warningDiv.classList.remove('visible');
                    modalDialog.scrollBy({
                        top: 300,
                        behavior: 'smooth'
                    });
                });
                
                // Handle close anyway button
                warningDiv.querySelector('.warning-close').addEventListener('click', () => {
                    warningDiv.classList.remove('visible');
                    modal.classList.remove('active');
                });
            } else {
                // Update text with current language translations
                const warningTextElement = warningDiv.querySelector('.warning-text');
                const continueButton = warningDiv.querySelector('.warning-continue');
                const closeButton = warningDiv.querySelector('.warning-close');
                
                if (warningTextElement) warningTextElement.textContent = warningText;
                if (continueButton) continueButton.textContent = continueText;
                if (closeButton) closeButton.textContent = closeText;
            }
            
            warningDiv.classList.add('visible');
            return false;
        }
        
        modal.classList.remove('active');
        return true;
    };
    
    // Close modal on X button click
    closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const modal = btn.closest('.modal');
            if (modal) {
                tryCloseModal(modal);
            }
        });
    });
    
    // Close modal on outside click
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                tryCloseModal(modal);
            }
        });
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                tryCloseModal(activeModal);
            }
        }
    });
    
    // Setup checkboxes
    setupCheckboxes();
}

// Checkbox functionality
function setupCheckboxes() {
    const checkboxes = document.querySelectorAll('.todo-checkbox input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            saveCheckboxStates();
            e.stopPropagation(); // Prevent modal from opening
        });
    });
}

// Save checkbox states to localStorage
function saveCheckboxStates() {
    const checkboxes = document.querySelectorAll('.todo-checkbox input[type="checkbox"]');
    const states = {};
    
    checkboxes.forEach(checkbox => {
        states[checkbox.id] = checkbox.checked;
    });
    
    localStorage.setItem('checkboxStates', JSON.stringify(states));
}

// Load checkbox states from localStorage
function loadCheckboxStates() {
    const savedStates = localStorage.getItem('checkboxStates');
    
    if (savedStates) {
        const states = JSON.parse(savedStates);
        
        Object.keys(states).forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.checked = states[id];
            }
        });
    }
}

// Matrix Background Animation
(function() {
    const canvas = document.getElementById('matrix-bg');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Binary characters (0 and 1)
    const binary = '01';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    
    // Array to store y position of each column
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100; // Start at random positions above screen
    }
    
    // Draw the matrix
    function drawMatrix() {
        // Fade effect - creates the trail
        ctx.fillStyle = 'rgba(13, 2, 8, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set text style
        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px monospace';
        
        // Draw the binary characters
        for (let i = 0; i < drops.length; i++) {
            // Random 0 or 1
            const text = binary[Math.floor(Math.random() * binary.length)];
            
            // Draw the character
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Reset drop to top randomly after it has crossed the screen
            // or randomly to create varying lengths
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // Move drop down
            drops[i]++;
        }
    }
    
    // Animate at 30fps (slower = less distracting)
    setInterval(drawMatrix, 50);
    
    // Resize canvas on window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Recalculate columns
        const newColumns = canvas.width / fontSize;
        drops.length = newColumns;
        for (let i = 0; i < newColumns; i++) {
            if (drops[i] === undefined) {
                drops[i] = Math.random() * -100;
            }
        }
    });
})();
