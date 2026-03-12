    import React, { useState } from 'react';

function JournalForm({ userId, onSubmit, onAnalyze, isLoading }) {
    const [formData, setFormData] = useState({
        userId: userId,
        ambience: 'forest',
        text: ''
    });
    const [analysis, setAnalysis] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);

    const ambiences = ['forest', 'ocean', 'mountain', 'rain', 'desert', 'lake'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAnalyze = async () => {
        if (!formData.text.trim()) {
            alert('Please write something to analyze');
            return;
        }

        setAnalyzing(true);
        const result = await onAnalyze(formData.text, formData.ambience);
        if (result) {
            setAnalysis(result);
        }
        setAnalyzing(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.text.trim()) {
            alert('Please write your journal entry');
            return;
        }

        await onSubmit(formData);
        setFormData(prev => ({
            ...prev,
            text: ''
        }));
        setAnalysis(null);
    };

    return (
        <div className="journal-form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="ambience">Nature Ambience:</label>
                    <select
                        id="ambience"
                        name="ambience"
                        value={formData.ambience}
                        onChange={handleChange}
                        disabled={isLoading}
                    >
                        {ambiences.map(amb => (
                            <option key={amb} value={amb}>
                                {amb.charAt(0).toUpperCase() + amb.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="text">Your Journal Entry:</label>
                    <textarea
                        id="text"
                        name="text"
                        value={formData.text}
                        onChange={handleChange}
                        placeholder="Write about your experience..."
                        disabled={isLoading}
                    />
                </div>

                <div className="button-group">
                    <button
                        type="button"
                        onClick={handleAnalyze}
                        className="analyze-button"
                        disabled={isLoading || analyzing || !formData.text.trim()}
                    >
                        {analyzing ? 'Analyzing...' : '🔍 Analyze Emotion'}
                    </button>
                    <button
                        type="submit"
                        className="submit-button"
                        disabled={isLoading || !formData.text.trim()}
                    >
                        {isLoading ? 'Saving...' : '💾 Save Entry'}
                    </button>
                </div>
            </form>

            {analysis && (
                <div className="analysis-result">
                    <h3>Analysis Result:</h3>
                    <div className="emotion-tag">
                        Emotion: {analysis.emotion}
                    </div>
                    <div className="keywords">
                        {analysis.keywords.map((keyword, index) => (
                            <span key={index} className="keyword-tag">
                                #{keyword}
                            </span>
                        ))}
                    </div>
                    <p><strong>Summary:</strong> {analysis.summary}</p>
                </div>
            )}
        </div>
    );
}

export default JournalForm;