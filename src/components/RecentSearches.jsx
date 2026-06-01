 function RecentSearches({ recentSearches, onSearchClick, onRemove }) {
    if (recentSearches.length === 0) return null

    return (
      <div className="recent-searches">
        <h3>Recent Searches</h3>
        <div className="search-tags">
          {recentSearches.map((term, index) => (
             <div key={index} className="search-tag">
              <button onClick={() => onSearchClick(term)}>{term}</button>
              <button onClick={() => onRemove(index)}>✕</button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  export default RecentSearches
