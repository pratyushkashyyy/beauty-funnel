// Global variables
let cartItems = [];
let cartTotal = 0;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeHeaderEffects();
    initializeAnimations();
    initializeCart();
    initializeProductInteractions();
    initializeTestimonials();
    initializeParallaxEffects();
    initializePerformanceOptimizations();
}

// Mobile Menu Toggle
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
            
            // Change icon
            const icon = this.querySelector('i');
            if (this.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            const menuBtn = document.querySelector('.mobile-menu-btn');
            if (menuBtn) {
                menuBtn.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const menuBtn = document.querySelector('.mobile-menu-btn');
            if (menuBtn) {
                menuBtn.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        }
    });
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header scroll effects
function initializeHeaderEffects() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Header background effect
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.12)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
        }
        
        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Intersection Observer for animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.about-feature, .product-card, .testimonial-card, .feature-icon');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Cart functionality
function initializeCart() {
    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get product info
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;
            const productImage = productCard.querySelector('.product-image-placeholder i').className;
            
            // Add to cart
            addToCart({
                name: productName,
                price: productPrice,
                image: productImage,
                id: Date.now()
            });
            
            // Animate button
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Show success message
            showNotification(`Added ${productName} to cart!`, 'success');
        });
    });
    
    // Cart icon click
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            showCart();
        });
    }
}

// Add item to cart
function addToCart(item) {
    cartItems.push(item);
    cartTotal += parseFloat(item.price.replace('$', ''));
    updateCartCount();
    updateCartDisplay();
}

// Update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cartItems.length;
        cartCount.style.display = cartItems.length > 0 ? 'flex' : 'none';
    }
}

// Update cart display
function updateCartDisplay() {
    // This would typically update a cart dropdown or sidebar
    console.log('Cart updated:', cartItems);
}

// Show cart
function showCart() {
    if (cartItems.length === 0) {
        showNotification('Your cart is empty', 'info');
        return;
    }
    
    // Create cart modal
    const cartModal = document.createElement('div');
    cartModal.className = 'cart-modal';
    cartModal.innerHTML = `
        <div class="cart-content">
            <div class="cart-header">
                <h3>Shopping Cart (${cartItems.length})</h3>
                <button class="close-cart">&times;</button>
            </div>
            <div class="cart-items">
                ${cartItems.map(item => `
                    <div class="cart-item">
                        <div class="cart-item-image">
                            <i class="${item.image}"></i>
                        </div>
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            <p>${item.price}</p>
                        </div>
                        <button class="remove-item" data-id="${item.id}">&times;</button>
                    </div>
                `).join('')}
            </div>
            <div class="cart-footer">
                <div class="cart-total">
                    <span>Total:</span>
                    <span>$${cartTotal.toFixed(2)}</span>
                </div>
                <button class="btn btn-primary checkout-btn">Checkout</button>
            </div>
        </div>
    `;
    
    // Add styles
    cartModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(cartModal);
    
    // Animate in
    setTimeout(() => {
        cartModal.style.opacity = '1';
    }, 10);
    
    // Close functionality
    const closeBtn = cartModal.querySelector('.close-cart');
    closeBtn.addEventListener('click', () => {
        cartModal.style.opacity = '0';
        setTimeout(() => {
            cartModal.remove();
        }, 300);
    });
    
    // Remove item functionality
    cartModal.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = parseInt(this.dataset.id);
            removeFromCart(itemId);
            cartModal.remove();
            showCart();
        });
    });
    
    // Checkout functionality
    const checkoutBtn = cartModal.querySelector('.checkout-btn');
    checkoutBtn.addEventListener('click', () => {
        showNotification('Proceeding to checkout...', 'success');
        cartModal.remove();
    });
}

// Remove item from cart
function removeFromCart(itemId) {
    const itemIndex = cartItems.findIndex(item => item.id === itemId);
    if (itemIndex > -1) {
        const item = cartItems[itemIndex];
        cartTotal -= parseFloat(item.price.replace('$', ''));
        cartItems.splice(itemIndex, 1);
        updateCartCount();
        updateCartDisplay();
    }
}

// Product interactions
function initializeProductInteractions() {
    // Product image hover effects
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const image = this.querySelector('.product-image');
            image.style.transform = 'scale(1.05)';
            image.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            const image = this.querySelector('.product-image');
            image.style.transform = 'scale(1)';
        });
    });
    
    // Product quick view (if implemented)
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('dblclick', function() {
            const productName = this.querySelector('.product-title').textContent;
            showNotification(`Quick view: ${productName}`, 'info');
        });
    });
}

// Testimonials functionality
function initializeTestimonials() {
    // Testimonial rating hover effects
    document.querySelectorAll('.testimonial-rating').forEach(rating => {
        rating.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        rating.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Parallax effects
function initializeParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroImage = document.querySelector('.hero-image');
        
        if (hero && heroImage) {
            const rate = scrolled * -0.5;
            heroImage.style.transform = `translateY(${rate}px)`;
        }
        
        // Floating cards parallax
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach((card, index) => {
            const rate = scrolled * (0.1 + index * 0.05);
            card.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Performance optimizations
function initializePerformanceOptimizations() {
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            // Heavy scroll operations here
        }, 16);
    });
    
    // Lazy loading for images (if real images are added)
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="fas ${getNotificationIcon(type)}"></i>
            </div>
            <div class="notification-text">
                <span>${message}</span>
            </div>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 0;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 350px;
        overflow: hidden;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Add notification content styles
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem 1.5rem;
    `;
    
    const icon = notification.querySelector('.notification-icon');
    icon.style.cssText = `
        font-size: 1.2rem;
        opacity: 0.9;
    `;
    
    const text = notification.querySelector('.notification-text');
    text.style.cssText = `
        flex: 1;
        font-weight: 500;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.3s ease;
    `;
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Get notification icon
function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// Get notification color
function getNotificationColor(type) {
    switch (type) {
        case 'success': return '#28a745';
        case 'error': return '#dc3545';
        case 'warning': return '#ffc107';
        default: return '#007bff';
    }
}

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
        }
    }
    
    updateCounter();
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            
            if (number && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounter(statNumber, number);
            }
        }
    });
}, { threshold: 0.5 });

// Observe stats
document.addEventListener('DOMContentLoaded', function() {
    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => statsObserver.observe(stat));
});

// Form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Remove loading screen
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }
});

// Add loading screen
const loadingScreen = document.createElement('div');
loadingScreen.className = 'loading-screen';
loadingScreen.innerHTML = `
    <div class="loading-content">
        <div class="loading-spinner"></div>
        <h2>Skyfluence Beauty</h2>
        <p>Loading your beauty experience...</p>
    </div>
`;

loadingScreen.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.5s ease;
`;

const loadingContent = loadingScreen.querySelector('.loading-content');
loadingContent.style.cssText = `
    text-align: center;
    color: white;
`;

const loadingSpinner = loadingScreen.querySelector('.loading-spinner');
loadingSpinner.style.cssText = `
    width: 50px;
    height: 50px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top: 3px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 2rem;
`;

// Add spinner animation
const spinnerCSS = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

const spinnerStyle = document.createElement('style');
spinnerStyle.textContent = spinnerCSS;
document.head.appendChild(spinnerStyle);

document.body.appendChild(loadingScreen);

// Add mobile menu CSS
const mobileMenuCSS = `
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 80px;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            padding: 2rem;
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            z-index: 999;
        }
        
        .nav-links.active {
            transform: translateY(0);
            opacity: 1;
        }
        
        .nav-links a {
            padding: 1rem 0;
            border-bottom: 1px solid #eee;
            text-align: center;
            font-size: 1.1rem;
        }
        
        .nav-links a:last-child {
            border-bottom: none;
        }
        
        .mobile-menu-btn.active {
            color: #667eea;
        }
    }
    
    .cart-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .cart-content {
        background: white;
        border-radius: 20px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow: hidden;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    }
    
    .cart-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        border-bottom: 1px solid #eee;
    }
    
    .cart-header h3 {
        margin: 0;
        color: #1a1a1a;
    }
    
    .close-cart {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #666;
    }
    
    .cart-items {
        max-height: 300px;
        overflow-y: auto;
        padding: 1rem;
    }
    
    .cart-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        border-bottom: 1px solid #f0f0f0;
    }
    
    .cart-item-image {
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.2rem;
    }
    
    .cart-item-details h4 {
        margin: 0 0 0.5rem 0;
        color: #1a1a1a;
    }
    
    .cart-item-details p {
        margin: 0;
        color: #667eea;
        font-weight: 600;
    }
    
    .remove-item {
        background: none;
        border: none;
        color: #ff6b6b;
        font-size: 1.2rem;
        cursor: pointer;
    }
    
    .cart-footer {
        padding: 1.5rem;
        border-top: 1px solid #eee;
    }
    
    .cart-total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        font-weight: 600;
        font-size: 1.1rem;
    }
    
    .checkout-btn {
        width: 100%;
    }
`;

// Inject mobile menu CSS
const style = document.createElement('style');
style.textContent = mobileMenuCSS;
document.head.appendChild(style); 

// Quiz Funnel JavaScript
class BeautyQuiz {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 7;
        this.quizData = {};
        this.selectedOptions = {};
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateProgress();
        this.updateNavigation();
    }

    bindEvents() {
        // Option selection
        document.querySelectorAll('.option-card').forEach(card => {
            card.addEventListener('click', (e) => this.selectOption(e));
        });

        // Navigation buttons
        document.getElementById('nextBtn').addEventListener('click', () => this.nextStep());
        document.getElementById('prevBtn').addEventListener('click', () => this.previousStep());
        document.getElementById('getResultsBtn').addEventListener('click', () => this.showResults());
        document.getElementById('backBtn').addEventListener('click', () => this.goBack());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    selectOption(event) {
        const card = event.currentTarget;
        const step = this.getCurrentStepElement();
        const isMultiSelect = step.querySelector('.multi-select') !== null;
        const value = card.dataset.value;

        if (isMultiSelect) {
            // Multi-select logic
            card.classList.toggle('selected');
            
            if (!this.selectedOptions[this.currentStep]) {
                this.selectedOptions[this.currentStep] = [];
            }
            
            const index = this.selectedOptions[this.currentStep].indexOf(value);
            if (index > -1) {
                this.selectedOptions[this.currentStep].splice(index, 1);
            } else {
                this.selectedOptions[this.currentStep].push(value);
            }
        } else {
            // Single select logic
            step.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            this.selectedOptions[this.currentStep] = value;
        }

        this.updateNavigation();
        this.animateSelection(card);
    }

    animateSelection(card) {
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    }

    nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.hideCurrentStep();
            this.currentStep++;
            this.showCurrentStep();
            this.updateProgress();
            this.updateNavigation();
        }
    }

    previousStep() {
        if (this.currentStep > 1) {
            this.hideCurrentStep();
            this.currentStep--;
            this.showCurrentStep();
            this.updateProgress();
            this.updateNavigation();
        }
    }

    hideCurrentStep() {
        const currentStepElement = this.getCurrentStepElement();
        currentStepElement.style.opacity = '0';
        currentStepElement.style.transform = 'translateY(20px)';
        setTimeout(() => {
            currentStepElement.classList.remove('active');
        }, 300);
    }

    showCurrentStep() {
        const currentStepElement = this.getCurrentStepElement();
        currentStepElement.classList.add('active');
        setTimeout(() => {
            currentStepElement.style.opacity = '1';
            currentStepElement.style.transform = 'translateY(0)';
        }, 50);
    }

    getCurrentStepElement() {
        return document.getElementById(`step${this.currentStep}`);
    }

    updateProgress() {
        const currentStepElement = document.querySelector('.current-step');
        if (currentStepElement) {
            currentStepElement.textContent = this.currentStep;
        }
    }

    updateNavigation() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const getResultsBtn = document.getElementById('getResultsBtn');

        // Show/hide previous button
        if (this.currentStep > 1) {
            prevBtn.style.display = 'flex';
        } else {
            prevBtn.style.display = 'none';
        }

        // Show/hide next button and get results button
        if (this.currentStep === this.totalSteps) {
            nextBtn.style.display = 'none';
            getResultsBtn.style.display = 'flex';
        } else {
            nextBtn.style.display = 'flex';
            getResultsBtn.style.display = 'none';
        }

        // Enable/disable next button based on selection
        const hasSelection = this.hasValidSelection();
        nextBtn.disabled = !hasSelection;
        getResultsBtn.disabled = !hasSelection;

        if (!hasSelection) {
            nextBtn.style.opacity = '0.5';
            getResultsBtn.style.opacity = '0.5';
        } else {
            nextBtn.style.opacity = '1';
            getResultsBtn.style.opacity = '1';
        }
    }

    hasValidSelection() {
        const currentStep = this.currentStep;
        const selection = this.selectedOptions[currentStep];
        
        if (!selection) return false;
        
        // For multi-select (step 3), require at least one selection
        if (currentStep === 3) {
            return Array.isArray(selection) && selection.length > 0;
        }
        
        // For single select, just need a value
        return selection && selection !== '';
    }

    showResults() {
        this.showLoadingOverlay();
        
        setTimeout(() => {
            this.hideLoadingOverlay();
            this.hideCurrentStep();
            this.showResultsStep();
            this.populateResults();
        }, 2000);
    }

    showLoadingOverlay() {
        const overlay = document.getElementById('loadingOverlay');
        overlay.classList.add('active');
    }

    hideLoadingOverlay() {
        const overlay = document.getElementById('loadingOverlay');
        overlay.classList.remove('active');
    }

    showResultsStep() {
        const resultsStep = document.getElementById('results');
        resultsStep.classList.add('active');
        setTimeout(() => {
            resultsStep.style.opacity = '1';
            resultsStep.style.transform = 'translateY(0)';
        }, 50);
    }

    populateResults() {
        // Map the selected values to display text
        const displayMappings = {
            1: { // Age
                '18-24': '18-24',
                '25-34': '25-34',
                '35-44': '35-44',
                '45-54': '45-54',
                '55+': '55+'
            },
            2: { // Skin Type
                'dry': 'Dry',
                'oily': 'Oily',
                'combination': 'Combination',
                'normal': 'Normal',
                'sensitive': 'Sensitive'
            },
            3: { // Concerns
                'aging': 'Aging & Wrinkles',
                'acne': 'Acne & Breakouts',
                'dark-spots': 'Dark Spots & Hyperpigmentation',
                'dryness': 'Dryness & Dehydration',
                'pores': 'Large Pores',
                'redness': 'Redness & Inflammation',
                'dullness': 'Dullness & Lack of Radiance',
                'texture': 'Uneven Texture'
            },
            4: { // Current Routine
                'minimal': 'Minimal',
                'basic': 'Basic',
                'advanced': 'Advanced',
                'none': 'No Routine'
            },
            5: { // Lifestyle
                'busy': 'Busy & Active',
                'relaxed': 'Relaxed & Pampering',
                'natural': 'Natural & Organic',
                'results': 'Results-Driven'
            },
            6: { // Environment
                'dry-climate': 'Dry Climate',
                'humid-climate': 'Humid Climate',
                'polluted': 'Urban/Polluted',
                'seasonal': 'Seasonal Changes'
            },
            7: { // Budget
                'budget': 'Budget-Friendly ($20-50)',
                'mid-range': 'Mid-Range ($50-100)',
                'premium': 'Premium ($100+)',
                'no-limit': 'No Limit'
            }
        };

        // Update results display
        document.getElementById('ageResult').textContent = displayMappings[1][this.selectedOptions[1]] || '-';
        document.getElementById('skinTypeResult').textContent = displayMappings[2][this.selectedOptions[2]] || '-';
        
        // Handle multi-select for concerns
        const concerns = this.selectedOptions[3];
        if (Array.isArray(concerns) && concerns.length > 0) {
            const concernText = concerns.map(c => displayMappings[3][c]).join(', ');
            document.getElementById('concernsResult').textContent = concernText;
        } else {
            document.getElementById('concernsResult').textContent = '-';
        }
        
        document.getElementById('routineResult').textContent = displayMappings[4][this.selectedOptions[4]] || '-';
        document.getElementById('lifestyleResult').textContent = displayMappings[5][this.selectedOptions[5]] || '-';
        document.getElementById('environmentResult').textContent = displayMappings[6][this.selectedOptions[6]] || '-';
        document.getElementById('budgetResult').textContent = displayMappings[7][this.selectedOptions[7]] || '-';
    }

    goBack() {
        // This could navigate to the main site or previous page
        window.history.back();
    }

    handleKeyboard(event) {
        switch(event.key) {
            case 'ArrowRight':
            case 'Enter':
                if (this.hasValidSelection() && this.currentStep < this.totalSteps) {
                    this.nextStep();
                } else if (this.currentStep === this.totalSteps && this.hasValidSelection()) {
                    this.showResults();
                }
                break;
            case 'ArrowLeft':
                if (this.currentStep > 1) {
                    this.previousStep();
                }
                break;
        }
    }

    // Get quiz data for submission
    getQuizData() {
        return {
            age: this.selectedOptions[1],
            skinType: this.selectedOptions[2],
            concerns: this.selectedOptions[3],
            currentRoutine: this.selectedOptions[4],
            lifestyle: this.selectedOptions[5],
            environment: this.selectedOptions[6],
            budget: this.selectedOptions[7],
            timestamp: new Date().toISOString()
        };
    }
}

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const quiz = new BeautyQuiz();
    
    // Make quiz instance globally available for potential form submission
    window.beautyQuiz = quiz;
});

