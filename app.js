// Book constructor
function Book(title, author, isbn) {
	this.title = title;
	this.author = author;
	this.isbn = isbn;
}

// UI constructor
function UI() {}

//Add Book to list prototype
UI.prototype.addBookToList = function (book) {
	const list = document.getElementById("book-list");

	//Create table row
	const row = document.createElement("tr");

	// Insert columns
	row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `;

	//Append row to list
	list.appendChild(row);
};

//Clear Fields prototype
UI.prototype.clearFields = function () {
	document.getElementById("book-form").reset();
};

//Show alert prototype
UI.prototype.showAlert = function (message, className) {
	//Create div
	const div = document.createElement("div");

	//Add classes
	div.className = `alert ${className}`;

	//Add text
	div.appendChild(document.createTextNode(message));

	//Get parent
	const container = document.querySelector(".container"),
		form = document.getElementById("book-form");

	//Insert Alert
	container.insertBefore(div, form);

	//Remove Alert
	setTimeout(() => {
		document.querySelector(".alert").remove();
	}, 3000);
};

//Delete Book prototype
UI.prototype.deleteBook = function (target) {
	if (target.className === "delete") {
		target.parentElement.parentElement.remove();

		//show message
		this.showAlert("Book removed", "success");
	}
};

//Event listeners for Add Book
document.getElementById("book-form").addEventListener("submit", function (e) {
	//get form values
	const title = document.getElementById("title").value,
		author = document.getElementById("author").value,
		isbn = document.getElementById("isbn").value;

	//Insantiate book
	const book = new Book(title, author, isbn);

	//Instantiate UI
	const ui = new UI();

	if ([title, author, isbn].includes("")) {
		ui.showAlert("Please complete all fields", "error");
		return;
	}

	//Add book to list
	ui.addBookToList(book);

	//Show Success
	ui.showAlert("Book added", "success");

	//Clear fields
	ui.clearFields();

	e.preventDefault();
});

//Event listener for delte book
document.getElementById("book-list").addEventListener("click", function (e) {
	//Instantiate UI
	const ui = new UI();
	//delete book
	ui.deleteBook(e.target);

	e.preventDefault();
});
