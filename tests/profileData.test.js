/**
 * @jest-environment node
 */

'use strict';

const path = require('path');
const fs = require('fs');

const PROFILE_JSON_PATH = path.resolve(__dirname, '../data/profile.json');

const REQUIRED_FIELDS = [
    'name',
    'title',
    'image',
    'studentId',
    'age',
    'hometown',
    'gpa',
    'email',
    'specialization',
    'thesis',
    'internship',
    'futureGoal',
    'achievements',
    'skills',
    'funFacts',
];

describe('data/profile.json', () => {
    let profiles;

    beforeAll(() => {
        const raw = fs.readFileSync(PROFILE_JSON_PATH, 'utf8');
        profiles = JSON.parse(raw);
    });

    it('is valid JSON and an object', () => {
        expect(typeof profiles).toBe('object');
        expect(profiles).not.toBeNull();
    });

    it('contains at least one student profile', () => {
        expect(Object.keys(profiles).length).toBeGreaterThan(0);
    });

    it('each profile has all required fields', () => {
        Object.entries(profiles).forEach(([key, profile]) => {
            REQUIRED_FIELDS.forEach(field => {
                expect(profile).toHaveProperty(field);
            });
        });
    });

    it('each profile has a non-empty name string', () => {
        Object.values(profiles).forEach(profile => {
            expect(typeof profile.name).toBe('string');
            expect(profile.name.trim().length).toBeGreaterThan(0);
        });
    });

    it('each profile has a valid email format', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        Object.values(profiles).forEach(profile => {
            expect(profile.email).toMatch(emailRegex);
        });
    });

    it('each profile has a positive age', () => {
        Object.values(profiles).forEach(profile => {
            expect(typeof profile.age).toBe('number');
            expect(profile.age).toBeGreaterThan(0);
        });
    });

    it('each profile has a non-empty achievements array', () => {
        Object.values(profiles).forEach(profile => {
            expect(Array.isArray(profile.achievements)).toBe(true);
            expect(profile.achievements.length).toBeGreaterThan(0);
        });
    });

    it('each profile has a non-empty skills array', () => {
        Object.values(profiles).forEach(profile => {
            expect(Array.isArray(profile.skills)).toBe(true);
            expect(profile.skills.length).toBeGreaterThan(0);
        });
    });

    it('each profile has a non-empty funFacts array', () => {
        Object.values(profiles).forEach(profile => {
            expect(Array.isArray(profile.funFacts)).toBe(true);
            expect(profile.funFacts.length).toBeGreaterThan(0);
        });
    });

    it('each profile image path starts with "assets/"', () => {
        Object.values(profiles).forEach(profile => {
            expect(typeof profile.image).toBe('string');
            expect(profile.image).toMatch(/^assets\//);
        });
    });

    it('each profile has a unique studentId', () => {
        const ids = Object.values(profiles).map(p => p.studentId);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(ids.length);
    });
});
