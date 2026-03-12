import React from 'react';

function JournalList({ entries, isLoading }) {
    if (isLoading) {
        return <div className="loading">Loading entries...</div>;
    }

    if (!entries || entries.length === 0) {
        return (
            <div className="no-data">
                <p>📝 No journal entries yet</p>
                <p>Write your first entry to start your journey!</p>
            </div>
        );
    }

    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="entries-list">
            {entries.map((entry, index) => (
                <div key={index} className="entry-card">
                    <div className="entry-header">
                        <span className="entry-ambience">
                            🌿 {entry.ambience.charAt(0).toUpperCase() + entry.ambience.slice(1)}
                        </span>
                        <span className="entry-date">
                            {formatDate(entry.createdAt)}
                        </span>
                    </div>
                    <p className="entry-text">{entry.text}</p>
                    {entry.analysis && (
                        <div>
                            <span className="entry-emotion">
                                Emotion: {entry.analysis.emotion}
                            </span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default JournalList;