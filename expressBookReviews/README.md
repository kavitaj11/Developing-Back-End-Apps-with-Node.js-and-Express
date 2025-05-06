# coding-project-template

Understanding the user routes
Navigate to the router directory having the below 3 files:

booksdb.js - This contains the the preloaded book information for this application.

general.js - This contains the skeletal implementations for the routes which a general user can access.

auth_users.js - This contains the skeletal implementations for the routes which an authorized user can access.





Task 1:
Complete the code for getting the list of books available in the shop under public_users.get('/',function (req, res) {.
Hint: Use the JSON.stringify method for displaying the output neatly.

Run npm install for installing the required modules.
Run npm start to start the server.



Task 2:
Complete the code for getting the book details based on ISBN under public_users.get('/isbn/:isbn',function (req, res) {.
Hint: Retrieve the ISBN from the request parameters



Task 3:
Complete the code for getting the book details based on the author under public_users.get('/author/:author',function (req, res) {.
Hints:
1. Obtain all the keys for the ‘books’ object.
2. Iterate through the ‘books’ array & check the author matches the one provided in the request parameters.




Task 4:
Complete the code for getting the book details based on the title under public_users.get('/title/:title',function (req, res) {.
Hint: This will be similar to Exercise 3




Task 5:
Complete the code for getting book reviews under public_users.get('/review/:isbn',function (req, res) {.
Hint: Get the book reviews based on ISBN provided in the request parameters.




Task 6:
Complete the code for registering a new user
Hint: The code should take the ‘username’ and ‘password’ provided in the body of the request for registration. If the username already exists, it must mention the same & must also show other errors like eg. when username &/ password are not provided.





Update and test the authenticated user routes in auth_users.js.

Task 7:
Complete the code for logging in as a registered user.
Hint: The code must validate and sign in a customer based on the username and password created in Exercise 6. It must also save the user credentials for the session as a JWT.
As you are required to login as a customer, while testing the output on Postman, use the endpoint as "customer/login"



Task 8:
Complete the code for adding or modifying a book review.
Hint: You have to give a review as a request query & it must get posted with the username (stored in the session) posted. If the same user posts a different review on the same ISBN, it should modify the existing review. If another user logs in and posts a review on the same ISBN, it will get added as a different review under the same ISBN.



Task 9:
Complete the code for deleting a book review under regd_users.delete("/auth/review/:isbn", (req, res) => {

Hint: Filter & delete the reviews based on the session username, so that a user can delete only his/her reviews and not other users’.






Improving the scope of Tasks 1-4 using Promises or Async-Await
You will now use Promise callbacks or Async-Await functions for doing the same functionality which we covered synchronously in Tasks 1-4.

Task 10:
Add the code for getting the list of books available in the shop (done in Task 1) using Promise callbacks or async-await with Axios.
Hint: Refer to this lab on Promises and Callbacks.

Please ensure that the general.js file has the code for getting the list of books available in the shop using Promise callbacks or async-await with Axios is covered.




Task 11:
Add the code for getting the book details based on ISBN (done in Task 2) using Promise callbacks or async-await with Axios.
Hint: Refer to this lab on Promises and Callbacks.

Please ensure that the general.js file has the code for getting the book details based on ISBN using Promise callbacks or async-await with Axios is covered.





Task 12:
Add the code for getting the book details based on Author (done in Task 3) using Promise callbacks or async-await with Axios.
Hint: Refer to this lab on Promises and Callbacks.

Please ensure that the general.js file has the code for or getting the book details based on Author using Promise callbacks or async-await with Axios is covered.



Task 13:
Add the code for getting the book details based on Title (done in Task 4) using Promise callbacks or async-await with Axios.
Hint: Refer to this lab on Promises and Callbacks.

Please ensure that the general.js file has the code for or getting the book details based on Title using Promise callbacks or async-await with Axios is covered.







Testing using curl commands:


curl -X GET http://localhost:5000/


curl -X GET http://localhost:5000/isbn/1


curl -X GET http://localhost:5000/author/Jane%20Austen


curl -X GET http://localhost:5000/title/The%20Epic%20Of%20Gilgamesh



curl -X POST http://localhost:5000/register -H "Content-Type: application/json" -d "{\"username\": \"john_doe\", \"password\": \"secret123\"}"


curl -X POST http://localhost:5000/customer/login -H "Content-Type: application/json" -d "{\"username\": \"john_doe\", \"password\": \"secret123\"}" -c cookie.txt


curl -X PUT http://localhost:5000/customer/auth/review/1 -H "Content-Type: application/json" -d "{\"review\": \"Absolutely loved this book!\"}" -b cookie.txt


curl -X DELETE http://localhost:5000/customer/auth/review/1 -b cookie.txt
