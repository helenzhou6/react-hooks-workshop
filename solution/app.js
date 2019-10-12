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

const App = () => {
  const [hasError, setHasError] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [authorBooks, setAuthorBooks] = React.useState("");
  const isbn = "0747532699";

  React.useEffect(() => {
    try {
      (async () => {
        const data = isbn && (await fetchBookInfo(isbn));
        setData(data);
      })();
    } catch (err) {
      console.log(err);
      setHasError(true);
    }
  }, []); // only adds listener on mount

  React.useEffect(() => {
    if (!data) return;
    try {
      (async () => {
        const authorBooks = await fetchAuthorBooks(
          data.items[0].volumeInfo.authors[0]
        );
        setAuthorBooks(authorBooks);
      })();
    } catch (err) {
      console.log(err);
      setHasError(true);
    }
  }, [data]); // only adds listener on mount

  if (hasError) return <h1>An Error happened! Please try again later</h1>;

  return (
    <div className="content">
      <h1>Your Book</h1>
      {data && Array.isArray(data.items)
        ? data.items.map(item => (
          <h3 key={item.volumeInfo.title}>{item.volumeInfo.title}</h3>
        ))
        : "loading"}
      <h2>Other Books from the same author</h2>
      {authorBooks && Array.isArray(authorBooks.items)
        ? authorBooks.items.map(item => (
          <h3 key={item.volumeInfo.title}>{item.volumeInfo.title}</h3>
        ))
        : "Loading"}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
