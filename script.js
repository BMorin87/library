class Book {
  constructor(title, author, pageCount, haveRead) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.haveRead = haveRead;
  }

  info = function() {
    var bookInfo = `"${this.title}" by ${this.author}, ${this.pageCount} pages, `;

    if (this.haveRead) {
      bookInfo += "read";
    }
    else {
      bookInfo += "not read yet";
    }

    return bookInfo;
  }
}

var myLibrary = [];
initializeLibrary();
updateLibraryDisplay(myLibrary);

const addBookButton = document.getElementById("add-book");
addBookButton.addEventListener('click', showDialog);

function initializeLibrary() {
  addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true, myLibrary);
  addBookToLibrary("Anathem", "Neal Stephenson", 642, true, myLibrary);
  addBookToLibrary("Ada, or Ardor", "Vladimir Nabokov", 311, false, myLibrary);
}

function addBookToLibrary(title, author, pageCount, haveRead, library) {
  const newBook = new Book(title, author, pageCount, haveRead);
  library.push(newBook);
}


function updateLibraryDisplay(library) {
  const bookContainer = document.getElementById("book-container");

  library.forEach((book, index) => {
    // Create a card to display for each book in the library.
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.dataset.index = index;
    card.innerHTML = `
    <h2 class="title">${book.title}</h2>
    <p class="author">Author: ${book.author}</p>
    <p class="pageCount">Page Count: ${book.pageCount}</p>
    <label><input type="checkbox" class="haveRead"> I've read this</label><br>
    <button type="button" id="remove">Remove book</button>
    `;

    // Toggle the haveRead boolean if the user clicks the checkbox.
    const checkBox = card.querySelector('input[type="checkbox"]')
    if (book.haveRead) { checkBox.checked = true; }
    checkBox.addEventListener('change', toggleHaveRead)

    const removeButton = card.querySelector("#remove");
    removeButton.addEventListener('click', removeBook);

    bookContainer.appendChild(card);
  })
}

function toggleHaveRead() {
  // The checkbox is a grandchild of the display card.
  const card = this.parentNode.parentNode;
  const index = card.dataset.index;
  myLibrary[index].haveRead = this.checked ? true : false;
}

function removeBook() {
  // Remove the book from the DOM.
  const card = this.parentNode;
  card.remove();

  // And from the internal library array.
  const index = card.dataset.index;
  myLibrary.splice(index, 1);
}

function showDialog() {
  // Create the modal dialog for the user to add books.
  const dialog = document.createElement('dialog');
  document.body.appendChild(dialog);
  dialog.classList.add('modal-dialogue');
  const dialogContent = document.createElement('div');
  dialog.appendChild(dialogContent);
  dialogContent.classList.add('modal-content');
  const form = document.createElement('form');
  dialogContent.appendChild(form);
  form.innerHTML = `
  <label for="title">Title:</label>
  <input type="text" id="title" name="title"><br>
  <label for="author">Author:</label>
  <input type="text" id="author" name="author"><br>
  <label for="pageCount">Page count:</label>
  <input type="text" id="pageCount" name="pageCount"><br>
  <label for="haveRead"><input type="checkbox" id="haveRead" name="haveRead">I've read this</label><br>
  <button type="button" id="submit">Submit book</button>
  `;
  // Button for the user to submit a book to the library.
  const submitButton = form.querySelector("#submit");
  submitButton.addEventListener('click', () => {
    submit();
    dialog.close();
    dialog.remove();
  });

  // Button to back out of the modal dialog.
  const closeButton = document.createElement('button');
  dialogContent.appendChild(closeButton);
  closeButton.classList.add('close');
  closeButton.textContent = 'Close';
  closeButton.addEventListener('click', () => {
    dialog.close();
    dialog.remove();
  });

  dialog.showModal();
}

function submit() {
  // Get the user's input book information.
  const form = document.querySelector("form");
  const title = form.querySelector('#title').value;
  const author = form.querySelector('#author').value;
  const pageCount = form.querySelector('#pageCount').value;
  const haveReadInput = form.querySelector('#haveRead');
  let haveRead = haveReadInput.checked ? true : false;

  // Add the book to the internal library.
  addBookToLibrary(title, author, pageCount, haveRead, myLibrary)

  // Display the library with the new book added.
  clearLibraryDisplay();
  updateLibraryDisplay(myLibrary);
}

function clearLibraryDisplay() {
  const bookContainer = document.getElementById("book-container");
  while (bookContainer.firstChild) {
    bookContainer.firstChild.remove();
  }
}