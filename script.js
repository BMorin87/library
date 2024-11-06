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

const book = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
const info = book.info();
console.log(info);