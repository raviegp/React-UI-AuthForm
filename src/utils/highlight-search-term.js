import React from 'react';

const highlightSearchTerm = (noteText, searchTerm) => {
    if (!searchTerm) {
      return searchTerm;
    }
    return (<span>
      { noteText.split(searchTerm)
        .reduce((prev, current, i) => {
          if (!i) {
            return [current];
          }
          return prev.concat(<b key={searchTerm + current}>{ searchTerm }</b>, current);
        }, [])
      }
    </span>);
};

export default highlightSearchTerm;