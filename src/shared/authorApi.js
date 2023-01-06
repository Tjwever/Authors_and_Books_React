const url = 'api/author'

export const getAuthors = async () => {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

export const newAuthor = (name, age, location) => {
    const data = { name: name, age: age, location: location }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Something went wrong')
            }
            return response.json()
        })
        .then((data) => {
            // TODO - return the data, or set
        })
        .catch((e) => {
            console.log(e)
        })
}
