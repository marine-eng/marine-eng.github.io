// Profile modal functionality
class ProfileModal {
    constructor() {
        this.modal = document.getElementById('profileModal');
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Close modal when clicking outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        });
    }

    open(initials) {
        const profile = studentProfiles[initials];
        if (!profile) return;

        this.populateModal(profile);
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    populateModal(profile) {
        // Set basic info
        document.getElementById('modalProfileImage').textContent = profile.initials;
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
        this.populateAchievements(profile.achievements);
        
        // Set skills
        this.populateSkills(profile.skills);
        
        // Set fun facts
        this.populateFunFacts(profile.funFacts);
    }

    populateAchievements(achievements) {
        const achievementsGrid = document.getElementById('achievementsGrid');
        achievementsGrid.innerHTML = '';
        achievements.forEach(achievement => {
            const badge = document.createElement('div');
            badge.className = 'achievement-badge';
            badge.textContent = achievement;
            achievementsGrid.appendChild(badge);
        });
    }

    populateSkills(skills) {
        const skillsList = document.getElementById('skillsList');
        skillsList.innerHTML = '';
        skills.forEach(skill => {
            const tag = document.createElement('div');
            tag.className = 'skill-tag';
            tag.textContent = skill;
            skillsList.appendChild(tag);
        });
    }

    populateFunFacts(funFacts) {
        const funFactsList = document.getElementById('funFactsList');
        funFactsList.innerHTML = '';
        funFacts.forEach(fact => {
            const factItem = document.createElement('div');
            factItem.className = 'fun-fact-item';
            factItem.textContent = fact;
            funFactsList.appendChild(factItem);
        });
    }
}

// Global functions for backward compatibility
function openProfile(initials) {
    profileModal.open(initials);
}

function closeModal() {
    profileModal.close();
}

// Initialize modal when DOM is loaded
let profileModal;
document.addEventListener('DOMContentLoaded', () => {
    profileModal = new ProfileModal();
});