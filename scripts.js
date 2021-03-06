const Modal = {
    open(modal) {
        console.log(modal)
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
        console.log(this.get())
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
        console.log(this.get())
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
        console.log(this.get())
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
    book: {
        "title": "",
        "author": "",
        "abstract": "",
        "category": "",
        "publisher": "",
        "published": "",
        "pages": "",
        "isbn": ""
    },

    books: [],

    add(book) {
        this.books.push(book)
        console.log(this.get())
    },

    get() {
        return this.books
    },

    remove(book) {
        this.books.splice(book)
        console.log(this.get())
    }
}

Utils = {
    getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    },
    
}

const DOM = {
    tableBodyContainer: document.querySelector('#data-table tbody'),
    tableHeadContainer: document.querySelector('#data-table thead'),

    createBookTableRow(book, index) {
        if (index === 0) {
            const trHead = document.createElement('tr')
            trHead.innerHTML = DOM.createBookTableHead(book)
            DOM.tableHeadContainer.appendChild(trHead)
        }

        const trBody = document.createElement('tr')
        trBody.dataset.index = index
        trBody.innerHTML = DOM.createBookTableData(book, index)
        DOM.tableBodyContainer.appendChild(trBody)
    },

    createBookTableHead(book) {
        let html = "<th></th>"

        for (const key in book) {
            switch(key) {
                case "title":
                    html += "<th>Título</th>"
                    break
                case "author":
                    html += "<th>Autor</th>"
                    break
                case "category":
                    html += "<th>Categoria</th>"
                    break
                case "publisher":
                    html += "<th>Editora</th>"
                    break
                default:
            }
            /*if (key === "title" || key === "author" || key === "category" || key === "publisher") {
                html += "<th>"+ key + "</th>"
            }*/
        }

        html += "<th></th>"

        return html
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
    }


}

const App = {
    init() {
        const author = {
            "author-name": "J. R. R. Tolkien",
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
            "title": "O Senhor dos Anéis: A Sociedade do Anel",
            "author": "	J. R. R. Tolkien",
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

        Book.get().forEach(DOM.createBookTableRow)

        console.log("Teste de book lenght: ", Object.keys(book).length)

        DOM.createBookTableHead(book)
    }
}


App.init()