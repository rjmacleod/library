// Library for storing books
let myLibrary = [];

// Book object
function Book(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
}

Book.prototype.print = function() {
    return this.title + " by " + this.author
}

// HTML objects
var currentRow = 1;
const table = document.getElementById("library-table")
const addBookButton = document.getElementById("add-book-button")
const form = document.getElementById("hideable-form")
const titleInput = document.getElementById("title-input")
const authorInput = document.getElementById("author-input")
const pagesInput = document.getElementById("pages-input")
const readInput = document.getElementById("read-input")
const formSubmitButton = document.getElementById("form-submit")

// Helper functions
function addBookToLibrary(book) {
    if(book.constructor.name === 'Book') {
        myLibrary.push(book)
    }
}

function printLibraryToConsole(library) {
    console.log("Books in library:")
    library.forEach( book => console.log(book.title) )
}

function showNewBookForm() {
    console.log("Showing book form")
    form.setAttribute("style", "visibility: visible;")
}

function hideNewBookForm() {
    form.setAttribute("style", "visibility: hidden;")
}

addBookButton.onclick = function() {
    showNewBookForm()
}
formSubmitButton.onclick = function() {
    acceptFormInput()
}

var theHobbit = new Book("The Hobbit", "JRR Tolkein", 1002, true)
var theLordOfTheRings = new Book("The Lord of the Rings", "JRR Tolkein", 4442, true)

addBookToLibrary(theHobbit)
addBookToLibrary(theLordOfTheRings)

printLibraryToConsole(myLibrary)

function acceptFormInput() {
    const newBook = new Book(titleInput.nodeValue, authorInput.nodeValue, pagesInput.nodeValue, readInput.nodeValue)
    addBookToTable(newBook)
}

function addBookToTable(book) {
    const row = table.insertRow(currentRow)
    const cellTitle = row.insertCell(0)
    const cellAuthor = row.insertCell(1)
    const cellPages = row.insertCell(2)
    const cellIsRead = row.insertCell(3)
    cellTitle.innerHTML = book.title
    cellAuthor.innerHTML = book.author
    cellPages.innerHTML = book.pages
    cellIsRead.innerHTML = book.isRead
    currentRow++
}

hideNewBookForm()
addBookToTable(theHobbit)
addBookToTable(theLordOfTheRings)
