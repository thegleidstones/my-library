const Modal = {
    open(modal) {
        document.getElementById(modal).classList.add('active')
        DOM.callSelects(modal)
    },

    close(modal) {
        document.getElementById(modal).classList.remove('active')
    }
}

Storage = {
    getBooks() {
        return JSON.parse(localStorage.getItem("my-library:books")) || []
    },

    setBooks(books) {
        localStorage.setItem("my-library:books", JSON.stringify(books))
    },

    getAuthors() {
        return JSON.parse(localStorage.getItem("my-library:authors")) || []

    },

    setAuthors(authors) {
        localStorage.setItem("my-library:authors", JSON.stringify(authors))
    },

    getFriends() {
        return JSON.parse(localStorage.getItem("my-library:friends")) || []
    },

    setFriends(friends) {
        localStorage.setItem("my-library:friends", JSON.stringify(friends))
    },

    getWishlist() {
        return JSON.parse(localStorage.getItem("my-library:wishlist")) || []
    },

    setWishlist(wishlist) {
        localStorage.setItem("my-library:wishlist", JSON.stringify(wishlist))
    },

    getBookLoans() {
        return JSON.parse(localStorage.getItem("my-library:bookLoans")) || []
    },

    setBookLoans(bookLoans) {
        localStorage.setItem("my-library:bookLoans", JSON.stringify(bookLoans))
    },
}

const Friend = {
    friends: Storage.getFriends(),

    add(friend) {
        this.friends.push(friend)
        DOM.callFriendsTable()
    },

    get() {
        return this.friends;
    },

    remove(index) {
        this.friends.splice(index, 1)
        DOM.callFriendsTable()
    }
}

const Author = {
    authors: Storage.getAuthors(),

    add(author) {
        this.authors.push(author)
        DOM.callAuthorsTable()
    },

    get() {
        return this.authors
    },

    remove(index) {
        this.authors.splice(index, 1)
        DOM.callAuthorsTable()
    }
}

const Wishlist = {
    wishlists: Storage.getWishlist(),

    add(wishlist) {
        this.wishlists.push(wishlist)
        DOM.callWishlistTable()
    },

    get() {
        return this.wishlists
    },

    remove(index) {
        this.wishlists.splice(index, 1)
        DOM.callWishlistTable()
    }
}

const Book = {
    books: Storage.getBooks(),

    add(book) {
        this.books.push(book)
        DOM.callBooksTable()
    },

    get() {
        return this.books
    },

    remove(index) {
        this.books.splice(index, 1)
        DOM.callBooksTable()
    }
}

const BookLoan = {
    bookLoans: Storage.getBookLoans(),

    add(bookLoan) {
        this.bookLoans.push(bookLoan)
        DOM.callBookLoansTable()
    },

    get() {
        return this.bookLoans
    },

    remove(index) {
        this.bookLoans.splice(index, 1)
        DOM.callBookLoansTable()
    }
}

