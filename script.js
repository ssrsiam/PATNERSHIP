// Page navigation functions
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    document.getElementById(pageId).classList.add('active');
}

// Partnership form submission
document.getElementById('partnerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const communityName = document.getElementById('communityName').value;
    const sponsorName = document.getElementById('sponsorName').value;
    
    if (name && communityName && sponsorName) {
        showPage('investmentPage');
    }
});

// Promo code application
document.getElementById('applyPromo').addEventListener('click', function() {
    const promoCode = document.getElementById('promoCode').value.toUpperCase();
    const amountElement = document.getElementById('investmentAmount');
    
    if (promoCode === 'SRSIAM') {
        amountElement.textContent = '5180';
        showNotification('Promo code applied successfully!', 'success');
    } else if (promoCode) {
        showNotification('Invalid promo code', 'error');
    } else {
        amountElement.textContent = '15000';
    }
});

// Copy payment number
document.getElementById('copyNumber').addEventListener('click', function() {
    const paymentNumber = document.getElementById('paymentNumber');
    paymentNumber.select();
    document.execCommand('copy');
    showNotification('Payment number copied!', 'success');
});

// Investment form submission
document.getElementById('investForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const transactionId = document.getElementById('transactionId').value;
    
    if (transactionId) {
        showPage('verificationPage');
        startCountdown();
    }
});

// Countdown timer for verification
function startCountdown() {
    let timeLeft = 180; // 3 minutes in seconds
    const countdownElement = document.getElementById('countdown');
    
    const timer = setInterval(function() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        countdownElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            showPage('successPage');
        }
        
        timeLeft--;
    }, 1000);
}

// Notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: #fff;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        ${type === 'success' ? 'background: linear-gradient(45deg, #28a745, #20c997);' : 'background: linear-gradient(45deg, #dc3545, #fd7e14);'}
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Form validation enhancements
document.querySelectorAll('input[required]').forEach(input => {
    input.addEventListener('blur', function() {
        if (!this.value.trim()) {
            this.style.borderColor = '#dc3545';
        } else {
            this.style.borderColor = '#FFD700';
        }
    });
});

// Promo code input enhancement
document.getElementById('promoCode').addEventListener('input', function() {
    this.value = this.value.toUpperCase();
});

// Auto-focus on first input when page loads
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('name').focus();
});

// Prevent form submission on Enter key for promo code
document.getElementById('promoCode').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('applyPromo').click();
    }
});

// Add smooth scrolling for better UX
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});