Lift Locator aims to help fitness enthusiasts around the world to find suitable training environments. Drawing on crowd-sourced community data, Lift Locator is an up-to-date compendium of specialized training facilities around the world.

Documentation/walk-through of the application can be found here: https://docs.google.com/document/d/1dB8aHhussOCG1jyZbH82DHgGqHAV1xXD5dBEl849vs0/edit?usp=sharing

Tools Used:  
React.js  
Express.js/Node  
MongoDB Atlas + Mongoose  
@google-auth-library  
@react-oauth/google  
@axios  
react-map-gl + MapLibre  
connect-redis/ioredis + Redis for session management 
Docker
Material UI


Build Instructions:  

You will need a MongoDB Atlas account initialized to set-up the database connection.  
You will need to create a new project on Google Cloud Platform and obtain OAuth 2.0 client credentials from the Google API Console: https://console.cloud.google.com/projectselector2/apis/dashboard?supportedpurview=project.  
You'll also need an API key from a Map tiles provider, such as MapTiler (which has a generous free tier): https://www.maptiler.com/  

Use Docker to run the compose files to build the environment to test on localhost. Will need an .env file in the backend and frontend respectively with the necessary data and fields as specified.



