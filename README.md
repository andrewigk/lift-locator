Lift Locator aims to help fitness enthusiasts around the world to find suitable training environments. Drawing on crowd-sourced community data, Lift Locator is an up-to-date compendium of specialized training facilities around the world.

Tools Used:  
React.js  
Express.js/Node  
MongoDB Atlas + Mongoose  
@google-auth-library  
@react-oauth/google  
@axios  
react-map-gl + MapLibre  
express-session for development, intend to implement a store like connect-redis or connect-mongo  

Build Instructions:  

You will need a MongoDB Atlas account initialized to set-up the database connection.  
You will need to create a new project on Google Cloud Platform and obtain OAuth 2.0 client credentials from the Google API Console: https://console.cloud.google.com/projectselector2/apis/dashboard?supportedpurview=project.  
You'll also need an API key from a Map tiles provider, such as MapTiler (which has a generous free tier): https://www.maptiler.com/  

Use Docker to build the backend and frontend respectively, passing these environment variables:  
Backend:  
MONGO_URI  
CLIENT_ID  
CLIENT_SECRET  
Frontend:  
VITE_MAP_STYLE  
VITE_CLIENT_ID  



