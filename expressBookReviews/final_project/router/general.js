const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;

const public_users = express.Router();

const doesExist = (username)=>{
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}

public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;


  if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  // Simulating an async operation using a Promise
  const getBooks = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(books);
      }, 100); // simulate delay (e.g., database read)
    });
  };

  try {
    const allBooks = await getBooks();
    res.status(200).send(JSON.stringify(allBooks, null, 4));
  } catch (err) {
    res.status(500).json({ message: "Error fetching books" });
  }
});


// Get book details based on ISBN
// Search for the book with the specified ISBN
//Test on http://localhost:5000/isbn/1

public_users.get("/isbn/:isbn", (req, res) => {
  const requestedISBN = req.params.isbn;

  const findBookByISBN = () => {
    return new Promise((resolve, reject) => {
      const book = books[requestedISBN];
      if (book) {
        resolve(book);
      } else {
        reject(new Error("Book not found"));
      }
    });
  };

  findBookByISBN()
    .then((book) => res.status(200).json(book))
    .catch((error) => {
      console.error("Error fetching book details:", error.message);
      return res.status(404).json({ message: "Book not found" });
    });
});


// Get book details based on author
// Test on http://localhost:5000/author/Jane Austen
public_users.get("/author/:author", (req, res) => {
  const requestedAuthor = req.params.author;

  const findAuthorBook = () => {
    return new Promise((resolve, reject) => {
      const author = Object.values(books).find(
        (a) => a.author === requestedAuthor
      );
      if (author) {
        resolve(author);
      } else {
        reject(new Error("Author not found"));
      }
    });
  };

  findAuthorBook()
    .then((author) => res.status(200).json(author))
    .catch((error) => {
      console.error("Error fetching author details:", error.message);
      return res.status(404).json({ message: "Author not found" });
    });
});

// Get all books based on title
// TEST eg http://localhost:5000/title/The Epic Of Gilgamesh
public_users.get("/title/:title", (req, res) => {
  const requestedTitle = req.params.title;

  const findBookByTitle = () => {
    return new Promise((resolve, reject) => {
      const title = Object.values(books).find(
        (t) => t.title === requestedTitle
      );
      if (title) {
        resolve(title);
      } else {
        reject(new Error("Book not found"));
      }
    });
  };

  findBookByTitle()
    .then((book) => res.status(200).json(book))
    .catch((error) => {
      console.error("Error fetching book details:", error.message);
      return res.status(404).json({ message: "Book not found" });
    });
});


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const ISBN = req.params.isbn;
  res.send(books[ISBN].reviews)
});

module.exports.general = public_users;
