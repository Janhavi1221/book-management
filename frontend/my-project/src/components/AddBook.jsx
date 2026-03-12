import React,{useState} from "react";
import axios from "axios";

function AddBook(){

const [book,setBook] = useState({
BookTitle:"",
BookAuthor:"",
PublishDate:"",
Price:""
})

const handleChange=(e)=>{
setBook({...book,[e.target.name]:e.target.value})
}

const handleSubmit=async(e)=>{
e.preventDefault();

await axios.post("http://localhost:8000/books",book);

alert("Book Added");
}

return(

<div style={{padding:"20px"}}>

<h2>Add Book</h2>

<form onSubmit={handleSubmit}>

<input
type="text"
name="BookTitle"
placeholder="Book Title"
onChange={handleChange}
/>

<br/><br/>

<input
type="text"
name="BookAuthor"
placeholder="Author"
onChange={handleChange}
/>

<br/><br/>

<input
type="date"
name="PublishDate"
onChange={handleChange}
/>

<br/><br/>

<input
type="number"
name="Price"
placeholder="Price"
onChange={handleChange}
/>

<br/><br/>

<button type="submit">Add Book</button>

</form>

</div>

)

}

export default AddBook;