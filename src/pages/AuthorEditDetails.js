import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { getAuthorById, updateAuthor } from '../shared/authorApi'
import Button from 'react-bootstrap/Button'
import '../components/Author.css'

export default function AuthorEditDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const url = 'api/author'
    const fetchUrl = `https://localhost:7150/${url}/${id}`
    const [authors, setAuthor] = useState()
    const [name, setName] = useState()
    const [age, setAge] = useState()
    const [location, setLocation] = useState()
    const [alertVisable, setAlertVisable] = useState(false)

    // useEffect(() => {
    //     fetch(fetchUrl)
    //         .then((response) => {
    //             return response.json()
    //         })
    //         .then((data) => {
    //             setAuthor(data)
    //         })
    // }, [])

    const { data: author, isError, isLoading, error } = useQuery({
        queryKey: ['author', id],
        queryFn: () => getAuthorById(id),
    })

    const updateAuthorMutation = useMutation({
        mutationFn: updateAuthor,
        onSuccess: (data) => {
            queryClient.setQueryData(['author', id], author)
        },
    })

    const handleUpdate = (e) => {
        e.preventDefault()
        // updateAuthorMutation.mutate({
        //     id: id,
        //     name: name,
        //     age: age,
        //     location: location,
        // })
        navigate('/authors')
    }

    // const updateAuthor = (e) => {
    //     e.preventDefault()
    //     const data = {
    //         ...author,
    //         name: author.name,
    //         age: author.age,
    //         location: author.location,
    //     }

    //     fetch(fetchUrl, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data),
    //     })
    //         .then((response) => {
    //             if (response.status === 204) {
    //                 setAlertVisable(true)
    //                 setTimeout(() => {
    //                     setAlertVisable(false)
    //                 }, 4000)
    //             } else {
    //                 throw new Error('Error: Update failed miserably!')
    //             }
    //             setAuthor(data)
    //         })
    //         .catch((e) => {
    //             console.log('Error: ', e)
    //         })
    // }

    return (
        <>
            <p className='bootylicious'>Edit this Author</p>
            <h1 className='bootylicious'>--==AUTHOR==--</h1>
            <div className='hr'>
                <hr />
                {alertVisable ? (
                    <div className='alert alert-success' role='alert'>
                        Success: Updated successfully!
                    </div>
                ) : null}
            </div>
            {author ? (
                <div className='bootylicious'>
                    <div className='container col-md-5 row mx-auto'>
                        {' '}
                        <label className='col'>{author.name}:</label>{' '}
                        <input
                            className='col'
                            type='text'
                            value={author.name}
                            onChange={(e) => {
                                // setName(e.target.value)
                                // setAuthor({ ...author, name: e.target.value })
                                updateAuthorMutation.mutate({
                                    id: id,
                                    name: e.target.value,
                                })
                            }}
                        />
                    </div>
                    <div className='container col-md-5 row mx-auto'>
                        {' '}
                        <label className='col'>{author.age}:</label>{' '}
                        <input
                            className='col'
                            type='number'
                            value={author.age}
                            onChange={(e) => {
                                setAge(e.target.value)
                                // setAuthor({ ...author, age: e.target.value })
                            }}
                        />
                    </div>
                    <div className='container col-md-5 row mx-auto'>
                        {' '}
                        <label className='col'>{author.location}:</label>{' '}
                        <input
                            className='col'
                            type='text'
                            value={author.location}
                            onChange={(e) => {
                                setLocation(e.target.value)
                                // setAuthor({
                                //     ...author,
                                //     location: e.target.value,
                                // })
                            }}
                        />
                    </div>
                    <br />
                    <h1 className='bootylicious'>--==BOOKS==--</h1>

                    <div className='hr'>
                        <hr />
                    </div>

                    {author.books.length > 0
                        ? author.books.map((book) => {
                              return (
                                  <div
                                      className='container mx-auto'
                                      key={book.id}
                                  >
                                      {book.name}
                                  </div>
                              )
                          })
                        : null}

                    <Link className='links' to={'/authors/' + id}>
                        <br />
                        <div className='bootylicious back-edit'>
                            <Button variant='light' size='md'>
                                Back
                            </Button>
                            <Button
                                variant='primary'
                                size='md'
                                onClick={handleUpdate}
                            >
                                Save
                            </Button>
                        </div>
                    </Link>
                </div>
            ) : null}
        </>
    )
}
