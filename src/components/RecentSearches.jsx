 function RecentSearches({ recentSearches, onSearchClick }) {
    if (recentSearches.length === 0) return null

    return (
      <div className="recent-searches">
        <h3>Recent Searches</h3>
        <div className="search-tags">
          {recentSearches.map((term, index) => (
            <button key={index} onClick={() => onSearchClick(term)}>                                                                                                                                   
              {term}  
            </button>
          ))}
        </div>
      </div>
    )
  }

  export default RecentSearches
