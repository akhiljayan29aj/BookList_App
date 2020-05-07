// Book Constructor
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn =isbn;
}

// UI Constructor
function UI(){ }

// Store Constructor
function Store(){ }

// Add book to the list
UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');
  // Create tr element
  const row = document.createElement('tr');
  // Insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="" class="delete">X</a></td>
  `;
  list.appendChild(row);
}

// Show Alert
UI.prototype.showAlert = function(message, className){
  // Create div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const container = document.querySelector('.container');
  // Get form
  const form = document.querySelector('#book-form');
  // Insert Alert
  container.insertBefore(div, form);

  // Timeout after 3 sec
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);

}

// Delete Book
UI.prototype.deleteBook = function(target){
  if(target.className === 'delete'){
    target.parentElement.parentElement.remove();
  }
}

// Clear fields
UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

Store.prototype.getBooks = function(){
  let books;
    if(localStorage.getItem('books') === null){
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
}

Store.prototype.displayBooks = function(){
  const store = new Store();
  const books = store.getBooks();

    books.forEach(function(book){
      const ui = new UI;

      // Add Book to UI
      ui.addBookToList(book);
    });
}

Store.prototype.addBook = function(book){
    const store = new Store();
    const books = store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
}

Store.prototype.removeBook = function(isbn){
  const store = new Store();
  const books = store.getBooks(); 

    books.forEach(function(book, index){
      if(book.isbn === isbn){
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
}
const store = new Store();
// DOM Load Event
document.addEventListener('DOMContentLoaded', store.displayBooks);

// Event Listeners for add book
document.getElementById('book-form').addEventListener('submit', function(e){
  // Getting full values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  // Instantiate book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Instantiate Store
  const store = new Store();

  // Validate
  if(title === '' || author === '' || isbn === ''){
    // Error alert
    ui.showAlert('Please fill in all fields','error');
  } else {
      // Add book to list
      ui.addBookToList(book);

      // Add to LS
      store.addBook(book);

      // Show Alert
      ui.showAlert('Book Added to the List','success');

      // Clear fields
      ui.clearFields();
  }


  
  e.preventDefault();
});

// Event listener for delete
document.getElementById('book-list').addEventListener('click', function(e){

  // Instantiate UI
  const ui = new UI();

  // Instantiate Store
  const store = new Store();

  // Delete Book
  ui.deleteBook(e.target);

  // Remove from LS
  store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show alert
  ui.showAlert('Book Removed','success');

  e.preventDefault();
})
