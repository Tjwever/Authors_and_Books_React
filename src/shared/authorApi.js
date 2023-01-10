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

export const deleteAuthor = async ({ id }) => {
    const response = await fetch(`https://localhost:7150/api/author/${id}`, {
        method: 'DELETE',
        'Content-Type': 'application/json',
    })
    if (!response.ok) {
        console.log('Something went wrong...')
    } 
}
