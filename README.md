# henkejo-pontuscm-vt22-project-group36

## PocketCocktail

https://dh2642-group36-project.web.app/

## Setup for running locally

download and install node.js

npm install

npm run dev

local web app is then found at http://localhost:8080/index.html


## Setup for online hosting with persistency on firebase.

https://console.firebase.google.com/

Login with a Google account

Create a new Project

In the Project create a new App of type Web Open your App and add a Realtime Database

Under Realtime Database / Rules (or at db creation) set the rules to
{
"rules": {
".read": true,
".write": true }
}

Update src/firebaseConfig.js according to your firebase project information.

Online web app can then be found by following the link that is listed in your firebase project.
