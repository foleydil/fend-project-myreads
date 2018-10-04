import React, { Component } from 'react'

//TODO: separate names of authors

class Book extends Component {
  render() {
    let shelf = 'none'
    if(this.props.book.shelf) {
      shelf = this.props.book.shelf;
    }

    return(
      <li key={this.key}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.props.book.imageLinks && this.props.book.imageLinks.thumbnail || ''}")` }}></div>

            <div className="book-shelf-changer">

              <select>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading" selected={(shelf==='currentlyReading') ? 'selected' : ''}>Currently Reading</option>
                <option value="wantToRead" selected={(shelf==='wantToRead') ? 'selected' : ''}>Want to Read</option>
                <option value="read"selected={(shelf==='read') ? 'selected' : ''}>Read</option>
                <option value="none"selected={(shelf==='none') ? 'selected' : ''}>None</option>
              </select>
            </div>
          </div>

          <div className="book-title">{this.props.book.title}</div>

          <div className="book-authors">
            {this.props.book.authors}
          </div>
        </div>
      </li>
    )
  }
}

export default Book
