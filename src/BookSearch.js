/* Search page component.
Allows the user to search for books (housed on back-end server) and add to their shelves.
Each Book's dropdown contains the current shelf, or "none" if not on a shelf.
This component receives the 'updateShelf' method as a prop from App.js*/

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'


class BookSearch extends Component {
  state = {
    query: '',
    results: [],
    books: []
  }

  /* Method to update search bar text when a user makes changes in the
  search field */
  updateQuery = (query) =>
    this.setState({ query: query }, this.updateResults)

  /* Method to fetch search results from BooksAPI and set as "results"
  state. */
  updateResults() {
    if (this.state.query === '' || this.state.query === undefined) {
      return this.setState({ results: [] });
    }
    BooksAPI.search(this.state.query.trim()).then(results => {
      if (results.error) {
        return this.setState({ results: [] });
      } else {
        /* If the API fetch is successful and returns results, check
        if that book is already on a shelf, and update the "results"
        array with the current shelf before updating the state of "results"*/
        results.forEach(book => {
          let shelfCheck = this.state.books.filter((b) => book.id === b.id);
          if (shelfCheck[0]) {
            book.shelf = shelfCheck[0].shelf;
          }
        });
        return this.setState({ results: results });
      }
    })
  }

  componentDidMount() {
    //Retrieve array of books currently on a shelf from BooksAPI, set as state
    BooksAPI.getAll().then(results => {
      if (results.error) {
        return this.setState({ books: [] });
      } else {
        return this.setState({ books: results });
      }
    })
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.results.map((book, key) =>
              <Book
                book={book}
                key={key}
                updateShelf={this.props.updateShelf}
                />
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookSearch
