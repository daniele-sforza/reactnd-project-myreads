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

  updateBook = (book, shelf) => {
    this.setState((state) => ({
      books: state.books.map((b) => {
        if (b === book) b.shelf = shelf;
        return b;
      })
    }))

    BooksAPI.update(book, shelf);
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    })
  }

  render() {
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
                  books={this.state.books}
                  title="Currently Reading"
                  shelf="currentlyReading"
                  onUpdate={this.updateBook}
                />
                <BookShelf 
                  books={this.state.books}
                  title="Want to Read"
                  shelf="wantToRead"
                  onUpdate={this.updateBook}
                />
                <BookShelf 
                  books={this.state.books}
                  title="Read"
                  shelf="read"
                  onUpdate={this.updateBook}
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