// Add some additional interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects for option cards
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = '';
                this.style.boxShadow = '';
            }
        });
    });

    // Add click outside to deselect (for multi-select)
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.option-card') && !e.target.closest('.navigation-buttons')) {
            const currentStep = document.querySelector('.quiz-step.active');
            if (currentStep && currentStep.querySelector('.multi-select')) {
                // Optional: Add logic to deselect all if clicking outside
            }
        }
    });

    // Add smooth scrolling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
});

// Add analytics tracking (if needed)
function trackQuizProgress(step, selection) {
    // This could integrate with Google Analytics, Facebook Pixel, etc.
    console.log(`Quiz Step ${step}: ${selection}`);
}

// Add form submission capability
function submitQuizResults() {
    const quizData = window.beautyQuiz.getQuizData();
    
    // This could send data to your backend or email service
    console.log('Quiz Results:', quizData);
    
    // Example: Send to email service
    // fetch('/api/submit-quiz', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(quizData)
    // });
    
    return quizData;
}

// Add social sharing functionality
function shareResults() {
    const quizData = window.beautyQuiz.getQuizData();
    const text = `I just discovered my perfect skincare routine! Take the quiz at Skyfluence Beauty.`;
    const url = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: 'My Beauty Quiz Results',
            text: text,
            url: url
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        window.open(shareUrl, '_blank');
    }
}

