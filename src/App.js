import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList'
import BookSearch from './BookSearch'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(results => {
      if (results.error) {
        this.setState({ books: [] });
      } else {
        this.setState({ books: results });
      }
    })
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(resp => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }));
    });
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <BookSearch books={this.state.books} updateShelf={this.updateShelf}/>
        )}/>

        <Route exact path="/" render={() => (
          <BookList books={this.state.books} updateShelf={this.updateShelf}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
