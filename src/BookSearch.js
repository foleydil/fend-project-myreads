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

  updateQuery = (query) =>
    this.setState({ query: query }, this.updateResults)

  updateResults() {
    if (this.state.query === '' || this.state.query === undefined) {
      return this.setState({ results: [] });
    }
    BooksAPI.search(this.state.query.trim()).then(results => {
      if (results.error) {
        return this.setState({ results: [] });
      } else {
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
    BooksAPI.getAll().then(results => {
      if (results.error) {
        return this.setState({ books: [] });
      } else {
        return this.setState({ books: results });
      }
    })
  }

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
                />
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookSearch
