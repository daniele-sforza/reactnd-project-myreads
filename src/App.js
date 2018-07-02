import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf';
import SearchBooks from './SearchBooks'
import debounce from 'lodash.debounce'

class BooksApp extends React.Component {

  state = {
    books: [],    // my library
    results: []   // search results
  }

  componentDidMount() {
    // get all the books in my library from the server
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    })
  }

  updateBook = (book, shelf) => {
    // Check if the book to update the shelf to, is already in my library
    let found = this.state.books.find(el => el.id === book.id);
    
    // if it's not then update his shelf and add it to the library
    if (!found) {
      this.setState((prevState) => {
        book.shelf = shelf;
        return {books: prevState.books.concat(book)}
      })
    } else {
    // if it's alredy in the library then change his shelf
      this.setState((state) => ({
        books: state.books.map((b) => {
          if (b.id === book.id) b.shelf = shelf;
          return b;
        })
      }))
    }

    // Update the book shelf to the server
    BooksAPI.update(book, shelf);
  }

  // debounce the search function to avoid fetch requests on every keystroke
  handleSearch = debounce(query => this.searchBooks(query), 500);

  searchBooks = (query) => {
    // if query is empty clear the results and return 
    if (query === '') {
      this.resetResults();
      return;
    }

    // search
    BooksAPI.search(query)
      .then(results => {
        let searchResults;
        if (!results.error) {
          // compare the search results with my library and update the shelves to display correct state in search results
          searchResults = results.map((b) => {
            let found = this.state.books.find(el => el.id === b.id);
            if (found) b.shelf = found.shelf;
            return b; 
          })
        }

        results.error ? this.resetResults() : this.setState({ results: searchResults })
      })
      .catch(error => {
        console.log(error);
      })
  }
  
  resetResults = () => {
    this.setState({results: []})
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <SearchBooks
            onSearch={this.handleSearch}
            onUpdate={this.updateBook}
            onReset={this.resetResults}
            results={this.state.results}
          />
        )}/>

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
