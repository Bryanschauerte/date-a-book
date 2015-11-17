# personalProjectOne
Library browsing is a live, Mean stack application. It's goal is to help users find their next book. It does that in a unique way. Users review books they have read and rate the amount (1-10) of certain charateristics are present in the book. The book reviews are all added to the mongoDb. When a user searches for a book, the engine takes a range of characteristics they enjoy and searches the database for similar books (within a user described range) and returns a list of choices and their description. 

   I used AngularJS for the front-end of the application. For styling, I used materialize for the broad strokes and CSS for fine-tuning. 
   The back-end server is run using NodeJs, MongoDb, Mongoose, ExpressJS, Cors, Body-parser PassportJS, Oauth2. PassportJS and OAuth2 run authenticaion through FaceBook and Google. Users are then added to MongoDb and their reviews are placed in another library for easier searching. The API calls are handled by ExpressJS, Cors and Body-parser. When searching for a book, the server calls to Google Book's API for infomation which is then formated and presented to the front-end. After a review is created, it is formated and pushed to MongoDb. During searches, the front-end makes a HTTP call to the server which searches the MongoDb and returns books matching the search criteria. 
