// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        const hamburger = navToggle.querySelector('.hamburger');
        if (navMenu.classList.contains('active')) {
            hamburger.style.background = 'transparent';
            hamburger.style.transform = 'rotate(45deg)';
        } else {
            hamburger.style.background = 'white';
            hamburger.style.transform = 'rotate(0)';
        }
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Copy to Clipboard Functionality
document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', async function() {
        const codeBlock = this.closest('.code-block').querySelector('code');
        const text = codeBlock.innerText;
        
        try {
            await navigator.clipboard.writeText(text);
            
            // Visual feedback
            const originalText = this.innerHTML;
            this.innerHTML = '✓ Copied!';
            this.classList.add('copied');
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.classList.remove('copied');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
            this.innerHTML = '✗ Failed';
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 2000);
        }
    });
});

// Collapsible Sections
document.querySelectorAll('.collapsible-header').forEach(header => {
    header.addEventListener('click', function() {
        const collapsible = this.parentElement;
        collapsible.classList.toggle('active');
    });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active Navigation Highlighting on Scroll
const sections = document.querySelectorAll('.lab-section');
const navLinks = document.querySelectorAll('.sidebar-nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Checkbox persistence in localStorage
document.querySelectorAll('.checklist input[type="checkbox"]').forEach(checkbox => {
    const id = checkbox.id;
    if (id) {
        // Load saved state
        const saved = localStorage.getItem(`task-${id}`);
        if (saved === 'true') checkbox.checked = true;
        
        // Save on change
        checkbox.addEventListener('change', () => {
            localStorage.setItem(`task-${id}`, checkbox.checked);
        });
    }
});
