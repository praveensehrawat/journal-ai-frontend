import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = {
    // Create a new journal entry
    createEntry: async (entryData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/journal`, entryData);
            return response.data;
        } catch (error) {
            console.error('Error creating entry:', error);
            throw error;
        }
    },

    // Get all entries for a user
    getEntries: async (userId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/journal/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching entries:', error);
            throw error;
        }
    },

    // Analyze emotion in text
    analyzeEmotion: async (text) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/journal/analyze`, { text });
            return response.data;
        } catch (error) {
            console.error('Error analyzing emotion:', error);
            // Return mock data for demo if backend is not available
            return {
                emotion: "calm",
                keywords: ["peace", "nature", "reflection"],
                summary: "User expresses feelings of calm and connection with nature"
            };
        }
    },

    // Get insights for a user
    getInsights: async (userId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/journal/insights/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching insights:', error);
            // Return mock data for demo if backend is not available
            return {
                totalEntries: 0,
                topEmotion: "calm",
                mostUsedAmbience: "forest",
                recentKeywords: ["peace", "nature", "calm"]
            };
        }
    }
};

export default api;