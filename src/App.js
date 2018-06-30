import React from 'react'
import { Route, Link } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf';

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    })
  }

  render() {
    const { books } = this.state;

    let currentlyReading = books.filter(book => 
      book.shelf === 'currentlyReading'
    );
    let wantToRead = books.filter(book => 
      book.shelf === 'wantToRead'
    );
    let read = books.filter(book => 
      book.shelf === 'read'
    );

    return (
      <div className="app">
        <Route exact path='/search' component={SearchBooks} />

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf 
                  books={currentlyReading}
                  title="Currently Reading"
                />
                <BookShelf 
                  books={wantToRead}
                  title="Want to Read"
                />
                <BookShelf 
                  books={read}
                  title="Read"
                />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">
                Add a book
              </Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
