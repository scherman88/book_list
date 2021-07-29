class Book {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

class UI {
	addBookToList(book) {
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
	}

	clearFields() {
		document.getElementById("book-form").reset();
	}

	showAlert(message, className) {
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
	}

	deleteBook(target) {
		if (target.className === "delete") {
			target.parentElement.parentElement.remove();

			//show message
			this.showAlert("Book removed", "success");
		}
	}
}

class Store {
	static getBooks() {
		let books;

		if (localStorage.getItem("books") === null) {
			books = [];
		} else {
			books = JSON.parse(localStorage.getItem("books"));
		}
		return books;
	}
	static displayBooks() {
		const books = Store.getBooks();
		books.map(function (book) {
			const ui = new UI();
			ui.addBookToList(book);
		});
	}
	static addBook(book) {
		const books = Store.getBooks();
		books.push(book);
		localStorage.setItem("books", JSON.stringify(books));
	}
	static removeBook(isbn) {
		const books = Store.getBooks();
		books.forEach(function (book, index) {
			if (book.isbn === isbn) {
				books.splice(index, 1);
			}
		});

		localStorage.setItem("books", JSON.stringify(books));
	}
}

//Event Listener on Dom Load
document.addEventListener("DOMContentLoaded", Store.displayBooks);

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

	//Add book to LS
	Store.addBook(book);

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

	//remove from LS
	Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

	e.preventDefault();
});
