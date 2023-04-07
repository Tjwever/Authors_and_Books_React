const url = 'api/author'

export const getAuthors = async () => {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

export const getAuthorById = async (id) => {
    const response = await fetch(`https://localhost:7150/api/author/${id}`)
    const data = await response.json()
    return data
}

export const newAuthor = async (author) => {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(author),
        headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()
    return data
}

 export const updateAuthor = async (author) => {
    // e.preventDefault()
    const data = {
        ...author,
        name: author.name,
        age: author.age,
        location: author.location,
    }

    const response = await fetch(`https://localhost:7150/api/author/${author.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        
}

export const deleteAuthor = async ({ id }) => {
    const response = await fetch(`https://localhost:7150/api/author/${id}`, {
        method: 'DELETE',
        'Content-Type': 'application/json',
    })
    if (!response.ok) {
        console.log('Something went wrong...')
    } 
}
