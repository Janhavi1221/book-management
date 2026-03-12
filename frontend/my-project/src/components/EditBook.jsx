import React,{useState,useEffect} from "react";
import axios from "axios";
import {useParams,useNavigate} from "react-router-dom";

function EditBook(){

const {id} = useParams();
const navigate = useNavigate();

const [book,setBook] = useState({
BookTitle:"",
BookAuthor:"",
PublishDate:"",
Price:""
})

useEffect(()=>{
getBook();
},[])

const getBook = async()=>{
const res = await axios.get(`http://localhost:8000/books/${id}`);
setBook(res.data);
}

const handleChange=(e)=>{
setBook({...book,[e.target.name]:e.target.value})
}

const handleSubmit=async(e)=>{
e.preventDefault();

await axios.put(`http://localhost:8000/books/${id}`,book);

alert("Book Updated");

navigate("/");
}

return(

<div style={{padding:"20px"}}>

<h2>Edit Book</h2>

<form onSubmit={handleSubmit}>

<input
type="text"
name="BookTitle"
value={book.BookTitle}
onChange={handleChange}
/>

<br/><br/>

<input
type="text"
name="BookAuthor"
value={book.BookAuthor}
onChange={handleChange}
/>

<br/><br/>

<input
type="date"
name="PublishDate"
value={book.PublishDate}
onChange={handleChange}
/>

<br/><br/>

<input
type="number"
name="Price"
value={book.Price}
onChange={handleChange}
/>

<br/><br/>

<button type="submit">Update</button>

</form>

</div>

)

}

export default EditBook;