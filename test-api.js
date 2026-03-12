// Test API connection from frontend perspective
const testBook = {
  title: "Frontend Test Book",
  author: "Frontend Test Author", 
  publishDate: "2024-01-20",
  price: "19.99",
  description: "Testing frontend API"
};

fetch('http://localhost:8000/book/add', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    BookTitle: testBook.title,
    BookAuthor: testBook.author,
    PublishDate: testBook.publishDate,
    Price: parseFloat(testBook.price),
    Description: testBook.description
  }),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch(error => {
  console.error('Error:', error);
});
