import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response1 = await fetch('https://www.googleapis.com/books/v1/volumes?q=harry+potter');
        const data1 = await response1.json();
        const response2 = await fetch('https://www.googleapis.com/books/v1/volumes?q=Sherlock+Holmes');
        const data2 = await response2.json();
        const combinedData = [...data1.items, ...data2.items];
        setBooks(combinedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`);
      const searchData = await response.json();
      setBooks(searchData.items);
    } catch (error) {
      console.error('Error searching books:', error);
    }
  };

  const handleBookClick = (book) => {
    // Handle click event to expand book's banner and show detailed information
    console.log('Clicked book:', book);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Virtual Bookstore</h1>
        <div className="search-bar">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for books..."
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </header>
      <div className="books-container">
        {books.map((book, index) => (
          <div className="book-card" key={index} onClick={() => handleBookClick(book)}>
            <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
            <h3>{book.volumeInfo.title}</h3>
            <p>{book.volumeInfo.authors?.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
