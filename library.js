// Library for storing books
let myLibrary = []
var currentRow = 1
var currentId = 0

// Book object
function Book(title, author, pages, isRead) {
    this.id = getNextId()
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
}

Book.prototype.print = function() {
    return this.title + " by " + this.author
}

// HTML objects

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
    const newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.checked)
    addBookToLibrary(newBook)
    updateTable()
    clearForm()
    hideNewBookForm()
}

function clearForm() {
    titleInput.value = ""
    authorInput.value = ""
    pagesInput.value = ""
    readInput.checked = false
}

// Library functions
function getNextId() {
    currentId++
    return currentId
}
function addBookToLibrary(book) {
    if(book.constructor.name === 'Book') {
        myLibrary.push(book)
    }
}

function addBookToTable(book) {
    if(!book) {
        return
    }
    const row = table.insertRow(currentRow)
    const cellTitle = row.insertCell(0)
    const cellAuthor = row.insertCell(1)
    const cellPages = row.insertCell(2)
    const cellIsRead = row.insertCell(3)
    const cellReadButton = row.insertCell(4)
    const cellDeleteButton = row.insertCell(5)
    cellTitle.innerHTML = book.title
    cellAuthor.innerHTML = book.author
    cellPages.innerHTML = book.pages
    cellIsRead.innerHTML = (book.isRead === true) ? "Yes" : ""
    cellReadButton.innerHTML = `<button class="read-button" id="${ book.id }-read-button">I read it!</button>`
    cellDeleteButton.innerHTML = `<button class="delete-button" id="${ book.id }-delete-button">Delete</button>`
    currentRow++
}

function updateTable() {
    while(currentRow > 1) {
        table.deleteRow(currentRow - 1)
        currentRow--
    }
    myLibrary.forEach( book => addBookToTable(book) )
    updateButtons()
}

function printLibraryToConsole(library) {
    console.log("Books in library:")
    myLibrary.forEach( book => console.log(book.title) )
}

function updateButtons() {
    const readButtons = Array.from(document.getElementsByClassName("read-button"))
    readButtons.forEach(button => {
        button.onclick = function() {
            bookId = button.id.split("-")[0]
            toggleReadBook(bookId)
        }
    } )
    const deleteButtons = Array.from(document.getElementsByClassName("delete-button"))
    deleteButtons.forEach(button => {
        button.onclick = function() {
            bookId = button.id.split("-")[0]
            removeBookFromLibrary(bookId)
        }
    } )
}

function toggleReadBook(id) {
    console.log(getBookById(id).isRead)
    getBookById(id).isRead = !getBookById(id).isRead
    updateTable()
}

function removeBookFromLibrary(idToDelete) {
    indexToDelete = getIndexOfBook(getBookById(idToDelete))
    delete myLibrary[indexToDelete]
    updateTable()
}

function getIndexOfBook(bookToFind) {
    for(let i = 0; i < myLibrary.length; i++) {
        if(bookToFind.id === myLibrary[i].id) {
            return i
        }
    }
}

function getBookById(id) {
    let bookToReturn
    myLibrary.forEach(book => {
        if(book.id === Number(id)) {
            bookToReturn = book
        }
    })
    return bookToReturn
}

// Button Events
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

hideNewBookForm()
updateTable()
