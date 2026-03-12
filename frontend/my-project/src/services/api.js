const API_BASE_URL = 'http://localhost:8000/book';

export const bookAPI = {
  // Get all books
  getAllBooks: async () => {
    try {
      console.log('Fetching all books from:', `${API_BASE_URL}/getbooks`);
      const response = await fetch(`${API_BASE_URL}/getbooks`);
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      const data = await response.json();
      console.log('Books API response:', data);
      return data;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  },

  // Add a new book
  addBook: async (bookData) => {
    try {
      console.log('Adding book with data:', bookData);
      
      const payload = {
        BookTitle: bookData.title,
        BookAuthor: bookData.author,
        PublishDate: bookData.publishDate,
        Price: parseFloat(bookData.price),
        Description: bookData.description || ''
      };
      
      console.log('Sending payload:', payload);
      console.log('To URL:', `${API_BASE_URL}/add`);
      
      const response = await fetch(`${API_BASE_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      const data = await response.json();
      console.log('Response data:', data);
      
      return data;
    } catch (error) {
      console.error('Error adding book:', error);
      throw error;
    }
  },

  // Find a book by ID
  findBook: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/findbook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Id: id }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error finding book:', error);
      throw error;
    }
  },

  // Update a book (Note: Backend doesn't have update endpoint, but we'll add it)
  updateBook: async (id, bookData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          BookTitle: bookData.title,
          BookAuthor: bookData.author,
          PublishDate: bookData.publishDate,
          Price: parseFloat(bookData.price),
          Description: bookData.description || ''
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating book:', error);
      throw error;
    }
  },

  // Delete a book (Note: Backend doesn't have delete endpoint, but we'll add it)
  deleteBook: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting book:', error);
      throw error;
    }
  }
};
