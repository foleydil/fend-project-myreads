import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList'
import BookSearch from './BookSearch'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    bookList: []
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <BookSearch />
        )}/>

        <Route exact path="/" render={() => (
          <BookList />
        )}/>
      </div>
    )
  }
}

export default BooksApp
