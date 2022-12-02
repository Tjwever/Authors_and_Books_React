function Author(props) {
  return (
    <>
      <h3>The author is: {props.name}</h3>
      <p>This is an author for a book.</p>
      <h4>They live in: {props.location ? props.location : 'No Location Assigned'}</h4>
    </>
  )
}

export default Author