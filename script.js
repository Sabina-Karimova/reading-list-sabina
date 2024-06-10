document.addEventListener("DOMContentLoaded", function() {
    const books = [
        { title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, read: false, cover: "books cover/cover1.png" },
        { title: "1984", author: "George Orwell", year: 1949, read: true, cover:  "books cover/cover2.png"},
        { title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, read: false, cover: "books cover/cover3.png" },
        { title: "The Catcher in the Rye", author: "J.D. Salinger", year: 1951, read: true, cover: "books cover/cover4.png" },
        { title: "Moby-Dick", author: "Herman Melville", year: 1851, read: false, cover: "books cover/cover5.png" },
        { title: "Pride and Prejudice", author: "Jane Austen", year: 1813, read: true, cover: "books cover/cover6.png" },
        { title: "War and Peace", author: "Leo Tolstoy", year: 1869, read: false, cover: "books cover/cover7.png" },
        { title: "Ulysses", author: "James Joyce", year: 1922, read: true, cover: "books cover/cover8.png" },
        { title: "The Odyssey", author: "Homer", year: -800, read: false, cover: "books cover/cover9.png" },
        { title: "Crime and Punishment", author: "Fyodor Dostoevsky", year: 1866, read: true, cover: "books cover/cover10.png" },
        { title: "The Divine Comedy", author: "Dante Alighieri", year: 1320, read: false, cover: "books cover/cover11.png" },
        { title: "Madame Bovary", author: "Gustave Flaubert", year: 1857, read: true, cover: "books cover/cover12.png" },
        { title: "The Brothers Karamazov", author: "Fyodor Dostoevsky", year: 1880, read: false, cover: "books cover/cover13.png" }
    ];

    const bookList = document.getElementById('book-list');

    books.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.className = 'col-md-4 mb-4';

        bookCard.innerHTML = `
            <div class="card h-100">
                <img src="${book.cover}" class="card-img-top" alt="${book.title} cover">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${book.author}</h6>
                    <p class="card-text">Year: ${book.year}</p>
                    <button class="btn ${book.read ? 'btn-success' : 'btn-secondary'}" id="read-btn-${index}">
                        ${book.read ? 'Read' : 'Not Read'}
                    </button>
                </div>
            </div>
        `;

        bookList.appendChild(bookCard);

        // Add event listener to the read button
        document.getElementById(`read-btn-${index}`).addEventListener('click', function() {
            book.read = !book.read;
            this.className = `btn ${book.read ? 'btn-success' : 'btn-secondary'}`;
            this.innerText = book.read ? 'Read' : 'Not Read';
        });
    });
});
