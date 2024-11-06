function Book(title, author, pageCount, haveRead) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.haveRead = haveRead;

  this.info = function() {
    var bookInfo = `"${this.title}" by ${this.author}, ${this.pageCount} pages, `

    if (this.haveRead) {
      bookInfo += "read"
    }
    else {
      bookInfo += "not read yet"
    }

    return bookInfo;
  }
}

var myLibrary = [];

function addBookToLibrary(title, author, pageCount, haveRead, library) {
  const newBook = new Book(title, author, pageCount, haveRead);
  library.push(newBook);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true, myLibrary);
addBookToLibrary("Anathem", "Neal Stephenson", 642, true, myLibrary);
addBookToLibrary("Ada, or Ardor", "Vladimir Nabokov", 311, false, myLibrary);
myLibrary.forEach(book => console.log(book.title));