import React, { useState, useEffect } from 'react';
import JournalForm from './components/JournalForm';
import JournalList from './components/JournalList';
import Insights from './components/Insights';
import api from './services/api';
import './App.css';

function App() {
    const [entries, setEntries] = useState([]);
    const [insights, setInsights] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('write');
    const userId = 'user123'; // Hardcoded for demo

    useEffect(() => {
        fetchEntries();
        fetchInsights();
    }, []);

    const fetchEntries = async () => {
        try {
            setLoading(true);
            const data = await api.getEntries(userId);
            setEntries(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch entries');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchInsights = async () => {
        try {
            const data = await api.getInsights(userId);
            setInsights(data);
        } catch (err) {
            console.error('Failed to fetch insights:', err);
        }
    };

    const handleSubmitEntry = async (entryData) => {
        try {
            setLoading(true);
            await api.createEntry(entryData);
            await fetchEntries();
            await fetchInsights();
            setError(null);
        } catch (err) {
            setError('Failed to create entry');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAnalyze = async (text, ambience) => {
        try {
            const analysis = await api.analyzeEmotion(text);
            return analysis;
        } catch (err) {
            setError('Failed to analyze emotion');
            console.error(err);
            return null;
        }
    };

    return (
        <div className="App">
            <header className="app-header">
                <h1>🌿 AI-Assisted Journal System</h1>
                <p>Reflect on your nature experiences with AI insights</p>
            </header>

            {error && (
                <div className="error-message">
                    ⚠️ {error}
                </div>
            )}

            <div className="tab-navigation">
                <button 
                    className={`tab-button ${activeTab === 'write' ? 'active' : ''}`}
                    onClick={() => setActiveTab('write')}
                >
                    ✍️ Write Entry
                </button>
                <button 
                    className={`tab-button ${activeTab === 'entries' ? 'active' : ''}`}
                    onClick={() => setActiveTab('entries')}
                >
                    📖 View Entries
                </button>
                <button 
                    className={`tab-button ${activeTab === 'insights' ? 'active' : ''}`}
                    onClick={() => setActiveTab('insights')}
                >
                    📊 Insights
                </button>
            </div>

            <div className="main-content">
                {activeTab === 'write' && (
                    <JournalForm 
                        userId={userId}
                        onSubmit={handleSubmitEntry}
                        onAnalyze={handleAnalyze}
                        isLoading={loading}
                    />
                )}

                {activeTab === 'entries' && (
                    <JournalList 
                        entries={entries} 
                        isLoading={loading}
                    />
                )}

                {activeTab === 'insights' && (
                    <Insights 
                        insights={insights}
                        isLoading={loading}
                    />
                )}
            </div>
        </div>
    );
}

export default App;