class Book {
  constructor(title, author, pageCount, haveRead) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.haveRead = haveRead;
  }

  info = function () {
    var bookInfo = `"${this.title}" by ${this.author}, ${this.pageCount} pages, `;

    if (this.haveRead) {
      bookInfo += "read";
    } else {
      bookInfo += "not read yet";
    }

    return bookInfo;
  };
}

class Library {
  constructor(name = "My Library") {
    this.SetName(name);
    this.bookList = [];

    this.InitializeLibrary(this.bookList);
  }

  SetName = (name) => {
    this.name = name;
  };

  InitializeLibrary(bookList) {
    this.AddBook("The Hobbit", "J.R.R. Tolkien", 295, true, bookList);
    this.AddBook("Anathem", "Neal Stephenson", 642, true, bookList);
    this.AddBook("Ada, or Ardor", "Vladimir Nabokov", 311, false, bookList);
  }

  AddBook(title, author, pageCount, haveRead) {
    const newBook = new Book(title, author, pageCount, haveRead);
    this.bookList.push(newBook);
  }
}

class ScreenController {
  constructor() {
    // Load a default library.
    const library = new Library();
    this.activeLibrary = library;
    this.UpdateLibraryDisplay(library);

    // Add event listener to "Add book" button.
    const addBookButton = document.getElementById("add-book");
    addBookButton.addEventListener("click", () => this.ShowDialog());
  }

  UpdateLibraryDisplay(library) {
    const bookContainer = document.getElementById("book-container");

    library.bookList.forEach((book, index) => {
      const card = this.CreateCard(book, index);
      bookContainer.appendChild(card);
    });
  }

  CreateCard(book, index) {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.dataset.index = index;
    card.innerHTML = `
    <h2 class="title">${book.title}</h2>
    <p class="author">Author: ${book.author}</p>
    <p class="pageCount">Page Count: ${book.pageCount}</p>
    <label><input type="checkbox" class="haveRead" name="haveRead"> I've read this</label><br>
    <button type="button" class="remove">Remove book</button>
    `;

    this.CreateEventListeners(card, book);

    return card;
  }

  CreateEventListeners(card, book) {
    const checkBox = card.querySelector('input[type="checkbox"]');
    if (book.haveRead) {
      checkBox.checked = true;
    }
    checkBox.addEventListener("change", () => this.ToggleHaveRead(card, book));

    const removeButton = card.querySelector(".remove");
    removeButton.addEventListener("click", () => this.RemoveBook(card));
  }

  ToggleHaveRead(card, book) {
    const checkbox = card.querySelector(".haveRead");
    book.haveRead = checkbox.checked ? true : false;
  }

  RemoveBook(card) {
    const index = card.dataset.index;
    this.activeLibrary.bookList.splice(index, 1);
    card.remove();
  }

  ShowDialog() {
    const dialogDiv = this.CreateModalDialog();
    this.CreateDialogContent(dialogDiv);
    this.AddTitleValidation(dialogDiv);
    dialogDiv.showModal();
  }

  CreateModalDialog() {
    const dialog = document.createElement("dialog");
    dialog.classList.add("modal-dialogue");
    document.body.appendChild(dialog);

    return dialog;
  }

  CreateDialogContent(dialog) {
    const dialogContent = document.createElement("div");
    dialogContent.classList.add("modal-content");

    const form = document.createElement("form");
    form.innerHTML = `
    <label for="title">Title:</label>
    <input type="text" id="title" name="title" required minlength='2'>
    <span id="titleError" class='error' aria-live="polite"></span><br>
    <label for="author">Author:</label>
    <input type="text" id="author" name="author" required minlength='2'>
    <span id="authorError" class="error" aria-live="polite"></span><br>
    <label for="pageCount">Page count:</label>
    <input type="text" id="pageCount" name="pageCount" required>
    <span id="pageError" class="error" aria-live="polite"></span><br>
    <label for="haveRead"><input type="checkbox" id="haveRead" name="haveRead">I've read this</label><br>
    <button type="button" id="submit">Submit book</button>
    `;

    // Button for the user to submit a book to the library.
    // const submitButton = form.querySelector("#submit");
    // submitButton.addEventListener("click", () => this.Submit(dialog));

    // Button to back out of the modal dialog.
    const closeButton = document.createElement("button");
    closeButton.classList.add("close");
    closeButton.textContent = "Close";
    closeButton.addEventListener("click", () => {
      dialog.close();
      dialog.remove();
    });

    dialogContent.appendChild(form);
    dialogContent.appendChild(closeButton);
    dialog.appendChild(dialogContent);
  }

  AddTitleValidation(dialog) {
    const form = dialog.querySelector("form");
    const title = form.querySelector("#title");
    const titleError = form.querySelector("#titleError");
    const author = form.querySelector("#author");
    const authorError = form.querySelector("#authorError");
    const pageCount = form.querySelector("#pageCount");
    const pageError = form.querySelector("#pageError");

    function showTitleError() {
      if (title.validity.valueMissing) {
        titleError.textContent = "Please enter the book's title.";
      } else if (title.validity.tooShort) {
        titleError.textContent = `Title should be at least ${title.minLength} characters.`;
      }
      titleError.className = "error active";
    }

    function showAuthorError() {
      if (author.validity.valueMissing) {
        authorError.textContent = "Please enter the book's author.";
      } else if (author.validity.tooShort) {
        authorError.textContent = `Author should be at least ${author.minLength} character.`
      }
      authorError.className = "error active";
    }

    function showPageError() {
      const input = parseInt(pageCount.value);
      const inputIsNumber = !isNaN(input);

      if (pageCount.validity.valueMissing) {
        pageError.textContent = "Please enter a page count.";
      } else if (!inputIsNumber) {
        pageError.textContent = "Please enter a number.";
      } else if (input < 0) {
        pageError.textContent = "Please enter a value greater than zero."
      }
    }

    const submitButton = form.querySelector("#submit");
    submitButton.addEventListener("click", (event) => {
      if (!title.validity.valid) {
        showTitleError();
      } else if (!author.validity.valid) {
        showAuthorError();
      } else if (!pageCount.validity.valid) {
        showPageError();
      } else {
        this.Submit(form);
      }
    });

    title.addEventListener("input", (event) => {
      if (title.validity.valid) {
        titleError.textContent = "";
        titleError.classList.remove("active");
      } else {
        showTitleError();
      }
    })

    author.addEventListener("input", (event) => {
      if (author.validity.valid) {
        authorError.textContent = "";
        authorError.classList.remove("active");
      } else {
        showAuthorError();
      }
    });

    pageCount.addEventListener("input", (event) => {
      if (pageCount.validity.valid) {
        pageError.textContent = "";
        pageError.classList.remove("active");
      } else {
        showAuthorError();
      }
    });
  }

  Submit(form) {
    // Get the user's input book information.
    const title = form.querySelector("#title").value;
    const author = form.querySelector("#author").value;
    const pageCount = form.querySelector("#pageCount").value;
    const haveReadInput = form.querySelector("#haveRead");
    let haveRead = haveReadInput.checked ? true : false;

    // Add the book to the internal library.
    this.activeLibrary.AddBook(title, author, pageCount, haveRead);

    // Display the library with the new book added.
    this.ClearLibraryDisplay();
    this.UpdateLibraryDisplay(this.activeLibrary);

    const dialog = form.parentNode.parentNode;
    dialog.close();
    dialog.remove();
  }

  ClearLibraryDisplay() {
    const bookContainer = document.getElementById("book-container");
    while (bookContainer.firstChild) {
      bookContainer.firstChild.remove();
    }
  }
}

new ScreenController();