Utils = {
    formatDate(date) {
        const dateArray = date.split('-')
        return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`

    },
}

FormBooks = {
    title: document.querySelector('input#title'),
    author: document.querySelector('select#author'),
    abstract: document.querySelector('textarea#abstract'),
    category: document.querySelector('input#category'),
    publisher: document.querySelector('input#publisher'),
    published: document.querySelector('input#published'),
    pages: document.querySelector('input#pages'),
    isbn: document.querySelector('input#isbn'),

    getValues() {
        return {
            title: FormBooks.title.value,
            authorId: FormBooks.author.value,
            abstract: FormBooks.abstract.value,
            category: FormBooks.category.value,
            publisher: FormBooks.publisher.value,
            published: FormBooks.published.value,
            pages: FormBooks.pages.value,
            isbn: FormBooks.isbn.value
        }
    },

    createObjectBook() {
        let { title, authorId, abstract, category, publisher, published, pages, isbn } = FormBooks.getValues()
        const author = Author.get()[authorId]
        published = Utils.formatDate(published)

        return {
            title, 
            author, 
            abstract, 
            category, 
            publisher, 
            published, 
            pages, 
            isbn,
        }
    },

    validateFields() {
        const { title, authorId, abstract, category, publisher, published, pages, isbn } = FormBooks.getValues()

        if (title.trim() === "" ||
            authorId.trim() === "" ||
            abstract.trim() === "" ||
            category.trim() === "" ||
            publisher.trim() === "" ||
            published.trim() === "" ||
            pages.trim() === "" ||
            isbn.trim() === "") {
            throw new Error("Por favor, preencha os campos.")
        }
    },

    clearFields () {
        FormBooks.title.value = ""
        FormBooks.author.value = ""
        FormBooks.abstract.value = ""
        FormBooks.category.value = ""
        FormBooks.publisher.value = ""
        FormBooks.published.value = ""
        FormBooks.pages.value = ""
        FormBooks.isbn.value = ""
    },

    submit(event) {
        event.preventDefault()
                
        try {
            FormBooks.validateFields();            
            Book.add(FormBooks.createObjectBook())
            FormBooks.clearFields()
        } catch (error) {
            alert(error)
        }
    }
}

FormAuthors = {
    authorName: document.querySelector('input#authorName'),
    biografy: document.querySelector('textarea#biografy'),

    getValues() {
        return {
            authorName: FormAuthors.authorName.value,
            biografy: FormAuthors.biografy.value  
        }
    },

    validateFields() {
        const { authorName, biografy } = FormAuthors.getValues()

        if (authorName.trim() === "" || biografy.trim() === "") {
            throw new Error("Por favor, preencha os campos.")
        }
    },

    clearFields() {
        FormAuthors.authorName.value = ""
        FormAuthors.biografy.value = ""
    },

    submit(event) {
        event.preventDefault()

        try {
            FormAuthors.validateFields()
            Author.add(FormAuthors.getValues());
            FormAuthors.clearFields()
        } catch (error) {
            alert(error)
        }
    }
}

FormFriends = {
    name: document.querySelector('input#name'),
    cellphone: document.querySelector('input#cellphone'),
    email: document.querySelector('input#email'),
    instagram: document.querySelector('input#instagram'),
    address: document.querySelector('input#address'),

    getValues() {
        return {
            name: FormFriends.name.value,
            cellphone: FormFriends.cellphone.value,
            email: FormFriends.email.value,
            instagram: FormFriends.instagram.value,
            address: FormFriends.address.value
        }
    },

    validateFields() {
        const { name, cellphone, email, instagram, address } = FormFriends.getValues()

        if (name.trim() === "" ||
            cellphone.trim() === "" ||
            email.trim() === "" ||
            instagram.trim() === "" ||
            address.trim() === "") {
                throw new Error("Por favor, preencha os campos.")
        }
    },

    clearFields() {
        FormFriends.name.value = ""
        FormFriends.cellphone.value = ""
        FormFriends.email.value = ""
        FormFriends.instagram.value = ""
        FormFriends.address.value = ""
    },

    submit(event) {
        event.preventDefault()

        try {
            FormFriends.validateFields()
            Friend.add(FormFriends.getValues())
            FormFriends.clearFields()
        } catch (error) {
            alert(error)
        }
    }
}

FormWishlist = {
    wishlistTitle: document.querySelector('input#wishlistTitle'),
    wishlistAuthor: document.querySelector('input#wishlistAuthor'),
    link: document.querySelector('input#link'),

    getValues() {
        return {
            wishlistTitle: FormWishlist.wishlistTitle.value,
            wishlistAuthor: FormWishlist.wishlistAuthor.value,
            link: FormWishlist.link.value
        }
    },

    validateFields() {
        const { wishlistTitle, wishlistAuthor, link } = FormWishlist.getValues()

        if (wishlistTitle.trim() === "" ||
            wishlistAuthor.trim() === "" || 
            link.trim() === "") {
            throw new Error("Por favor, preencha os campos.")
        }
    },

    clearFields() {
        FormWishlist.wishlistTitle.value = ""
        FormWishlist.wishlistAuthor.value = ""
        FormWishlist.link.value = ""
    },

    submit(event) {
        event.preventDefault()

        try {
            FormWishlist.validateFields()
            Wishlist.add(FormWishlist.getValues())
            FormWishlist.clearFields()            
        } catch (error) {
            alert(error)
        }
    }
}

FormBookLoans = {
    bookLoanBook: document.querySelector('select#bookLoanBook'),
    bookLoanFriend: document.querySelector('select#bookLoanFriend'),
    bookLoanDate: document.querySelector('input#bookLoanDate'),
    
    getValues() {
        return {
            bookId: FormBookLoans.bookLoanBook.value,
            friendId: FormBookLoans.bookLoanFriend.value,
            bookLoanDate: FormBookLoans.bookLoanDate.value
        }
    },

    createObjectBookLoan() {
        let { bookId, friendId, bookLoanDate } = FormBookLoans.getValues()
        const book = Book.get()[bookId]
        const friend = Friend.get()[friendId]
        bookLoanDate = Utils.formatDate(bookLoanDate)

        return {
            book,
            friend,
            bookLoanDate        
        }
    },
    
    validateFields() {
        const { bookId, friendId, bookLoanDate } = FormBookLoans.getValues()

        if (bookId.trim() === "" || 
            friendId.trim() === "" || 
            bookLoanDate.trim() === "") {
            throw new Error("Por favor, informe os dados para empréstimo do livro")
        }
 
    },

    clearFields() {
        FormBookLoans.bookLoanBook.value = "",
        FormBookLoans.bookLoanFriend.value = "",
        FormBookLoans.bookLoanDate.value = ""
    },

    submit(event) {
        event.preventDefault()

        try {            
            FormBookLoans.validateFields()
            BookLoan.add(FormBookLoans.createObjectBookLoan())
            FormBookLoans.clearFields()
        } catch (error) {
            alert(error)
        }
    }
}

const DOM = {
    modalOverlay: {
        books: 'modal-overlay-books',
        authors: 'modal-overlay-authors',
        friends: 'modal-overlay-friends',
        wishlist: 'modal-overlay-wishlist',
        bookLoans: 'modal-overlay-bookLoans',
    },

    tableHeads: {
        books: 
        `
            <th></th>
            <th>Título</th>
            <th>Autor</th>
            <th>Editora</th>
            <th>Categoria</th>
            <th></th>
        `,
        authors: 
        `
            <th></th>
            <th>Nome</th>
            <th>Biografia</th>
            <th></th>
        `,
        friends: 
        `
            <th></th>
            <th>Nome</th>
            <th>Celular</th>
            <th>E-mail</th>
            <th>instagram</th>
            <th>Endereço</th>
            <th></th>
        `,
        wishlists:
        `
            <th></th>
            <th>Título</th>
            <th>Autor</th>
            <th>Link</th>
            <th></th>
        `,
        bookLoans:
        `
            <th></th>
            <th>Livro Emprestado</th>
            <th>Amigo</th>
            <th>Empréstimo em:</th>
            <th></th>
        `
    },

    tableBodyContainer: document.querySelector('#data-table tbody'),
    tableHeadContainer: document.querySelector('#data-table thead'),
    selectBookAuthor: document.querySelector('select#author'),
    selectBookLoanBook: document.querySelector('select#bookLoanBook'),
    selectBookLoanFriend: document.querySelector('select#bookLoanFriend'),

    toggleTheme(event) {
        event.preventDefault()

        const bodyClass = document.body.classList.value
        const buttonToggle = document.querySelector('.btn-toogle')

        if (bodyClass === "light-theme") {
            document.body.classList.replace("light-theme", "dark-theme")
            buttonToggle.innerHTML = "Light Theme"
        } else {
            document.body.classList.replace("dark-theme", "light-theme")
            buttonToggle.innerHTML = "Dark Theme"
        }
    },

    createBookTable(book, index) {
        if (index === 0) {
            const trHead = document.createElement('tr')
            trHead.innerHTML = DOM.tableHeads.books
            DOM.tableHeadContainer.appendChild(trHead)
        }

        const trBody = document.createElement('tr')
        trBody.dataset.index = index
        trBody.innerHTML = DOM.createBookTableData(book, index)
        DOM.tableBodyContainer.appendChild(trBody)
    },

    createAuthorTable(author, index) {
        if (index === 0 ) {
            const trHead = document.createElement('tr')
            trHead.innerHTML = DOM.tableHeads.authors
            DOM.tableHeadContainer.appendChild(trHead)
        }

        const trBody = document.createElement('tr')
        trBody.innerHTML = DOM.createAuthorTableData(author, index)
        DOM.tableBodyContainer.appendChild(trBody)
    },

    createFriendTable(friend, index) {
        if (index === 0 ) {
            const trHead = document.createElement('tr')
            trHead.innerHTML = DOM.tableHeads.friends
            DOM.tableHeadContainer.appendChild(trHead)
        }

        const trBody = document.createElement('tr')
        trBody.innerHTML = DOM.createFriendTableData(friend, index)
        DOM.tableBodyContainer.appendChild(trBody)
    },

    createWishlistTable(wishlist, index) {
        if (index === 0 ) {
            const trHead = document.createElement('tr')
            trHead.innerHTML = DOM.tableHeads.wishlists
            DOM.tableHeadContainer.appendChild(trHead)
        }

        const trBody = document.createElement('tr')
        trBody.innerHTML = DOM.createWishlistTableData(wishlist, index)
        DOM.tableBodyContainer.appendChild(trBody)
    },

    createBookLoanTable(bookLoan, index) {
        if (index === 0) {
            const trHead = document.createElement('tr')
            trHead.innerHTML = DOM.tableHeads.bookLoans
            DOM.tableHeadContainer.appendChild(trHead)
        }

        const trBody = document.createElement('tr')
        trBody.innerHTML = DOM.createBookLoanTableData(bookLoan, index)
        DOM.tableBodyContainer.appendChild(trBody)
    },

    createBookAuthorSelect(author, index) {
        const option = document.createElement('option')

        if (index === 0) {
            const option = document.createElement('option')
            option.value = ""
            option.innerHTML = "========= Selecione um escritor ========="
            DOM.selectBookAuthor.appendChild(option)
        }

        option.value = index
        option.innerHTML = author.authorName

        DOM.selectBookAuthor.appendChild(option)
    },

    createBookLoanBookSelect(book, index) {
        const option = document.createElement('option')
        
        if (index === 0) {
            const option = document.createElement('option')
            option.value = ""
            option.innerHTML = "========= Selecione um Livro ========="
            DOM.selectBookLoanBook.appendChild(option)
        }

        option.value = index
        option.innerHTML = book.title
        
        DOM.selectBookLoanBook.appendChild(option)
    },

    createBookLoanFriendSelect(friend, index) {
        const option = document.createElement('option')

        if (index === 0) {
            const option = document.createElement('option')
            option.value = ""
            option.innerHTML = "========= Selecione um Amigo ========="
            DOM.selectBookLoanFriend.appendChild(option)
        }

        option.value = index
        option.innerHTML = friend.name

        DOM.selectBookLoanFriend.appendChild(option)
    },

    createBookTableData(book, index) {
        const html = `
            <td>${index + 1}</td>
            <td>${book.title}</td>
            <td>${book.author.authorName}</td>
            <td>${book.publisher}</td>
            <td>${book.category}</td>
            <td><img onclick="Book.remove(${index})" src="./assets/minus.svg" alt="Excluir registro"></td>
        `
        return html
    },

    createAuthorTableData(author, index) {
        const html = `
            <td>${index + 1}</td>
            <td>${author.authorName}</td>
            <td>${author.biografy}</td>
            <td><img onclick="Author.remove(${index})" src="./assets/minus.svg" alt="Excluir registro"></td>
        `
        return html
    },

    createFriendTableData(friend, index) {
        const html = `
            <td>${index + 1}</td>
            <td>${friend.name}</td>
            <td>${friend.cellphone}</td>
            <td>${friend.email}</td>
            <td>${friend.instagram}</td>
            <td>${friend.address}</td>
            <td><img onclick="Friend.remove(${index})" src="./assets/minus.svg" alt="Excluir registro"></td>
        `
        return html
    },

    createWishlistTableData(wishlist, index) {
        const html = `
            <td>${index + 1}</td>
            <td>${wishlist.wishlistTitle}</td>
            <td>${wishlist.wishlistAuthor}</td>
            <td><a href="${wishlist.link}" target="_blank">Visualizar link</a></td>
            <td><img onclick="Wishlist.remove(${index})" src="./assets/minus.svg" alt="Excluir registro"></td>
        `
        return html
    },

    createBookLoanTableData(bookLoan, index) {
        const html = `
            <td>${index + 1}</td>
            <td>${bookLoan.book.title}</td>
            <td>${bookLoan.friend.name}</td>
            <td>${bookLoan.bookLoanDate}</td>
            <td><img onclick="BookLoan.remove(${index})" src="./assets/minus.svg" alt="Excluir registro"></td>
        `
        return html
    },

    createBookOption(book, index) {
        const html = `
            <option value=${index}>${book.title}</option>
        `
        return html
    },

    createBookLoanFriendOption(friend, index) {
        const html = `
            <option value=${index}>${friend.name}</option>
        `
        return html
    },

    clearTable() {
        DOM.tableBodyContainer.innerHTML = ""
        DOM.tableHeadContainer.innerHTML = ""
    },

    clearSelect() {
        DOM.selectBookLoanBook.innerHTML = ""
        DOM.selectBookLoanFriend.innerHTML = ""
        DOM.selectBookAuthor.innerHTML = ""
    },

    callSelects(modal) {
        console.log("Verificando modal:", modal)
        switch(modal) {
            case "modal-overlay-books":
                DOM.callBookSelects()
                break
            case "modal-overlay-bookLoans":
                DOM.callBookLoanSelects()
                break
            default:
        }
    },

    callBookLoanSelects() {
        DOM.clearSelect()
        Book.get().forEach(DOM.createBookLoanBookSelect)
        Friend.get().forEach(DOM.createBookLoanFriendSelect)
    },

    callBookSelects() {
        DOM.clearSelect()
        Author.get().forEach(DOM.createBookAuthorSelect)
    },

    callBooksTable() {
        DOM.clearTable()
        Book.get().forEach(DOM.createBookTable)
        Storage.setBooks(Book.get())
        Modal.close(DOM.modalOverlay.books)
    },

    callAuthorsTable() {
        DOM.clearTable()
        Author.get().forEach(DOM.createAuthorTable)
        Storage.setAuthors(Author.get())
        Modal.close(DOM.modalOverlay.authors)
    },

    callFriendsTable() {
        DOM.clearTable()
        Friend.get().forEach(DOM.createFriendTable)
        Storage.setFriends(Friend.get())
        Modal.close(DOM.modalOverlay.friends)
    },

    callWishlistTable() {
        DOM.clearTable()
        Wishlist.get().forEach(DOM.createWishlistTable)
        Storage.setWishlist(Wishlist.get())
        Modal.close(DOM.modalOverlay.wishlist)
    },

    callBookLoansTable() {
        DOM.clearTable()
        BookLoan.get().forEach(DOM.createBookLoanTable)
        Storage.setBookLoans(BookLoan.get())
        Modal.close(DOM.modalOverlay.bookLoans)
    }
}

const App = {
    init() {
        Book.get().forEach(DOM.createBookTable)
    }
}

App.init()