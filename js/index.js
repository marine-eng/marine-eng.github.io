// ✅ This will hold all student data (as a map/hashmap)
const profileData = {};

// Function to create a student profile object
function createStudentProfile(data) {
    return {
        name: data.name,
        title: data.title,
        image: data.image,
        studentId: data.studentId,
        age: data.age,
        hometown: data.hometown,
        gpa: data.gpa,
        email: data.email,
        specialization: data.specialization,
        thesis: data.thesis,
        internship: data.internship,
        futureGoal: data.futureGoal,
        achievements: data.achievements || [],
        skills: data.skills || [],
        funFacts: data.funFacts || []
    };
}

// Load profiles from JSON and populate `profileData`
async function loadProfiles() {
    try {
        const response = await fetch('data/profile.json');
        const data = await response.json();

        // Store each profile using `name` as the key
        Object.values(data).forEach(student => {
            const profile = createStudentProfile(student);
            profileData[profile.name] = profile; // 👈 KEY = name
        });

      
        createProfessionalCards();
        setupEventListeners();
    
    } catch (error) {
        console.error('Error loading profile data:', error);
    }
}

// Function to create professional cards after data is loaded
function createProfessionalCards() {
    const container = document.querySelector('.professionals-grid');
    if (!container) return;

    // Clear any existing content except hardcoded cards
    const existingCards = container.querySelectorAll('.professional-card:not(.static)');
    existingCards.forEach(card => card.remove());

    let delay = 0.1;
    Object.values(profileData).forEach((person) => {
        const card = document.createElement('div');
        card.className = 'professional-card animate-in';
        card.style.animationDelay = `${delay}s`;
        card.dataset.personName = person.name; // Store name for click handler

        card.innerHTML = `
            <div class="profile-image"><img src="${person.image}" alt="${person.name}"></div>
            <div class="name">${person.name}</div>
            <div class="title">${person.title}</div>
            <div class="specialty">${person.specialization}</div>
            <div class="achievement">${person.achievements[0] || 'Graduate'}</div>
        `;

        container.appendChild(card);
        delay += 0.1;
    });
}

// ✅ Call the function to load profiles at page loadstyles index.html
loadProfiles();



        // Function to open profile modal
        function openProfile(personName) {
            const profile = profileData[personName];
            if (!profile) {
                console.error('Profile not found for:', personName);
                return;
            }

            // Set basic info
            document.getElementById('modalProfileImage').innerHTML = `<img src="${profile.image}" alt="${profile.name}">`;
            document.getElementById('modalName').textContent = profile.name;
            document.getElementById('modalTitle').textContent = profile.title;
            
            // Set personal information
            document.getElementById('studentId').textContent = profile.studentId;
            document.getElementById('age').textContent = profile.age;
            document.getElementById('hometown').textContent = profile.hometown;
            document.getElementById('gpa').textContent = profile.gpa;
            document.getElementById('email').textContent = profile.email;
            
            // Set academic info
            document.getElementById('specialization').textContent = profile.specialization;
            document.getElementById('thesis').textContent = profile.thesis;
            document.getElementById('internship').textContent = profile.internship;
            document.getElementById('futureGoal').textContent = profile.futureGoal;
            
            // Set achievements
            const achievementsGrid = document.getElementById('achievementsGrid');
            achievementsGrid.innerHTML = '';
            profile.achievements.forEach(achievement => {
                const badge = document.createElement('div');
                badge.className = 'achievement-badge';
                badge.textContent = achievement;
                achievementsGrid.appendChild(badge);
            });
            
            // Set skills
            const skillsList = document.getElementById('skillsList');
            skillsList.innerHTML = '';
            profile.skills.forEach(skill => {
                const tag = document.createElement('div');
                tag.className = 'skill-tag';
                tag.textContent = skill;
                skillsList.appendChild(tag);
            });
            
            // Set fun facts
            const funFactsList = document.getElementById('funFactsList');
            funFactsList.innerHTML = '';
            profile.funFacts.forEach(fact => {
                const factItem = document.createElement('div');
                factItem.className = 'fun-fact-item';
                factItem.textContent = fact;
                funFactsList.appendChild(factItem);
            });
            
            // Show modal
            document.getElementById('profileModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // Function to close modal
        function closeModal() {
            document.getElementById('profileModal').classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Close modal when clicking outside
        document.getElementById('profileModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });

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

        // ✅ Function to setup event listeners after cards are created
        function setupEventListeners() {
            // Observe animation elements
            document.querySelectorAll('.animate-in').forEach(el => {
                observer.observe(el);
            });

            // Enhanced card interactions - use event delegation
            const container = document.querySelector('.professionals-grid');
            if (container) {
                container.addEventListener('click', function(e) {
                    const card = e.target.closest('.professional-card');
                    if (card && card.dataset.personName) {
                        card.style.transform = 'translateY(-15px) scale(0.98)';
                        setTimeout(() => {
                            card.style.transform = 'translateY(-15px) scale(1.02)';
                            openProfile(card.dataset.personName);
                        }, 150);
                    }
                });

                container.addEventListener('mouseenter', function(e) {
                    const card = e.target.closest('.professional-card');
                    if (card) {
                        card.style.transform = 'translateY(-15px) scale(1.02)';
                        card.style.cursor = 'pointer';
                    }
                }, true);
                
                container.addEventListener('mouseleave', function(e) {
                    const card = e.target.closest('.professional-card');
                    if (card) {
                        card.style.transform = 'translateY(0) scale(1)';
                    }
                }, true);
            }

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
        }