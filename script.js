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

function addBookToLibrary(title, author, pageCount, haveRead, library) {
  const newBook = new Book(title, author, pageCount, haveRead);
  library.push(newBook);
}

var myLibrary = [];

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true, myLibrary);
addBookToLibrary("Anathem", "Neal Stephenson", 642, true, myLibrary);
addBookToLibrary("Ada, or Ardor", "Vladimir Nabokov", 311, false, myLibrary);

const bookContainer = document.getElementById("book-container");

myLibrary.forEach(book => {
  const card = document.createElement("div");
  card.classList.add("book-card");

  const cardContent = `
  <h2>${book.title}</h2>
  <p>Author: ${book.author}</p>
  <p>Page Count: ${book.pageCount}</p>
  <label><input type="checkbox"> I've read this</label>
  `;
  card.innerHTML = cardContent;
  if (book.haveRead) {
    const checkBox = card.querySelector('input[type="checkbox"]')
    checkBox.checked = true;
  }
  bookContainer.appendChild(card);
})