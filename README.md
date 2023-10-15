# Javasscript 2 - Course Assignment

This is a School web project that utilizes Bootstrap, Sass and javascript. It also uses Live Server for a development server. Below are instructions on how to set up and run the project.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js: You'll need Node.js installed on your machine. If you don't have it, you can download it from [nodejs.org](https://nodejs.org/).

## Getting Started

To get this project up and running, follow these steps:

1. Clone this repository to your local machine using:

   ```
   git clone [https://github.com/your-username/your-project-name.git](https://github.com/Noroff-Anders/css-frameworks-ca.git)



Install the necessary dependencies. Run the following commands:
```
npm install -D sass
npm install bootstrap
npm install -D live-server
```
These commands will install Sass, Bootstrap, and Live Server as development dependencies.

After the installation is complete, you can start the development server by running:
```
    npm run watch
```

ChatApp - noroff social media
 - ChatApp is an school project social media website for noroff students  using the noroff API: https://docs.noroff.dev/.
 - for authentication JWT token is used. this token is stored is retreived and stored in local storage when the user logs in.
 - The user will be redirected to a feed of posts from all noroff students. Here the user can create their own posts. A post that has been created can be deleted or editet bu clicking on the post header in the feed. these buttons allow the user to either delete or edit the post and will only show on a post where the author of the post matches the name logged wich is stored in local storage.
 - The user has the option to filter posts  after likes or comments. Only posts with atleas one of either will be displayed in an descending order.
 - if the user want to see the comments of an post, they can click on the posts body for a single view of the post.
 - if the user click on the  author name in the header of a post, the user will be redirected to a profile view where that users posts, follower and following users will be displayed.
 - on the feed page is also a search bar that will dyanmically retreive the posts matching the vaule typed in the search input.
