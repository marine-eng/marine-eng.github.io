// Main application functionality
class MarineBanner {
    constructor() {
        this.init();
    }

    init() {
        this.setupAnimations();
        this.generateStudentCards();
        this.setupInteractions();
    }

    setupAnimations() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-in').forEach(el => {
            observer.observe(el);
        });
    }

    generateStudentCards() {
        const grid = document.getElementById('professionalsGrid');
        let animationDelay = 0.1;

        Object.entries(studentProfiles).forEach(([initials, profile]) => {
            const card = this.createStudentCard(profile, animationDelay);
            grid.appendChild(card);
            animationDelay += 0.1;
        });
    }

    createStudentCard(profile, delay) {
        const card = document.createElement('div');
        card.className = 'professional-card animate-in';
        card.style.animationDelay = `${delay}s`;
        card.setAttribute('data-initials', profile.initials);

        card.innerHTML = `
            <div class="profile-image">${profile.initials}</div>
            <div class="name">${profile.name}</div>
            <div class="title">${profile.title}</div>
            <div class="specialty">${profile.specialization}</div>
            <div class="achievement">${profile.achievements[0] || 'Excellence'}</div>
        `;

        return card;
    }

    setupInteractions() {
        // Logo animation
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.addEventListener('mouseenter', function() {
                this.style.transform = 'rotate(360deg) scale(1.1)';
                this.style.transition = 'transform 0.8s ease';
            });
            
            logo.addEventListener('mouseleave', function() {
                this.style.transform = 'rotate(0deg) scale(1)';
            });
        }

        // Delegate card click events (using event delegation for dynamically created cards)
        document.addEventListener('click', (e) => {
            const card = e.target.closest('.professional-card');
            if (card) {
                const initials = card.getAttribute('data-initials');
                if (initials) {
                    this.handleCardClick(card, initials);
                }
            }
        });

        // Delegate card hover events
        document.addEventListener('mouseenter', (e) => {
            const card = e.target.closest('.professional-card');
            if (card) {
                this.handleCardHover(card, true);
            }
        }, true);

        document.addEventListener('mouseleave', (e) => {
            const card = e.target.closest('.professional-card');
            if (card) {
                this.handleCardHover(card, false);
            }
        }, true);
    }

    handleCardClick(card, initials) {
        card.style.transform = 'translateY(-15px) scale(0.98)';
        setTimeout(() => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
            openProfile(initials);
        }, 150);
    }

    handleCardHover(card, isEnter) {
        if (isEnter) {
            card.style.transform = 'translateY(-15px) scale(1.02)';
            card.style.cursor = 'pointer';
        } else {
            card.style.transform = 'translateY(0) scale(1)';
        }
    }
}

// Utility functions
const utils = {
    // Add a new student profile
    addStudent: function(initials, studentData) {
        studentProfiles[initials] = createStudentProfile(studentData);
        // Optionally refresh the grid
        this.refreshGrid();
    },

    // Remove a student profile
    removeStudent: function(initials) {
        delete studentProfiles[initials];
        this.refreshGrid();
    },

    // Refresh the student grid
    refreshGrid: function() {
        const grid = document.getElementById('professionalsGrid');
        grid.innerHTML = '';
        marineBanner.generateStudentCards();
    },

    // Update student data
    updateStudent: function(initials, newData) {
        if (studentProfiles[initials]) {
            studentProfiles[initials] = createStudentProfile({
                ...studentProfiles[initials],
                ...newData
            });
            this.refreshGrid();
        }
    }
};

// Initialize application when DOM is loaded
let marineBanner;
document.addEventListener('DOMContentLoaded', () => {
    marineBanner = new MarineBanner();
});

// Export for external use
window.MarineBanner = MarineBanner;
window.utils = utils;