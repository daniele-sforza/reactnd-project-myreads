import React, { Component } from 'react';
import Book from './Book'

class BookShelf extends Component {
  render() {
    let filteredBooks = this.props.books.filter((book) => book.shelf === this.props.shelf);

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ this.props.title }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              filteredBooks.map(book => (
                <Book 
                  key={book.id} 
                  book={book}
                  onUpdate={this.props.onUpdate}
                />
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf