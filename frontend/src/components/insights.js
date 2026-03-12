import React from 'react';

function Insights({ insights, isLoading }) {
    if (isLoading) {
        return <div className="loading">Loading insights...</div>;
    }

    if (!insights || insights.totalEntries === 0) {
        return (
            <div className="no-data">
                <p>📊 No insights available yet</p>
                <p>Write more entries to see your emotional patterns!</p>
            </div>
        );
    }

    return (
        <div className="insights-container">
            <div className="insight-card">
                <h3>Total Entries</h3>
                <div className="insight-value">{insights.totalEntries}</div>
            </div>

            <div className="insight-card">
                <h3>Top Emotion</h3>
                <div className="insight-value" style={{ fontSize: '2em' }}>
                    {insights.topEmotion || 'N/A'}
                </div>
            </div>

            <div className="insight-card">
                <h3>Favorite Ambience</h3>
                <div className="insight-value" style={{ fontSize: '2em' }}>
                    {insights.mostUsedAmbience 
                        ? insights.mostUsedAmbience.charAt(0).toUpperCase() + insights.mostUsedAmbience.slice(1)
                        : 'N/A'}
                </div>
            </div>

            <div className="insight-card">
                <h3>Recent Keywords</h3>
                <div className="insight-keywords">
                    {insights.recentKeywords && insights.recentKeywords.length > 0 ? (
                        insights.recentKeywords.map((keyword, index) => (
                            <span key={index} className="keyword-item">
                                #{keyword}
                            </span>
                        ))
                    ) : (
                        <p>No keywords yet</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Insights;