// Custom Star Cursor
// -------------------------

// Get the custom cursor element
const customCursor = document.querySelector('.custom-cursor');

// Show custom cursor on page load
document.addEventListener('DOMContentLoaded', function() {
    customCursor.style.display = 'block';
    
    // Setup Polaroid camera flash effect and navigation
    setupPolaroidCamera();
    
    // Setup infinite horizontal scroll for about section
    setupInfiniteScroll();
});

// Move custom cursor with mouse position
document.addEventListener('mousemove', function(e) {
    // Update custom cursor position
    customCursor.style.left = e.clientX + 'px';
    customCursor.style.top = e.clientY + 'px';
    
    // Create star trail on all pages
    createStar(e);
});

// Make custom cursor slightly larger on clickable elements to indicate interactivity
document.addEventListener('mouseover', function(e) {
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || 
        e.target.classList.contains('project-card') || 
        e.target.closest('.project-card') || 
        e.target.closest('.about-card') ||
        e.target.classList.contains('polaroid-button')) {
        customCursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    } else {
        customCursor.style.transform = 'translate(-50%, -50%) scale(1)';
    }
});

// Mouse Trail Effect: Stars
// -------------------------

// Function to create a star that follows the cursor
function createStar(e) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Randomize star position slightly for more organic feel
    const offsetX = Math.random() * 20 - 10;
    const offsetY = Math.random() * 20 - 10;
    
    star.style.left = (e.pageX + offsetX) + 'px';
    star.style.top = (e.pageY + offsetY) + 'px';
    
    // Randomize star size
    const size = Math.random() * 10 + 5;
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    
    // Randomize rotation
    const rotation = Math.random() * 360;
    star.style.transform = `rotate(${rotation}deg)`;
    
    document.body.appendChild(star);

    // Brief delay before showing the star
    setTimeout(() => {
        star.style.opacity = '0.7';
    }, 10);

    // After a short delay, fade the star out, then remove it
    setTimeout(() => {
        star.style.opacity = '0';
        setTimeout(() => {
            star.remove();
        }, 300);
    }, 300);
}

// Scroll Animation: Elements appear on scroll
// -------------------------

// Select all elements that should animate on scroll
const animatedElements = document.querySelectorAll('.animate-on-scroll');
const sections = document.querySelectorAll('section');
const projectCards = document.querySelectorAll('.project-card');
const aboutCards = document.querySelectorAll('.about-card');
const socialIcons = document.querySelectorAll('.social-icons a');

// Define the options for the IntersectionObserver
const observerOptions = {
    root: null,           // Use the browser viewport as the container
    rootMargin: '0px',    // No margin around the root
    threshold: 0.2        // Trigger when 20% of the element is visible
};

// Create observers for different element types
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            elementObserver.unobserve(entry.target); // Stop observing once animated
        }
    });
}, observerOptions);

// Observe each section
sections.forEach(section => {
    sectionObserver.observe(section);
});

// Observe each project card with staggered delay
projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    elementObserver.observe(card);
});

// Observe each about card with staggered delay
aboutCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    elementObserver.observe(card);
});

// Observe each social icon with staggered delay
socialIcons.forEach((icon, index) => {
    icon.style.transitionDelay = `${index * 0.1}s`;
    elementObserver.observe(icon);
});

// Observe any other elements marked for animation
animatedElements.forEach(element => {
    elementObserver.observe(element);
});

// Smooth Scrolling for Navigation Links
// -------------------------

// Select all anchor links inside the navigation bar
document.querySelectorAll('nav a').forEach(anchor => {
    // Add a click event listener to each link
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent the default jump-to behavior

        const targetId = this.getAttribute('href');         // Get the target section's ID (e.g., "#about")
        const targetSection = document.querySelector(targetId); // Find the corresponding section element

        // Smoothly scroll to the top of the target section
        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
    });
});

// Add Polaroid Camera Flash Effect and Navigation
// -------------------------

function setupPolaroidCamera() {
    // Create a polaroid button element
    const homepageSection = document.getElementById('homepage');
    const content = homepageSection.querySelector('.content');
    
    // Create the flash overlay that covers the entire screen
    const flashOverlay = document.createElement('div');
    flashOverlay.className = 'flash-overlay';
    flashOverlay.style.position = 'fixed';
    flashOverlay.style.top = '0';
    flashOverlay.style.left = '0';
    flashOverlay.style.width = '100%';
    flashOverlay.style.height = '100%';
    flashOverlay.style.backgroundColor = 'white';
    flashOverlay.style.opacity = '0';
    flashOverlay.style.pointerEvents = 'none';
    flashOverlay.style.zIndex = '10000';
    flashOverlay.style.transition = 'opacity 0.1s ease-in, opacity 0.5s ease-out';
    document.body.appendChild(flashOverlay);
    
    // Create the polaroid camera image (using the image you provided)
    const polaroidCamera = document.createElement('div');
    polaroidCamera.className = 'polaroid-camera';
    polaroidCamera.style.position = 'relative';
    polaroidCamera.style.width = '300px';
    polaroidCamera.style.height = '300px';
    polaroidCamera.style.marginBottom = '30px';
    
    // Create the polaroid image
    const polaroidImage = document.createElement('img');
    polaroidImage.src = "img/polaroid-camera.png"; // Placeholder for the camera image
    polaroidImage.alt = "Polaroid Camera";
    polaroidImage.style.width = '100%';
    polaroidImage.style.height = '100%';
    polaroidImage.style.objectFit = 'contain';
    polaroidCamera.appendChild(polaroidImage);
    
    // Create the red button overlay
    const redButton = document.createElement('div');
    redButton.className = 'polaroid-button';
    redButton.style.position = 'absolute';
    redButton.style.top = '30%';
    redButton.style.left = '15%';
    redButton.style.width = '40px';
    redButton.style.height = '40px';
    redButton.style.backgroundColor = '#FF3B30';
    redButton.style.borderRadius = '50%';
    redButton.style.cursor = 'none';
    redButton.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
    redButton.style.transition = 'transform 0.2s ease';
    polaroidCamera.appendChild(redButton);
    
    // Add hover effect for the button
    redButton.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    redButton.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
    
    // Add click effect for the button
    redButton.addEventListener('click', function() {
        // First show the flash
        flashOverlay.style.opacity = '1';
        
        // After a delay, navigate to the about section
        setTimeout(() => {
            // Fade out the flash
            flashOverlay.style.opacity = '0';
            
            // Navigate to about section
            const aboutSection = document.getElementById('about');
            window.scrollTo({
                top: aboutSection.offsetTop,
                behavior: 'smooth'
            });
        }, 300); // Flash duration
    });
    
    // Replace the existing rotating image with our polaroid camera
    const existingRotatingImage = content.querySelector('.rotating-image');
    if (existingRotatingImage) {
        content.replaceChild(polaroidCamera, existingRotatingImage);
    } else {
        content.insertBefore(polaroidCamera, content.firstChild);
    }
}

