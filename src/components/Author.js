function Author(props) {
  return (
    <>
      <h3>The author is: {props.name}</h3>
      <p>This is an author for a book.</p>
      <h4>Most notable genre: {props.genre ? props.genre : 'No Genre Assigned'}</h4>
    </>
  )
}

export default Author