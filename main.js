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
            element.textContent = translations[currentLang][key];
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
    
    // Close modal on X button click
    closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const modal = btn.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    // Close modal on outside click
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                activeModal.classList.remove('active');
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
