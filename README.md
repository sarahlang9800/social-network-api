# social-network-api
```
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria 
```
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Table of Contents

* [Technologies](#technologies)
* [Link to Repo](#link-to-repo)
* [Walkthrough Video](#walkthrough-video)
* [Example GIF's](#example-gifs)
* [Summary](#summary)
* [Challenge Help](#challenge-help)

## Technologies 
* JavaScript
* MongoDB
* Mongoose
* Express.js

## Link to Repo
[GitHub](https://github.com/sarahlang9800/social-network-api)

## Walkthrough Video
[Screencastify](https://drive.google.com/file/d/1YyHKAFNEzI1-xSiDq73l0MNh-cu4a-ET/view)

## Example GIF's 
![Social Network API Example Animations](/Assets/18-nosql-homework-demo-01.gif)
![Social Network API Example Animations](/Assets/18-nosql-homework-demo-02.gif)
![Social Network API Example Animations](/Assets/18-nosql-homework-demo-03.gif)
![Social Network API Example Animations](/Assets/18-nosql-homework-demo-04.gif)

## Summary
* Built an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list.
* All of the technical acceptance criteria is met for challenge 18.
* Walkthrough video demonstrates how to start the application’s server.
* GET routes for all users and all thoughts being tested in Insomnia and demonstrated in walkthrough video.
* GET routes for a single user and a single thought being tested in Insomnia and demonstrated in walkthrough video.
* POST, PUT, and DELETE routes for users and thoughts being tested in Insomnia and demonstrated in walkthrough video.
* POST and DELETE routes for a user’s friend list being tested in Insomnia and demonstrated in walkthrough video.
* POST and DELETE routes for reactions to thoughts being tested in Insomnia and demonstrated in walkthrough video.
* Uses the Mongoose package to connect to a MongoDB database.
* Includes User and Thought models as outlined in the Challenge instructions.
* Includes schema settings for User and Thought models as outlined in the Challenge instructions.
* Application deletes a user's associated thoughts when the user is deleted.

### Challenge Help
* AskBCS Learning Assistants