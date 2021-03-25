const Modal = {
	open(modal) {
		document.getElementById(modal).classList.add('active')
		DOM.callSelects(modal)
	},

	close(modal) {
		document.getElementById(modal).classList.remove('active')
		DOM.resetModal(modal)
	}
}

Storage = {
	getBooks() {
		return JSON.parse(localStorage.getItem("my-library:books")) || []
	},

	setBooks(books) {
		localStorage.setItem("my-library:books", JSON.stringify(books))
	},

	getCategories() {
		return JSON.parse(localStorage.getItem("my-library:categories")) || []
	},

	setCategories(categories) {
		localStorage.setItem("my-library:categories", JSON.stringify(categories))
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

	getTheme() {
		return JSON.parse(localStorage.getItem("my-library:theme")) || []
	},

	setTheme(theme) {
		localStorage.setItem("my-library:theme", JSON.stringify(theme))
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
	},

	update(friend) {
		Friend.get()[friend.id] = friend
		Storage.setFriends(Friend.get())
		DOM.callFriendsTable()
	}
}

const Category = {
	categories: Storage.getCategories(),

	add(category) {
		this.categories.push(category)
		DOM.callCategoriesTable()
	},

	get() {
		return this.categories
	},

	remove(index) {
		this.categories.splice(index, 1)
		DOM.callCategoriesTable()
	},

	update(category) {
		Category.get()[category.id] = category
		Storage.setCategories(Category.get())
		DOM.callCategoriesTable()
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
	},

	update(author) {
		Author.get()[author.id] = author
		Storage.setAuthors(Author.get())
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
	},
	
	update(wishlist) {
		Wishlist.get()[wishlist.id] = wishlist
		Storage.setWishlist(Wishlist.get())
		DOM.callWishlistTable()
	},
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

	changeStatus(bookId, status) {
		Book.get()[bookId].status = status
		Storage.setBooks(Book.get())
	},

	remove(index) {
		this.books.splice(index, 1)
		DOM.callBooksTable()
	},

	update(book) {
		Book.get()[book.id] = book
		Storage.setBooks(Book.get())
		DOM.callBooksTable()
	}
}

const BookLoan = {
	bookLoans: Storage.getBookLoans(),

	add(bookLoan) {
		this.bookLoans.push(bookLoan)
		DOM.callBookLoansTable()
	},

	bookLoanReturn(bookLoan) {
		BookLoan.get()[bookLoan.id] = bookLoan
		Storage.setBookLoans(BookLoan.get())

		const book = BookLoan.get()[bookLoan.id].book
		Book.changeStatus(book.id, "Disponível")

		DOM.callBookLoansTable()
	},

	get() {
		return this.bookLoans
	},

	remove(index) {
		const bookLoan = BookLoan.get()[index]
		const book = bookLoan.book
		this.bookLoans.splice(index, 1)
		Book.changeStatus(book.id, "Disponível")
		DOM.callBookLoansTable()
	}
}

Utils = {
	formatDate(date) {
		const dateArray = date.split('-')
		return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`

	},

	formatDateISO(date) {
		const dateArray = date.split('/')
		return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`
	}
}

FormBooks = {
	id: document.querySelector('input#bookId'),
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
			id: FormBooks.id.value,
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
		let {id, title, authorId, abstract, category, publisher, published, pages, isbn } = FormBooks.getValues()
		const author = Author.get()[authorId]
		const status = "Disponível"
		published = Utils.formatDate(published)

		return {
			id,
			title,
			author,
			abstract,
			category,
			publisher,
			published,
			pages,
			isbn,
			status,
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

	clearFields() {
		FormBooks.id.value = "new"
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
			let book = FormBooks.createObjectBook()

			if (book.id.trim() === "new") {
				book.id = Book.get().length
				FormBooks.validateFields();
				Book.add(book)
				FormBooks.clearFields()
			} else {
				FormBooks.validateFields();
				Book.update(book)
				FormBooks.clearFields()
			}
		} catch (error) {
			alert(error)
		}
	}
}

FormCategories = {
	categoryId: document.querySelector('input#categoryId'),
	categoryName: document.querySelector('input#categoryName'),

	getValues() {
		return {
			id: FormCategories.categoryId.value,
			name: FormCategories.categoryName.value
		}
	},

	validateFields() {
		const { name } = FormCategories.getValues()

		if (name.trim() === "") {
			throw new Error("Por favor, preencha os campos.")
		}
	},

	clearFields() {
		FormCategories.categoryId.value = "new"
		FormCategories.categoryName.value = ""
	},

	submit(event) {
		event.preventDefault()

		let category = FormCategories.getValues()

		try {
			if (category.id.trim() === "new") {
				category.id = Category.get().length
				FormCategories.validateFields()
				Category.add(category)
				FormCategories.clearFields()
			} else {
				FormCategories.validateFields()
				Category.update(category)
				FormCategories.clearFields()
			}
		} catch (error) {
			alert(error)
		}
	}

}

FormAuthors = {
	authorId: document.querySelector('input#authorId'),
	authorName: document.querySelector('input#authorName'),
	biografy: document.querySelector('textarea#biografy'),

	getValues() {
		return {
			id : FormAuthors.authorId.value,
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
		FormAuthors.authorId.value = "new"
		FormAuthors.authorName.value = ""
		FormAuthors.biografy.value = ""
	},

	submit(event) {
		event.preventDefault()

		
		try {
			let author = FormAuthors.getValues()
			
			if (author.id.trim() === "new") {
				author.id = Author.get().length
				FormAuthors.validateFields()
				Author.add(author);
				FormAuthors.clearFields()
			} else {
				FormAuthors.validateFields()
				Author.update(author);
				FormAuthors.clearFields()
			}	
		} catch (error) {
			alert(error)
		}
	}
}

FormFriends = {
	id: document.querySelector('input#friendId'),
	name: document.querySelector('input#name'),
	cellphone: document.querySelector('input#cellphone'),
	email: document.querySelector('input#email'),
	instagram: document.querySelector('input#instagram'),
	address: document.querySelector('input#address'),

	getValues() {
		return {
			id: FormFriends.id.value,
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
		FormFriends.id.value = "new"
		FormFriends.name.value = ""
		FormFriends.cellphone.value = ""
		FormFriends.email.value = ""
		FormFriends.instagram.value = ""
		FormFriends.address.value = ""
	},

	submit(event) {
		event.preventDefault()

		try {
			let friend = FormFriends.getValues()

			if (friend.id.trim() === "new") {
				friend.id = Friend.get().length
				FormFriends.validateFields()
				Friend.add(friend)
				FormFriends.clearFields()
			} else {
				FormFriends.validateFields()
				Friend.update(friend)
				FormFriends.clearFields()
			}
		} catch (error) {
			alert(error)
		}
	}
}

FormWishlist = {
	wishlistId: document.querySelector('input#wishlistId'),
	wishlistTitle: document.querySelector('input#wishlistTitle'),
	wishlistAuthor: document.querySelector('input#wishlistAuthor'),
	link: document.querySelector('input#link'),

	getValues() {
		return {
			id: FormWishlist.wishlistId.value,
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
		FormWishlist.wishlistId.value = "new"
		FormWishlist.wishlistTitle.value = ""
		FormWishlist.wishlistAuthor.value = ""
		FormWishlist.link.value = ""
	},

	submit(event) {
		event.preventDefault()

		try {
			let wishlist = FormWishlist.getValues()

			if (wishlist.id.trim() === "new") {
				wishlist.id = Wishlist.get().length
				FormWishlist.validateFields()
				Wishlist.add(wishlist)
				FormWishlist.clearFields()
			} else {
				FormWishlist.validateFields()
				Wishlist.update(wishlist)
				FormWishlist.clearFields()
			}
		} catch (error) {
			alert(error)
		}
	}
}

FormBookLoans = {
	bookLoanBook: document.querySelector('select#bookLoanBook'),
	bookLoanFriend: document.querySelector('select#bookLoanFriend'),
	bookLoanDate: document.querySelector('input#bookLoanDate'),
	bookLoanDevolutionDate: document.querySelector('input#bookLoanDevolutionDate'),
	loanOrReturn: document.querySelector('input#loanOrReturn'),
	bookLoanId: document.querySelector('input#bookLoanId'),

	getValues() {
		return {
			bookId: FormBookLoans.bookLoanBook.value,
			friendId: FormBookLoans.bookLoanFriend.value,
			bookLoanDate: FormBookLoans.bookLoanDate.value,
			bookLoanDevolutionDate: FormBookLoans.bookLoanDevolutionDate.value,
		}
	},

	createObjectBookLoan() {
		let { bookId, friendId, bookLoanDate, bookLoanDevolutionDate } = FormBookLoans.getValues()
		const id = BookLoan.get().length
		const book = Book.get()[bookId]
		const friend = Friend.get()[friendId]
		const status = "Em Aberto"
		bookLoanDate = Utils.formatDate(bookLoanDate)

		return {
			id,
			book,
			friend,
			bookLoanDate,
			bookLoanDevolutionDate,
			status
		}
	},

	createObjectBookLoanReturn() {
		let { bookId, friendId, bookLoanDate, bookLoanDevolutionDate } = FormBookLoans.getValues()
		const id = FormBookLoans.bookLoanId.value
		const book = Book.get()[bookId]
		const friend = Friend.get()[friendId]
		const status = "Devolvido"
		bookLoanDate = Utils.formatDate(bookLoanDate)
		bookLoanDevolutionDate = Utils.formatDate(bookLoanDevolutionDate)

		return {
			id,
			book,
			friend,
			bookLoanDate,
			bookLoanDevolutionDate,
			status
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

	validateFieldsReturn() {
		const { bookLoanDevolutionDate } = FormBookLoans.getValues()

		if (bookLoanDevolutionDate.trim() === "") {
			throw new Error("Por favor, informe os dados para devolução do livro")
		}
	},

	updateBookStatus() {
		let bookId = FormBookLoans.getValues().bookId
		Book.changeStatus(bookId, "Emprestado")
	},

	clearFields() {
		FormBookLoans.bookLoanBook.value = "",
		FormBookLoans.bookLoanFriend.value = "",
		FormBookLoans.bookLoanDate.value = "",
		FormBookLoans.bookLoanDevolutionDate.value = ""
	},

	submit(event) {
		event.preventDefault()

		try {
			if (FormBookLoans.loanOrReturn.value === "loan") {
				FormBookLoans.validateFields()
				let bookLoan = FormBookLoans.createObjectBookLoan()
				BookLoan.add(bookLoan)
				FormBookLoans.updateBookStatus()
				FormBookLoans.clearFields()
			} else {
				FormBookLoans.validateFieldsReturn()
				let bookLoan = FormBookLoans.createObjectBookLoanReturn()
				console.log(bookLoan)
				BookLoan.bookLoanReturn(bookLoan)
				FormBookLoans.clearFields()
			}
		} catch (error) {
			alert(error)
		}
	}
}

const DOM = {
	modalOverlay: {
		books: 'modal-overlay-books',
		categories: 'modal-overlay-categories',
		authors: 'modal-overlay-authors',
		friends: 'modal-overlay-friends',
		wishlist: 'modal-overlay-wishlist',
		bookLoans: 'modal-overlay-bookLoans',
	},

	cards: {
		book: 'cardBook',
		category: 'cardCategory',
		author: 'cardAuthor',
		friend: 'cardFriend',
		wishlist: 'cardWishlist',
		bookLoan: 'cardBookLoan'
	},

	tableHeads: {
		books:
			`
				<th></th>
				<th>Título</th>
				<th>Autor</th>
				<th>Editora</th>
				<th>Categoria</th>
				<th>Status</th>
				<th></th>
				<th></th>
			`,
		categories:
		`
			<th></th>
			<th>Descrição</th>
			<th></th>
			<th></th>
		`,			
		authors:
			`
				<th></th>
				<th>Nome</th>
				<th>Biografia</th>
				<th></th>
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
				<th></th>
			`,
		wishlists:
			`
				<th></th>
				<th>Título</th>
				<th>Autor</th>
				<th>Link</th>
				<th></th>
				<th></th>
			`,
		bookLoans:
			`
				<th></th>
				<th>Livro Emprestado</th>
				<th>Amigo</th>
				<th>Empréstimo</th>
				<th>Devolução</th>
				<th>Status</th>
				<th></th>
				<th></th>
			`
	},

	tableBodyContainer: document.querySelector('#data-table tbody'),
	tableHeadContainer: document.querySelector('#data-table thead'),
	selectBookAuthor: document.querySelector('select#author'),
	selectBookLoanBook: document.querySelector('select#bookLoanBook'),
	selectBookLoanFriend: document.querySelector('select#bookLoanFriend'),

	editBook(index) {
		const book = Book.get()[index]
		const headTextBook = document.querySelector('h2#headTextBook')
		
		Modal.open(DOM.modalOverlay.books)		
		
		headTextBook.innerHTML = "Alteração de livro"

		FormBooks.id.value = book.id
		FormBooks.title.value = book.title
		FormBooks.author.value = book.author.id
		FormBooks.abstract.value = book.abstract
		FormBooks.category.value = book.category
		FormBooks.publisher.value = book.publisher
		FormBooks.published.value = Utils.formatDateISO(book.published)
		FormBooks.pages.value = book.pages
		FormBooks.isbn.value = book.isbn
	},

	resetModalBook() {
		const headTextBook = document.querySelector('h2#headTextBook')
		headTextBook.innerHTML = "Novo livro"

		FormBooks.clearFields()
	},

	editCategory(index) {
		const category = Category.get()[index]
		const headTextCategory = document.querySelector('h2#headTextCategory')

		Modal.open(DOM.modalOverlay.categories)

		headTextCategory.innerHTML = "Alteração de Categoria"

		FormCategories.categoryId.value = category.id
		FormCategories.categoryName.value = category.name
	},

	resetModalCategory() {
		const headTextCategory = document.querySelector('h2#headTextCategory')

		headTextCategory.innerHTML = "Nova Categoria"

		FormCategories.clearFields()
	},

	editAuthor(index) {
		const author = Author.get()[index]

		const headTextAuthor = document.querySelector('h2#headTextAuthor')

		Modal.open(DOM.modalOverlay.authors)

		headTextAuthor.innerHTML = "Alteração de Escritor"

		FormAuthors.authorId.value = author.id
		FormAuthors.authorName.value = author.authorName
		FormAuthors.biografy.value = author.biografy
	},

	resetModalAuthor() {
		const headTextAuthor = document.querySelector('h2#headTextAuthor')

		headTextAuthor.innerHTML = "Novo Escritor"

		FormAuthors.clearFields()
	},

	editWishlist(index) {
		const wishlist = Wishlist.get()[index]
		
		const headTextWishlist = document.querySelector('h2#headTextWishlist')

		Modal.open(DOM.modalOverlay.wishlist)
		
		headTextWishlist.innerHTML = "Alteração de lista de desejos"

		FormWishlist.wishlistId.value = wishlist.id
		FormWishlist.wishlistTitle.value = wishlist.wishlistTitle
		FormWishlist.wishlistAuthor.value = wishlist.wishlistAuthor
		FormWishlist.link.value = wishlist.link
	},

	resetModalWishlist() {
	const headTextWishlist = document.querySelector('h2#headTextWishlist')

		headTextWishlist.innerHTML = "Novo item da lista de desejos"

		FormWishlist.clearFields()
	},

	editFriend(index) {
		const headTextFriend = document.querySelector('h2#headTextFriend')
		const friend = Friend.get()[index]

		Modal.open(DOM.modalOverlay.friends)

		headTextFriend.innerHTML = "Alteração de amigo"

		FormFriends.id.value = friend.id
		FormFriends.name.value = friend.name
		FormFriends.cellphone.value = friend.cellphone
		FormFriends.email.value = friend.email
		FormFriends.instagram.value = friend.instagram
		FormFriends.address.value = friend.address
	},

	resetModalFriend() {
		const headTextFriend = document.querySelector('h2#headTextFriend')

		headTextFriend.innerHTML = "Novo amigo"

		FormFriends.clearFields()
	},

	showReturnBookLoanUpdate(index) {
		const bookLoan = BookLoan.get()[index]
		const optionBook = document.createElement('option')
		const optionFriend = document.createElement('option')
		const bookLoanDate = document.querySelector('input#bookLoanDate')
		const bookLoanDevolutionDate = document.querySelector('input#bookLoanDevolutionDate')
		const headTextBookLoan = document.querySelector('h2#headTextBookLoan')
		const loanOrReturn = document.querySelector('input#loanOrReturn')
		const bookLoanId = document.querySelector('input#bookLoanId')


		Modal.open(DOM.modalOverlay.bookLoans)
		DOM.clearSelect()

		loanOrReturn.value = "return"
		bookLoanId.value = index

		headTextBookLoan.innerHTML = "Devolução de empréstimo"
		DOM.selectBookLoanBook.disabled = true
		DOM.selectBookLoanFriend.disabled = true

		optionBook.selected = true
		optionBook.value = bookLoan.book.id
		optionBook.innerHTML = bookLoan.book.title

		optionFriend.selected = true
		optionFriend.value = bookLoan.friend.id
		optionFriend.innerHTML = bookLoan.friend.name

		bookLoanDate.value = Utils.formatDateISO(bookLoan.bookLoanDate)
		bookLoanDate.disabled = true
		bookLoanDevolutionDate.disabled = false

		DOM.selectBookLoanBook.appendChild(optionBook)
		DOM.selectBookLoanFriend.appendChild(optionFriend)
	},

	resetModalBookLoan() {
		const headTextBookLoan = document.querySelector('h2#headTextBookLoan')
		const bookLoanDate = document.querySelector('input#bookLoanDate')
		const bookLoanDevolutionDate = document.querySelector('input#bookLoanDevolutionDate')
		const loanOrReturn = document.querySelector('input#loanOrReturn')

		headTextBookLoan.innerHTML = "Novo empréstimo"
		loanOrReturn.value = "loan"

		bookLoanDate.value = ""
		bookLoanDate.disabled = false

		bookLoanDevolutionDate.value = ""
		bookLoanDevolutionDate.disabled = true

		DOM.selectBookLoanBook.disabled = false
		DOM.selectBookLoanFriend.disabled = false
	},

	toggleTheme(event) {
		event.preventDefault()

		const bodyClass = document.body.classList.value
		const buttonToggle = document.querySelector('.btn-toogle')
		let theme = {}

		if (bodyClass === "light-theme") {
			document.body.classList.replace("light-theme", "dark-theme")
			buttonToggle.innerHTML = "Light Theme"
			theme = { theme: "dark-theme", button: "Light Theme" }
			Storage.setTheme(theme)
		} else {
			document.body.classList.replace("dark-theme", "light-theme")
			buttonToggle.innerHTML = "Dark Theme"
			theme = { theme: "light-theme", button: "Dark Theme" }
			Storage.setTheme(theme)
		}
	},

	toggleActiveCard(card) {
		for (const key in DOM.cards) {
			const cardBook = document.querySelector(`div#${DOM.cards[key]}`)
			cardBook.classList.remove('active')
		}
		const cardActive = document.querySelector(`div#${card}`)
		cardActive.classList.toggle('active')
	},

	loadTheme() {
		document.addEventListener("DOMContentLoaded", event => {
			const bodyClass = document.body.classList.value
			const buttonToggle = document.querySelector('.btn-toogle')
			const theme = Storage.getTheme()

			if (theme.length === 0) {

			} else if (theme.theme === "light-theme") {
				document.body.className = theme.theme
				buttonToggle.innerHTML = theme.button
			} else {
				document.body.className = theme.theme
				buttonToggle.innerHTML = theme.button
			}
		})
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

	createCategoryTable(category, index) {
		if (index === 0) {
			const trHead = document.createElement('tr')
			trHead.innerHTML = DOM.tableHeads.categories
			DOM.tableHeadContainer.appendChild(trHead)
		}

		const trBody = document.createElement('tr')
		trBody.innerHTML = DOM.createCategoryTableData(category, index)
		DOM.tableBodyContainer.appendChild(trBody)
	},

	createAuthorTable(author, index) {
		if (index === 0) {
			const trHead = document.createElement('tr')
			trHead.innerHTML = DOM.tableHeads.authors
			DOM.tableHeadContainer.appendChild(trHead)
		}

		const trBody = document.createElement('tr')
		trBody.innerHTML = DOM.createAuthorTableData(author, index)
		DOM.tableBodyContainer.appendChild(trBody)
	},

	createFriendTable(friend, index) {
		if (index === 0) {
			const trHead = document.createElement('tr')
			trHead.innerHTML = DOM.tableHeads.friends
			DOM.tableHeadContainer.appendChild(trHead)
		}

		const trBody = document.createElement('tr')
		trBody.innerHTML = DOM.createFriendTableData(friend, index)
		DOM.tableBodyContainer.appendChild(trBody)
	},

	createWishlistTable(wishlist, index) {
		if (index === 0) {
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

		if (book.status === "Disponível") {
			option.value = index
			option.innerHTML = book.title

			DOM.selectBookLoanBook.appendChild(option)
		}
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
		const remove = book.status === "Emprestado" ? "" :
			`
				<i 
					class="fa fa-minus-square btn-remove" 
					title="Clique para excluir o registro" 
					onclick="Book.remove(${index})" 
					aria-hidden="true"
				>
				</i>
      `
		const html = `
				<td>${index + 1}</td>
				<td>${book.title}</td>
				<td>${book.author.authorName}</td>
				<td>${book.publisher}</td>
				<td>${book.category}</td>
				<td>${book.status}</td>
				<td>
					<i 
						class="fa fa-pencil-square btn-edit" 
						title="Clique para editar o registro"
						onclick="DOM.editBook(${index})" 
						aria-hidden="true"
					>
					</i>
				</td>
				<td>${remove}</td>
			`
		return html
	},

	createCategoryTableData(category, index) {
		const html = `
			<td>${index + 1}</td>
			<td>${category.name}</td>
			<td>
				<i 
					class="fa fa-pencil-square btn-edit" 
					title="Clique para editar o registro"
					onclick="DOM.editCategory(${index})" 
					aria-hidden="true"
				>
				</i>
			</td>
			<td>
				<i 
					class="fa fa-minus-square btn-remove" 
					title="Clique para excluir o registro" 
					onclick="Category.remove(${index})" 
					aria-hidden="true"
				>
				</i>
			</td>
		`
		return html
	},

	createAuthorTableData(author, index) {
		const html = `
			<td>${index + 1}</td>
			<td>${author.authorName}</td>
			<td>${author.biografy}</td>
			<td>
				<i 
					class="fa fa-pencil-square btn-edit" 
					title="Clique para editar o registro"
					onclick="DOM.editAuthor(${index})" 
					aria-hidden="true"
				>
				</i>
			</td>
			<td>
				<i 
					class="fa fa-minus-square btn-remove" 
					title="Clique para excluir o registro" 
					onclick="Author.remove(${index})" 
					aria-hidden="true"
				>
				</i>
			</td>
		`
		return html
	},

	createFriendTableData(friend, index) {
		const html = 
		`
			<td>${index + 1}</td>
			<td>${friend.name}</td>
			<td>${friend.cellphone}</td>
			<td>${friend.email}</td>
			<td>${friend.instagram}</td>
			<td>${friend.address}</td>
			<td>
				<i 
					class="fa fa-pencil-square btn-edit" 
					title="Clique para editar o registro"
					onclick="DOM.editFriend(${index})" 
					aria-hidden="true"
				>
				</i>
			</td>
			<td>
					<i 
							class="fa fa-minus-square btn-remove" 
							title="Clique para excluir o registro" 
							onclick="Friend.remove(${index})" 
							aria-hidden="true"
					>
					</i>
			</td>
		`
		return html
	},

	createWishlistTableData(wishlist, index) {
		const html = 
		`
			<td>${index + 1}</td>
			<td>${wishlist.wishlistTitle}</td>
			<td>${wishlist.wishlistAuthor}</td>
			<td><a href="${wishlist.link}" target="_blank">Visualizar link</a></td>
			<td>
			<i 
				class="fa fa-pencil-square btn-edit" 
				title="Clique para editar o registro"
				onclick="DOM.editWishlist(${index})" 
				aria-hidden="true"
			>
			</i>
		</td>
			<td>
				<i 
					class="fa fa-minus-square btn-remove" 
					title="Clique para excluir o registro" 
					onclick="Wishlist.remove(${index})" 
					aria-hidden="true"
				>
				</i>
			</td>
		`
		return html
	},

	createBookLoanTableData(bookLoan, index) {
		const remove = bookLoan.status === "Devolvido" ? ""
			: 
			`
				<i 
					class="fa fa-minus-square btn-remove" 
					title="Clique para excluir o empréstimo do livro" 
					onclick="BookLoan.remove(${index})" 
					aria-hidden="true"
				>
				</i>
			`
		const devolution = bookLoan.status === "Devolvido"
			?
			`
				<i 
					class="fa fa-calendar-check-o btn-calendar-return" 
					title="Livro devolvido!" 
					aria-hidden="true"
				>
				</i>
			`
			:
			`
				<i 
					class="fa fa-calendar-o btn-calendar" 
					title="Clique para devolver o livro"  
					onclick="DOM.showReturnBookLoanUpdate(${index})" 
					aria-hidden="true"
				>
				</i>
			`

		const html = 
			`
				<td>${index + 1}</td>
				<td>${bookLoan.book.title}</td>
				<td>${bookLoan.friend.name}</td>
				<td>${bookLoan.bookLoanDate}</td>
				<td>${bookLoan.bookLoanDevolutionDate}</td>
				<td>${bookLoan.status}</td>
				<td>${devolution}</td>
				<td>${remove}</td>
			`

		return html
	},

	createBookOption(book, index) {
		const html = `<option value=${index}>${book.title}</option>`
		return html
	},

	createBookLoanFriendOption(friend, index) {
		const html = `<option value=${index}>${friend.name}</option>`
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

	resetModal(modal) {
		switch (modal) {
			case DOM.modalOverlay.books:
				DOM.resetModalBook()
				break
			case DOM.modalOverlay.categories:
				DOM.resetModalCategory()
				break
			case DOM.modalOverlay.authors:
				DOM.resetModalAuthor()
				break
			case DOM.modalOverlay.friends:
				DOM.resetModalFriend()
				break
			case DOM.modalOverlay.bookLoans:
				DOM.resetModalBookLoan()
				break
			default:
		}
	},

	callSelects(modal) {
		switch (modal) {
			case DOM.modalOverlay.books:
				DOM.callBookSelects()
				break
			case DOM.modalOverlay.bookLoans:
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
		DOM.toggleActiveCard(DOM.cards.book);
	},

	callCategoriesTable() {
		DOM.clearTable()
		Category.get().forEach(DOM.createCategoryTable)
		Storage.setCategories(Category.get())
		Modal.close(DOM.modalOverlay.categories)
		DOM.toggleActiveCard(DOM.cards.category)
	},

	callAuthorsTable() {
		DOM.clearTable()
		Author.get().forEach(DOM.createAuthorTable)
		Storage.setAuthors(Author.get())
		Modal.close(DOM.modalOverlay.authors)
		DOM.toggleActiveCard(DOM.cards.author);
	},

	callFriendsTable() {
		DOM.clearTable()
		Friend.get().forEach(DOM.createFriendTable)
		Storage.setFriends(Friend.get())
		Modal.close(DOM.modalOverlay.friends)
		DOM.toggleActiveCard(DOM.cards.friend);
	},

	callWishlistTable() {
		DOM.clearTable()
		Wishlist.get().forEach(DOM.createWishlistTable)
		Storage.setWishlist(Wishlist.get())
		Modal.close(DOM.modalOverlay.wishlist)
		DOM.toggleActiveCard(DOM.cards.wishlist);
	},

	callBookLoansTable() {
		DOM.clearTable()
		BookLoan.get().forEach(DOM.createBookLoanTable)
		Storage.setBookLoans(BookLoan.get())
		Modal.close(DOM.modalOverlay.bookLoans)
		DOM.toggleActiveCard(DOM.cards.bookLoan);
	}
}

const App = {
	init() {
		DOM.callBooksTable()
		DOM.loadTheme()
	}
}

App.init()