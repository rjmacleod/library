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
const formContainer = document.getElementById("form-container")
const formSubmitButton = document.getElementById("form-submit")

// Form control
function showNewBookForm() {
    formContainer.setAttribute("style", "visibility: visible;")
}

function hideNewBookForm() {
    formContainer.setAttribute("style", "visibility: hidden;")
}

function acceptFormInput() {
    const newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.value)
    addBookToLibrary(newBook)
    updateTable()
    clearForm()
    hideNewBookForm()
}

function clearForm() {
    titleInput.value = ""
    authorInput.value = ""
    pagesInput.value = ""
    readInput.value = ""
}

// Library functions
function addBookToLibrary(book) {
    if(book.constructor.name === 'Book') {
        myLibrary.push(book)
    }
}

function addBookToTable(book) {
    const row = table.insertRow(currentRow)
    const cellTitle = row.insertCell(0)
    const cellAuthor = row.insertCell(1)
    const cellPages = row.insertCell(2)
    const cellIsRead = row.insertCell(3)
    const cellDelete = row.insertCell(4)
    cellTitle.innerHTML = book.title
    cellAuthor.innerHTML = book.author
    cellPages.innerHTML = book.pages
    cellIsRead.innerHTML = book.isRead ? "Yes" : ""
    cellDelete.innerHTML = `<button class="delete-button" id="delete-button-${ currentRow }">Delete</button>`
    currentRow++
}

function updateTable() {
    while(currentRow > 1) {
        table.deleteRow(currentRow - 1)
        currentRow--
    }

    myLibrary.forEach( book => addBookToTable(book) )
}

function printLibraryToConsole(library) {
    console.log("Books in library:")
    library.forEach( book => console.log(book.title) )
}

function updateDeleteButtons() {
    const deleteButtons = document.getElementsByClassName("delete-button")
    
}


// Button Events
addBookButton.onclick = function() {
    showNewBookForm()
}
formSubmitButton.onclick = function() {
    acceptFormInput()
}

var theHobbit = new Book("The Hobbit", "JRR Tolkein", 1002, "Yes")
var theLordOfTheRings = new Book("The Lord of the Rings", "JRR Tolkein", 4442, "Yes")

addBookToLibrary(theHobbit)
addBookToLibrary(theLordOfTheRings)

hideNewBookForm()
updateTable()
