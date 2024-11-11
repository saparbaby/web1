Dombra Store
A web application for Dombra enthusiasts to explore, order, and interact with custom Dombra options. This project includes features like user authentication, theme switching, live countdown offers, and a rating system to enhance user engagement with Dombra products.

Table of Contents:
Features
Installation
Usage
File Structure
Dependencies
Customization
Future Improvements

Features:
Catalog and Gallery: Browse various Dombra options with images and descriptions.

Order Form: Place orders with a customizable form, including a drag-and-drop area for adding images.

User Authentication: Log in and log out functionality with personalized theme settings.

Theme Switching: Toggle between light and dark modes, with the selected theme saved per user.

Countdown Offer: Display a countdown timer for a limited-time offer on specific products.

Interactive Ratings: Users can rate the store with a 5-star system.

Button Sound Effects: Click sounds on actions like placing an order and submitting a rating.

Image Drag-and-Drop: Drag images from the gallery and drop them into the order form.

Background Color Changer: Customize the background color for a personalized experience.

Installation:
Clone the repository:

bash
Копировать код
git clone https://github.com/yourusername/dombra-store.git
cd dombra-store
Dependencies: This project uses some external libraries via CDN (Bootstrap, jQuery, etc.), so ensure you have an internet connection.

Serve the Application: Open index.html in a browser or use an HTTP server:

bash
Копировать код
python3 -m http.server
Place the Sound File: Make sure click-sound.mp3 is in the root directory. If you move it, update the path in script.js.

Usage:
Open index.html in your browser.
Use the navbar to navigate through sections:
About: Learn about the Dombra.
Catalog: View different Dombra types.
Order: Fill out and submit an order form.
Reviews: Rate the store with a 5-star system.
Gallery: Drag images from the gallery to the order form’s drop area.
Log In / Log Out:
Click Log In to sign in for personalized theme settings.
Log out when needed; your theme preferences remain saved.

Theme Toggle:
Toggle between light and dark themes; your selection is saved per user.
Countdown Offer:
Check the countdown timer for time-limited discounts.


File Structure:
assik3.html: Main HTML structure of the application.
styles.css: Contains custom styles for themes, sections, and layout.
script.js: JavaScript for interactive features, such as user authentication, theme management, order processing, and more.
click-sound.mp3: Sound effect file used for button clicks.

Dependencies:
Bootstrap 4.5.2: Provides layout and component styling.
Font Awesome 5.15.4: Used for icons like theme toggles and ratings.
jQuery 3.5.1: Simplifies DOM manipulation for dynamic functionality.
Popper.js: Supports Bootstrap’s tooltips and popovers.

Customization:
Themes: Modify light and dark mode styles in styles.css.
Sound Effects: Replace click-sound.mp3 with your own sound file, updating the path in script.js if necessary.
Countdown Timer: Adjust the countdown timer duration in script.js by changing countdownDate.

Future Improvements:
User Registration: Add backend support for user accounts and preferences.
Order Processing: Link order form data to a backend for real-time processing.
Real-time Offers: Integrate dynamic offers by connecting with a backend server.