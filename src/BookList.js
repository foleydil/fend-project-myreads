import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'


class BookList extends Component {

  componentDidMount() {
    BooksAPI.getAll().then(results => {
      if (results.error) {
        return this.setState({ books: [] });
      } else {
        return this.setState({ books: results });
      }
    })
  }

  state = {
    books: []
  }

  render() {
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.state.books.filter((book) =>
                    book.shelf === 'currentlyReading').map((book, key) =>
                    <Book
                      book={book}
                      key={key}
                      />
                  )}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.state.books.filter((book) =>
                    book.shelf === 'wantToRead').map((book, key) =>
                    <Book
                      book={book}
                      key={key}
                      />
                  )}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.state.books.filter((book) =>
                    book.shelf === 'read').map((book, key) =>
                    <Book
                      book={book}
                      key={key}
                      />
                  )}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link
            to='/search'
          >Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BookList
