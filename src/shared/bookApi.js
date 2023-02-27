const url = 'api/book'

export const getBooks = async () => {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

// const updateBook = () => {
//     fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(authors),
//     })
//         .then((response) => {
//             return response.json()
//         })
//         .then((data) => {})
//         .catch((e) => {
//             console.log(e)
//         })
// }
