# MyReads Project

For this project I was given a template as a starting point to create a bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read.

I built the application using React and an API server and client library provided to persist information as you interact with the application.



## App Functionality

In this application, the main page displays a list of "shelves" (i.e. categories), each of which contains a number of books. The three shelves are:

- Currently Reading

- Want to Read

- Read

  

Each book has a control that lets you select the shelf for that book. When you select a different shelf, the book moves there. The default value for the control is always the current shelf the book is in. 

The main page also has a link to `/search`, a search page that allows you to find books to add to your library.

The search page has a text input that may be used to find books. As the value of the text input changes, the books that match that query are displayed on the page, along with a control that lets you add the book to your library.

When a book is on a bookshelf, it has the same state on both the main application page and the search page. 

The search page also has a link to `/` (the root URL), which leads back to the main page. 

Every cover is a link to a page with the details of the book.



## Requirements

To run the project:

* install all project dependencies with `npm install`

* start the server with `npm start`

* the URL will be `http://localhost:3000/`

  

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.
