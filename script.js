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

updateLibraryDisplay(myLibrary);

function updateLibraryDisplay(library) {
  const bookContainer = document.getElementById("book-container");

  myLibrary.forEach(book => {
    const card = document.createElement("div");
    card.classList.add("book-card");
  
    card.innerHTML = `
    <h2>${book.title}</h2>
    <p>Author: ${book.author}</p>
    <p>Page Count: ${book.pageCount}</p>
    <label><input type="checkbox"> I've read this</label>
    `;
    if (book.haveRead) {
      const checkBox = card.querySelector('input[type="checkbox"]')
      checkBox.checked = true;
    }
    bookContainer.appendChild(card);
  })
}



const addBook = document.getElementById("add-book");
addBook.addEventListener('click', showDialogue)

function showDialogue() {
  const dialogue = document.createElement('dialog');
  dialogue.classList.add('modal-dialogue');

  const dialogueContent = document.createElement('div');
  dialogueContent.classList.add('modal-content');

  const form = document.createElement('form');
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
  const submitButton = form.querySelector("#submit");
  submitButton.addEventListener('click', () => {
    submit();
    dialogue.close();
  });
  dialogueContent.appendChild(form);

  const closeButton = document.createElement('button');
  closeButton.classList.add('close');
  closeButton.textContent = 'Close';
  closeButton.addEventListener('click', () => {
    dialogue.close();
  });
  dialogueContent.appendChild(closeButton);

  dialogue.appendChild(dialogueContent);
  document.body.appendChild(dialogue);
  dialogue.showModal();
}

function submit() {
  const form = document.querySelector("form");

  const title = form.querySelector('#title').value;
  const author = form.querySelector('#author').value;
  const pageCount = form.querySelector('#pageCount').value;
  const haveReadInput = form.querySelector('#haveRead');
  let haveRead = haveReadInput.checked ? true : false;

  addBookToLibrary(title, author, pageCount, haveRead, myLibrary)

  clearLibraryDisplay();
  updateLibraryDisplay(myLibrary);
}

function clearLibraryDisplay() {
  const bookContainer = document.getElementById("book-container");
  while (bookContainer.firstChild) {
    bookContainer.firstChild.remove();
  }
}