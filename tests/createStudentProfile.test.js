/**
 * @jest-environment node
 */

'use strict';

// Stub browser globals so index.js can be required in Node
global.document = {
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener: () => {},
    body: { style: {} },
};
global.IntersectionObserver = class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
};
global.fetch = () => Promise.resolve({ json: () => Promise.resolve({}) });

const { createStudentProfile } = require('../js/index.js');

describe('createStudentProfile', () => {
    const sampleData = {
        name: 'Engr. Test Student',
        title: 'Test Engineer',
        image: 'assets/images/test.jpg',
        studentId: 'ME2024099',
        age: 24,
        hometown: 'Test City',
        gpa: '3.90/4.00',
        email: 'test.student@maritime.edu',
        specialization: 'Naval Architecture',
        thesis: 'Test Thesis Title',
        internship: 'Test Company',
        futureGoal: 'Test Career Goal',
        achievements: ['Award A', 'Award B'],
        skills: ['MATLAB', 'AutoCAD'],
        funFacts: ['Loves the ocean', 'Avid sailor'],
    };

    it('returns an object with all expected fields', () => {
        const profile = createStudentProfile(sampleData);
        expect(profile).toHaveProperty('name', 'Engr. Test Student');
        expect(profile).toHaveProperty('title', 'Test Engineer');
        expect(profile).toHaveProperty('image', 'assets/images/test.jpg');
        expect(profile).toHaveProperty('studentId', 'ME2024099');
        expect(profile).toHaveProperty('age', 24);
        expect(profile).toHaveProperty('hometown', 'Test City');
        expect(profile).toHaveProperty('gpa', '3.90/4.00');
        expect(profile).toHaveProperty('email', 'test.student@maritime.edu');
        expect(profile).toHaveProperty('specialization', 'Naval Architecture');
        expect(profile).toHaveProperty('thesis', 'Test Thesis Title');
        expect(profile).toHaveProperty('internship', 'Test Company');
        expect(profile).toHaveProperty('futureGoal', 'Test Career Goal');
    });

    it('copies achievements, skills, and funFacts arrays', () => {
        const profile = createStudentProfile(sampleData);
        expect(profile.achievements).toEqual(['Award A', 'Award B']);
        expect(profile.skills).toEqual(['MATLAB', 'AutoCAD']);
        expect(profile.funFacts).toEqual(['Loves the ocean', 'Avid sailor']);
    });

    it('defaults achievements to an empty array when not provided', () => {
        const { achievements, ...dataWithout } = sampleData;
        const profile = createStudentProfile(dataWithout);
        expect(profile.achievements).toEqual([]);
    });

    it('defaults skills to an empty array when not provided', () => {
        const { skills, ...dataWithout } = sampleData;
        const profile = createStudentProfile(dataWithout);
        expect(profile.skills).toEqual([]);
    });

    it('defaults funFacts to an empty array when not provided', () => {
        const { funFacts, ...dataWithout } = sampleData;
        const profile = createStudentProfile(dataWithout);
        expect(profile.funFacts).toEqual([]);
    });

    it('returns a new object (does not mutate input)', () => {
        const profile = createStudentProfile(sampleData);
        expect(profile).not.toBe(sampleData);
    });
});
