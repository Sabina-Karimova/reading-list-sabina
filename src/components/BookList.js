import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/books', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching book data:', error);
      });
  }, []);

  const toggleReadStatus = (index) => {
    const updatedBooks = [...books];
    updatedBooks[index].read = !updatedBooks[index].read;
    setBooks(updatedBooks);

    axios.post('http://localhost:5000/update_read_status', {
      book_id: updatedBooks[index].id,
      read: updatedBooks[index].read
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .catch(error => {
      console.error('Error updating read status:', error);
    });
  };

  const updateReadCount = (index, increment) => {
    const updatedBooks = [...books];
    if (updatedBooks[index].read_count !== undefined) {
      updatedBooks[index].read_count += increment;
    } else {
      updatedBooks[index].read_count = increment;
    }

    if (updatedBooks[index].read_count < 0) {
      updatedBooks[index].read_count = 0;
    }

    setBooks(updatedBooks);

    axios.post('http://localhost:5000/update_read_count', {
      book_id: updatedBooks[index].id,
      read_count: updatedBooks[index].read_count
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .catch(error => {
      console.error('Error updating read count:', error);
    });
  };

  return (
    <div className="container-fluid book-list-main">
      <h1 className="text-center mb-2 book-list-header">Book List</h1>
      <div className="row book-list-container" id="book-list">
        {books.map((book, index) => (
          <div className="col-md-2 mb-2" key={index}>
            <div className="card h-80">
              <img src={`${book.cover}`} className="card-img-top" alt={`${book.title} cover`} />
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
                <p className="card-text">Year: {book.publication_year}</p>
                
                <br/>
                <button
                  className='btn-success' 
                  onClick={() => updateReadCount(index, -1)}
                >
                '-'
                </button>
                <button
                  className='btn-success'
                  onClick={() => updateReadCount(index, 0 - (book.read_count || 0))}
                >
                  'Reset'
                </button>
                <button
                  className='btn-success'
                  onClick={() => updateReadCount(index, 1)}
                >
                  '+'
                </button>
                <p className="card-text">Read page count: {book.read_count ? book.read_count : '0'}</p>


                <br/>
                <button
                  className={`btn ${book.read ? 'btn-success' : 'btn-secondary'}`}
                  onClick={() => toggleReadStatus(index)}
                >
                  {book.read ? 'Read' : 'Not Read'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
