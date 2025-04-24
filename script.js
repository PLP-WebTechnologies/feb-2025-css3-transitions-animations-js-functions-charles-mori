document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const savePrefsBtn = document.getElementById('savePrefs');
    const usernameInput = document.getElementById('username');
    const themeSelect = document.getElementById('theme');
    const animateBtn = document.getElementById('animateBtn');
    const resetBtn = document.getElementById('resetBtn');
    const animatedBox = document.getElementById('animatedBox');
    const hoverButtons = document.querySelectorAll('.hover-btn');
    const clickButtons = document.querySelectorAll('.click-btn');
    const greetingDisplay = document.getElementById('greeting');
    const displayUsername = document.getElementById('displayUsername');
    const displayTheme = document.getElementById('displayTheme');
    
    // Load saved preferences
    loadPreferences();
    
    // Save preferences to localStorage
    savePrefsBtn.addEventListener('click', function() {
        const preferences = {
            username: usernameInput.value.trim(),
            theme: themeSelect.value
        };
        
        if (!preferences.username) {
            alert('Please enter a username');
            return;
        }
        
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
        applyTheme(preferences.theme);
        updateGreeting(preferences.username, preferences.theme);
        
        // Trigger animations
        this.classList.add('bounce');
        greetingDisplay.classList.add('pulse');
        
        setTimeout(() => {
            this.classList.remove('bounce');
            greetingDisplay.classList.remove('pulse');
        }, 1000);
    });
    
    // Trigger animation
    animateBtn.addEventListener('click', function() {
        animatedBox.classList.add('animate');
        this.disabled = true;
        setTimeout(() => {
            this.disabled = false;
        }, 2000);
    });
    
    // Reset animation
    resetBtn.addEventListener('click', function() {
        animatedBox.classList.remove('animate');
    });
    
    // Add hover effects
    hoverButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add click effects
    clickButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.backgroundColor = '#555';
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 300);
        });
    });
    
    // Function to load preferences from localStorage
    function loadPreferences() {
        const savedPrefs = localStorage.getItem('userPreferences');
        
        if (savedPrefs) {
            const preferences = JSON.parse(savedPrefs);
            usernameInput.value = preferences.username;
            themeSelect.value = preferences.theme;
            applyTheme(preferences.theme);
            updateGreeting(preferences.username, preferences.theme);
        }
    }
    
    // Function to apply theme
    function applyTheme(theme) {
        document.body.className = theme;
    }
    
    // Function to update greeting display
    function updateGreeting(username, theme) {
        if (username) {
            displayUsername.textContent = username;
            
            // Add celebration effect for new saves
            displayUsername.classList.add('celebrate');
            setTimeout(() => {
                displayUsername.classList.remove('celebrate');
            }, 1000);
        } else {
            displayUsername.textContent = 'Guest';
        }
        
        // Update theme display with proper capitalization
        displayTheme.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
        displayTheme.className = ''; // Clear previous classes
        displayTheme.classList.add(theme); // Add theme class for styling
    }
    
    // Additional animation triggered by scrolling
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const container = document.querySelector('.container');
        
        if (scrollPosition > 100) {
            container.style.transform = 'scale(0.98)';
            container.style.transition = 'transform 0.3s ease';
        } else {
            container.style.transform = 'scale(1)';
        }
    });
});