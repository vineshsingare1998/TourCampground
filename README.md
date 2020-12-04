## Tour_campground
Landing page with option to write about the place visited by visitor
![](https://github.com/vineshsingare1998/TourCampground/blob/master/Screenshot%20(1).png?raw=true)
![](https://github.com/[username]/[reponame]/blob/[branch]/image.jpg?raw=true)
![](https://github.com/[username]/[reponame]/blob/[branch]/image.jpg?raw=true)

This project was created using Node.js, Express, MongoDB, and Bootstrap. Passport.js was used to handle authentication.

YelpCamp is a website where users can create and review campgrounds. In order to review or create a campground, you must have an account. This project was part of Colt Steele's web dev course on udemy.

Features
Users can create, edit, and remove campgrounds
Users can review campgrounds once, and edit or remove only their own review
Search campground by name or location
Can be run locally or online cloud9 or goormide

Can Run it locally
Install mongodb
Create a cloudinary account to get an API key and secret code
git clone https://github.com/kaushikdeepak/Tour_campground.git
cd Tour_campground
npm install
Create a .env file (or just export manually in the terminal) in the root of the project and add the following:

DATABASEURL='<url>'
API_KEY=''<key>
API_SECRET='<secret>'
Run mongod in another terminal and node app.js in the terminal with the project.

Then go to localhost:3000.
