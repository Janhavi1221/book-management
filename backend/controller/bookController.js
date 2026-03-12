const book = require("../model/book");

// Add Book
const handleBookController = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);

        if (!data.BookTitle || !data.BookAuthor || !data.PublishDate || !data.Price) {
            return res.status(400).json({
                Message: "All fields are required",
                Success: false
            });
        }

        const bookdata = await book.create(data); // better than insertOne

        return res.status(200).json({
            Message: "Book added successfully",
            Success: true,
            Book: bookdata
        });

    } catch (err) {
        return res.status(500).json({
            Message: err.message,
            Success: false
        });
    }
};


// Get All Books
const handleBookListController = async (req, res) => {
    try {
        const booklist = await book.find({});

        return res.status(200).json({
            Message: "Book details fetched successfully",
            Success: true,
            BookList: booklist,
            TotalBooks: booklist.length   // fixed typo
        });

    } catch (err) {
        return res.status(500).json({
            Message: err.message,
            Success: false
        });
    }
};


// Find One Book
const handleFindBookController=async(req,res)=>
    {
         try
        { const data=req.body; 
            console.log(data); 
            const b=await book.find({_id:data.Id}); 
            if(b) {
                 return res.status(200).json({Message:"book details fetched successfully",Success:true,Book:b}) 
                } 
                return res.status(400).json({Message:"book not found",Success:false})
             } 
             catch(err)
             { return res.status(500).json({Message:err.message,Success:false })
    }
};


// Update Book
const handleUpdateBookController = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        if (!data.BookTitle || !data.BookAuthor || !data.PublishDate || !data.Price) {
            return res.status(400).json({
                Message: "All fields are required",
                Success: false
            });
        }

        const updatedBook = await book.findByIdAndUpdate(
            id, 
            data, 
            { new: true, runValidators: true }
        );

        if (!updatedBook) {
            return res.status(404).json({
                Message: "Book not found",
                Success: false
            });
        }

        return res.status(200).json({
            Message: "Book updated successfully",
            Success: true,
            Book: updatedBook
        });

    } catch (err) {
        return res.status(500).json({
            Message: err.message,
            Success: false
        });
    }
};

// Delete Book
const handleDeleteBookController = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBook = await book.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({
                Message: "Book not found",
                Success: false
            });
        }

        return res.status(200).json({
            Message: "Book deleted successfully",
            Success: true,
            Book: deletedBook
        });

    } catch (err) {
        return res.status(500).json({
            Message: err.message,
            Success: false
        });
    }
};

module.exports = {
    handleBookController,
    handleBookListController,
    handleFindBookController,
    handleUpdateBookController,
    handleDeleteBookController
};