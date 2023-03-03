const url = 'api/book'

export const getBooks = async () => {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

export const getBookById = async (id) => {
    const response = await fetch(`https://localhost:7150/api/book/${id}`)
    const data = await response.json()
    return data
}


export const newBook = async (book) => {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(book),
        headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()
    return data
}

 export const updateBook = async (book) => {
    // e.preventDefault()
    const data = {
        ...book,
        name: book.name,
        genre: book.genre,
        pages: book.pages,
    }

    const response = await fetch(`https://localhost:7150/api/author/${book.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        
}

export const deleteBook = async ({ id }) => {
    const response = await fetch(`https://localhost:7150/api/book/${id}`, {
        method: 'DELETE',
        'Content-Type': 'application/json',
    })
    if (!response.ok) {
        console.log('Something went wrong...')
    } 
}


// const updateBook = () => {
//     fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(books),
//     })
//         .then((response) => {
//             return response.json()
//         })
//         .then((data) => {})
//         .catch((e) => {
//             console.log(e)
//         })
// }