// Add print functionality for results
function printResults() {
    window.print();
}

// Enhanced email capture functionality
function captureEmail() {
    // Create a modal for email capture
    const modal = document.createElement('div');
    modal.className = 'email-modal';
    modal.innerHTML = `
        <div class="email-modal-content">
            <div class="email-modal-header">
                <h3>Get Your Complete Results</h3>
                <p>Enter your email to receive your personalized skincare routine</p>
            </div>
            <form class="email-form" onsubmit="submitEmail(event)">
                <div class="form-group">
                    <input type="email" id="userEmail" placeholder="Enter your email address" required>
                </div>
                <div class="form-group">
                    <label class="checkbox-label">
                        <input type="checkbox" id="newsletter" checked>
                        <span class="checkmark"></span>
                        Send me beauty tips and exclusive offers
                    </label>
                </div>
                <button type="submit" class="btn btn-primary btn-large">
                    <i class="fas fa-paper-plane"></i>
                    Get My Results
                </button>
            </form>
            <button class="modal-close" onclick="closeEmailModal()">&times;</button>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Add modal content styles
    const modalContent = modal.querySelector('.email-modal-content');
    modalContent.style.cssText = `
        background: white;
        border-radius: 20px;
        padding: 2rem;
        max-width: 400px;
        width: 90%;
        position: relative;
        transform: translateY(20px);
        transition: transform 0.3s ease;
    `;
    
    setTimeout(() => {
        modalContent.style.transform = 'translateY(0)';
    }, 50);
    
    // Add form styles
    const form = modal.querySelector('.email-form');
    form.style.cssText = `
        margin-top: 1.5rem;
    `;
    
    const formGroup = modal.querySelector('.form-group');
    formGroup.style.cssText = `
        margin-bottom: 1rem;
    `;
    
    const input = modal.querySelector('input[type="email"]');
    input.style.cssText = `
        width: 100%;
        padding: 12px 16px;
        border: 2px solid #e5e5e5;
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.3s ease;
    `;
    
    const checkboxLabel = modal.querySelector('.checkbox-label');
    checkboxLabel.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
        color: #666;
        cursor: pointer;
    `;
    
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #666;
    `;
    
    // Focus on email input
    setTimeout(() => {
        input.focus();
    }, 100);
}

// Submit email function
function submitEmail(event) {
    event.preventDefault();
    
    const email = document.getElementById('userEmail').value;
    const newsletter = document.getElementById('newsletter').checked;
    
    if (email && email.includes('@')) {
        // Store email with quiz data
        const quizData = window.beautyQuiz.getQuizData();
        quizData.email = email;
        quizData.newsletter = newsletter;
        
        // Send to backend (you can integrate with your email service here)
        console.log('Email captured:', email);
        console.log('Newsletter subscription:', newsletter);
        console.log('Complete quiz data:', quizData);
        
        // Show success message
        showSuccessMessage();
        
        // Close modal
        closeEmailModal();
    }
}

// Close email modal
function closeEmailModal() {
    const modal = document.querySelector('.email-modal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Show success message
function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h3>Thank You!</h3>
            <p>Your personalized skincare routine has been sent to your email.</p>
        </div>
    `;
    
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 10001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(successDiv);
    
    // Animate in
    setTimeout(() => {
        successDiv.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        successDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            successDiv.remove();
        }, 300);
    }, 5000);
} 