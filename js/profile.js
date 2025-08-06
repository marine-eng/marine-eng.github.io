// Function to create student profile data
function createStudentProfile(data) {
    return {
        name: data.name,
        title: data.title,
        initials: data.initials,
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

// Student profiles data
const studentProfiles = {};

// Add students using the function
studentProfiles['AC'] = createStudentProfile({
    name: 'Engr. Alex Chen',
    title: 'Ship Design Engineer',
    initials: 'AC',
    studentId: 'ME2024001',
    age: 24,
    hometown: 'Singapore',
    gpa: '3.85/4.00',
    email: 'alex.chen@maritime.edu',
    specialization: 'Naval Architecture',
    thesis: 'Optimization of Hull Design for Fuel Efficiency',
    internship: 'Hyundai Heavy Industries',
    futureGoal: 'Lead Naval Architect at Major Shipyard',
    achievements: ['Cum Laude', 'Best Design Project 2024', 'Maritime Innovation Award'],
    skills: ['AutoCAD', 'SolidWorks', 'ANSYS', 'MATLAB', 'Ship Stability Analysis', 'CFD'],
    funFacts: [
        '🎮 Gaming enthusiast who built his own PC',
        '🏊‍♂️ Competitive swimmer since high school',
        '🍜 Can cook authentic dim sum from scratch',
        '📚 Reads 2 engineering books per month',
        '🎸 Plays guitar in a university band called "The Propellers"'
    ]
});

studentProfiles['SM'] = createStudentProfile({
    name: 'Engr. Sarah Martinez',
    title: 'Marine Systems Engineer',
    initials: 'SM',
    studentId: 'ME2024002',
    age: 23,
    hometown: 'Barcelona, Spain',
    gpa: '3.92/4.00',
    email: 'sarah.martinez@maritime.edu',
    specialization: 'Propulsion Systems',
    thesis: 'Hybrid Electric Propulsion for Commercial Vessels',
    internship: 'Rolls-Royce Marine',
    futureGoal: 'Sustainable Marine Technology Developer',
    achievements: ['Dean\'s List', 'Green Innovation Prize', 'Outstanding Student Leader'],
    skills: ['Python', 'Simulink', 'Power Systems', 'Renewable Energy', 'Project Management'],
    funFacts: [
        '🌱 Grows her own herbs and vegetables on campus',
        '💃 Professional flamenco dancer',
        '🔧 Restored a vintage motorcycle as a hobby project',
        '🌍 Speaks 4 languages fluently',
        '☕ Coffee connoisseur who roasts her own beans'
    ]
});

// Add more students here using the same pattern...
// studentProfiles['XX'] = createStudentProfile({ ... });

// Export for use in other files (if using modules)
export { studentProfiles, createStudentProfile };