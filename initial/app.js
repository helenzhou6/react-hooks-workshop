import React from "react";
import ReactDOM from "react-dom";

const fetchAuthorBooks = author => {
  const url = encodeURI(
    `https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}`
  );
  return fetch(url).then(res => res.json());
};

const fetchBookInfo = isbn =>
  fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`).then(
    res => res.json()
  );

// ### Task
// 1. Use fetchBookInfo() to fetch book data on page load
// 2. Display the book title(s) or "Loading" when waiting for data
// 4. Then fetch other books from same author - using the author name of the first book `data.items[0].volumeInfo.authors[0]`
//     - Use fetchAuthorBooks()
// 5. Display error messages if api call fails
// 6. Refactor to use async / await and try / catch

const App = () => {
  const isbn = "0747532699";
  return (
    <div className="content">
      <h1>Your Book</h1>
      {/* Book title should be here (for each item in items array display each book's title (volumeInfo.title) ) */}
      <h2>Other Books from the same author</h2>
      {/* Other book titles from the same author should be here 
      (for each item in items array display each book's title (volumeInfo.title) ) */}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
