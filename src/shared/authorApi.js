const url = 'api/author'

export const getAuthors = async () => {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

export const getAuthorById = async (url) => {
    const response = await fetch(url)
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
