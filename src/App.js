
/*Main Application component.
This component holds the state of the bookshelves and passes to the other
components as props.*/

import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList'
import BookSearch from './BookSearch'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    /*books array is maintained on the back-end server via the BooksAPI. The API
    is used to change a book's "shelf" value.*/
    books: []
  }

  componentDidMount() {
    //Retrieve books currently on a shelf from the back-end server, set as state
    BooksAPI.getAll().then(results => {
      if (results.error) {
        this.setState({ books: [] });
      } else {
        this.setState({ books: results });
      }
    })
  }

  /*Method to move a book from one shelf to another. Passed through the main page
  and the search page to the "Book" component as a prop */
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(resp => {
      book.shelf = shelf;
      this.setState(state => ({
        /*Check current state to see if book is on a shelf, and add/update the books array
        with the user's new choice */
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }));
    });
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <BookSearch updateShelf={this.updateShelf}/>
        )}/>

        <Route exact path="/" render={() => (
          <BookList books={this.state.books} updateShelf={this.updateShelf}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
