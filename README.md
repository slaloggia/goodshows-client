This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## GoodShows!

Browse, search, and review your favorite Broadway shows! 

![image](https://user-images.githubusercontent.com/54509406/76033822-d537d200-5f02-11ea-9734-58985272676d.png)


### Live Site
GoodShows is live at the following url:
https://good-shows.herokuapp.com/

### Features
#### Visitors
 - Browse and search shows
 - View show detail pages 
 - Click a username to see all of that user's reviews
 - Create an account

 #### Logged in users
 - Upload a profile picture
 - Add shows to your lists
 - Review shows you have seen
 - Edit and delete your reviews from your Dashboard
 - Comment on other users' reviews
 - Receive in-app notifications when another user has commented on your reviews

### Technologies

Created with React and Redux
Styled with [Semantic UI React](https://react.semantic-ui.com/)
Deployed with Heroku

Rails API backend - [repo](https://github.com/slaloggia/goodshows-api)

### Coming Features
- Direct message other users
- "Follow" other users and shows
- Activity feed 
    - Your activities
    - Activities of users you following
    - New reviews posted for shows you follow
- Scheduled and automated scraping to add new shows and news aggregator

## Local Installation
It is recommended that you visit the GoodShows! website listed at the top of this README
However, if you would like to run this project on your local environment, 
please start by cloning the backend API linked in the Technologies section above and following the instructions in the README.

Once your local rails server is running and you know your port number (see backend installation instructions)
you will need to replace all instances of 'https://good-shows-api.herokuapp.com' in this code with 'http://localhost:[YOUR PORT NUMBER]'
Most text editors have a global Find/Replace function that will make this easier.

Next, run the following:
```
npm install 
npm start
```



## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

