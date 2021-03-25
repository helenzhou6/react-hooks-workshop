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
// Final outcome: https://raw.githubusercontent.com/helenzhou6/react-hooks-workshop/master/final.gif
// 1. Use provided fetchBookInfo(isbn) to fetch the book data on component mount
// 2. Under 'Your Book' heading
//     - display "Loading" when waiting for the API call to finish
//     - then display the book title(s)
// 4. Then fetch other books from same author, once the original API call has finished.
//     - Use the author from the first API call (`data.items[0].volumeInfo.authors[0]`)
//     - And use provided `fetchAuthorBooks(author)`
// 5. Under the 'Other Books from the same author', display "Loading" when waiting for the book
//     - display "Loading" when waiting for second API call to finish
//     - then display the other books by the same author
// 5. Display an error message if either API call fails
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
