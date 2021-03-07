const Modal = {
    open(modal) {
        document.getElementById(modal).classList.add('active')
    },

    close(modal) {
        document.getElementById(modal).classList.remove('active')
    }
}

const Friend = {
    friends: [],

    add(friend) {
        this.friends.push(friend)
        DOM.callFriendsTable()
    },

    get() {
        return this.friends;
    },

    remove(friend) {
        this.friends.splice(friend)
        console.log(this.get())
    }
}

const Author = {
    authors: [],

    add(author) {
        this.authors.push(author)
        DOM.callAuthorsTable()
    },

    get() {
        return this.authors
    },

    remove(author) {
        this.authors.splice(author)
        console.log(this.get())
    }
}

const Wishlist = {
    wishlists: [],

    add(wishlist) {
        this.wishlists.push(wishlist)
        DOM.callWishlistTable()
    },

    get() {
        return this.wishlists
    },

    remove(wishlist) {
        this.wishlists.splice(wishlist)
        console.log(this.get())
    }
}

const Book = {
    books: [],

    add(book) {
        this.books.push(book)
        DOM.callBooksTable()
    },

    get() {
        return this.books
    },

    remove(book) {
        this.books.splice(book)
    }
}

Utils = {
    formatDate(date) {
        const dateArray = date.split('-')
        return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`

    },

    getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    },

}

FormBooks = {
    title: document.querySelector('input#title'),
    author:document.querySelector('input#author'),
    abstract: document.querySelector('textarea#abstract'),
    category: document.querySelector('input#category'),
    publisher: document.querySelector('input#publisher'),
    published: document.querySelector('input#published'),
    pages: document.querySelector('input#pages'),
    isbn: document.querySelector('input#isbn'),

    getValues() {
        return {
            title: FormBooks.title.value,
            author: FormBooks.author.value,
            abstract: FormBooks.abstract.value,
            category: FormBooks.category.value,
            publisher: FormBooks.publisher.value,
            published: FormBooks.published.value,
            pages: FormBooks.pages.value,
            isbn: FormBooks.isbn.value
        }
    },

    formatFields() {
        let { title, author, abstract, category, publisher, published, pages, isbn } = FormBooks.getValues()

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
        const { title, author, abstract, category, publisher, published, pages, isbn } = FormBooks.getValues()

        if (title.trim() === "" ||
            author.trim() === "" ||
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
            let book = FormBooks.formatFields()
            Book.add(book)
            FormBooks.clearFields()
            Modal.close(DOM.modalOverlay.books)
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
            Modal.close(DOM.modalOverlay.authors)
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
            Modal.close(DOM.modalOverlay.friends)
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
                //throw new Error("Por favor, preencha os campos.")
        }
    },

    clearFields() {
        FormWishlist.wishlistTitle.value = ""
        FormWishlist.wishlistAuthor.value = ""
        FormWishlist.link.value = ""
    },

    submit(event) {
        event.preventDefault()

        FormWishlist.validateFields()
        Wishlist.add(FormWishlist.getValues())
        FormWishlist.clearFields()
        Modal.close(DOM.modalOverlay.wishlist)
        try {
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
    },

    tableHeads: {
        books: 
        `
            <th></th>
            <th>Título</th>
            <th>Autor</th>
            <th>Categoria</th>
            <th>Editora</th>
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
        `
    },

    tableBodyContainer: document.querySelector('#data-table tbody'),
    tableHeadContainer: document.querySelector('#data-table thead'),

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

    createBookTableData(book, index) {
        const html = `
            <td>${index}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.publisher}</td>
            <td>${book.category}</td>
            <td><img src="./assets/minus.svg" alt="Excluir registro"></td>
        `
        return html
    },

    createAuthorTableData(author, index) {
        const html = `
            <td>${index}</td>
            <td>${author.authorName}</td>
            <td>${author.biografy}</td>
            <td><img src="./assets/minus.svg" alt="Excluir registro"></td>
        `
        return html
    },

    createFriendTableData(friend, index) {
        const html = `
            <td>${index}</td>
            <td>${friend.name}</td>
            <td>${friend.cellphone}</td>
            <td>${friend.email}</td>
            <td>${friend.instagram}</td>
            <td>${friend.address}</td>
            <td><img src="./assets/minus.svg" alt="Excluir registro"></td>
        `
        return html
    },

    createWishlistTableData(wishlist, index) {
        const html = `
            <td>${index}</td>
            <td>${wishlist.wishlistTitle}</td>
            <td>${wishlist.wishlistAuthor}</td>
            <td><a href="${wishlist.link}" target="_blank">Visualizar link</a></td>
            <td><img src="./assets/minus.svg" alt="Excluir registro"></td>
        `
        return html

    },

    clearTable() {
        DOM.tableBodyContainer.innerHTML = ""
        DOM.tableHeadContainer.innerHTML = ""
    },

    callBooksTable() {
        DOM.clearTable()
        Book.get().forEach(DOM.createBookTable)
    },

    callAuthorsTable() {
        DOM.clearTable()
        Author.get().forEach(DOM.createAuthorTable)
    },

    callFriendsTable() {
        DOM.clearTable()
        Friend.get().forEach(DOM.createFriendTable)
    },

    callWishlistTable() {
        DOM.clearTable()
        Wishlist.get().forEach(DOM.createWishlistTable)
    }
}

const App = {
    init() {
        const author = {
            "authorName": "J. R. R. Tolkien",
            "biografy": "J. R. R. Tolkien (1892-1973) foi um escritor, filólogo e professor universitário inglês e autor de Senhor dos Anéis e Hobbit, verdadeiros clássicos da literatura fantástica. Em 1972 foi nomeado Comandante da Ordem do Império Britânico pela Rainha Elizabeth II."
        }
        
        const friend = {
            "name": "Ulisses Gimenes de Freitas",
            "cellphone": "(64) 99988-4545",
            "email" : "ulisses@gmail.com",
            "instagram": "@ulissesgimenes",
            "address": "Rua dos pinhais, 335 - Jataí-GO"
        }
        
        const wishlist = {
            "wishlistTitle": "O Senhor dos Anéis: A Sociedade do Anel",
            "wishlistAuthor": "J. R. R. Tolkien",
            "link": "https://www.amazon.com.br/Sociedade-Anel-S%C3%A9rie-Senhor-An%C3%A9is/dp/8533613377"
        }
        
        const book = {
            "title": "O Senhor dos Anéis: As Duas Torres",
            "author": "J. R. R. Tolkien",
            "abstract": "A Comitiva do Anel se divide. Frodo e Sam continuam a viagem, descendo sozinhos o Grande Rio Anduin ? mas não tão sozinhos assim, pois uma figura misteriosa segue todos os seus passos...",
            "category": "Fantasia",
            "publisher": "Martins Fontes",
            "published": "01/01/2000",
            "pages": "380",
            "isbn": "978-8533613386"
        }

        /*
        for(let i = 0; i < 5; i++) {
            Book.add(book)
        }

        for(let i = 0; i < 5; i++) {
            Wishlist.add(wishlist)
        }

        for(let i = 0; i < 5; i++) {
            Friend.add(friend)
        }

        for(let i = 0; i < 5; i++) {
            Author.add(author)
        }
        */

        Book.get().forEach(DOM.createBookTable)
    }
}


App.init()