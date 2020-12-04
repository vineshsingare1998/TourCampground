## Tour Campground

Animative opening page with option to land on the home page
<p align="center">
  <img width="460" height="300" src="https://github.com/vineshsingare1998/TourCampground/blob/master/Screenshot%20(1).png?raw=true">
</p>
<p>Landing page with the photo gallery of different campgrounds where user can see the information about them</p>
<p align="center">
  <img width="460" height="300" src="https://github.com/vineshsingare1998/TourCampground/blob/master/Screenshot%20(4).png?raw=true">
</p>
<p align="center">
  <img width="460" height="300" src="https://github.com/vineshsingare1998/TourCampground/blob/master/Screenshot%20(8).png?raw=true">
</p>
<p align="center">
  <img width="460" height="300" src="https://github.com/vineshsingare1998/TourCampground/blob/master/Screenshot%20(6).png?raw=true">
</p>
<p align="center">
  <img width="460" height="300" src="https://github.com/vineshsingare1998/TourCampground/blob/master/Screenshot%20(9).png?raw=true">
</p>

This project was created using Node.js, Express, MongoDB, and Bootstrap. Passport.js was used to handle authentication.

YelpCamp is a website where users can create and review campgrounds. In order to review or create a campground, you must have an account. This project was part of Colt Steele's web dev course on udemy.

## Features
* Users can create, edit, and remove campgrounds
* Users can review campgrounds once, and edit or remove only their own review
* User can share their thoughts by comment... and change or edit it
Can be run locally or online cloud9 or goormide

## Can Run it locally
* Install [mongodb](http://www.mongodb.com)
* Create a cloudinary account to get an API key and secret code
```
git clone https://github.com/vineshsingare1998/TourCampground.git
cd Tour_campground
npm install
```

 Create a .env file (or just export manually in the terminal) in the root of the project and add the following:
```
DATABASEURL='<url>'
API_KEY=''<key>
API_SECRET='<secret>'
```
 Run ```mongod``` in another terminal and ```node app.js``` in the terminal with the project.

Then go to [localhost:3000](http://localhost:3000)
