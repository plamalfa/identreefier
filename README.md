# project-2
WDI Ewoks Project 2

<b>Features</b>

Welcome to idenTREEfier - the app that helps you find and favorite trees in any NYC zipcode. 
Once you are logged in, enter any valid zipcode within the New York City limits to generate a collection of pins on a map, with each pin representing an individual tree. This data is pulled from the NYC 2015 Tree Census Data, and plotted using the Google Maps Javascript API. Click a pin to generate data about each tree including its species, latin name, condition, address and more. Underneath the data, there is a favorite button. Clicking this button adds that tree to a personalized list of favorite trees. Each idenTREEfier user has a unique favorites list. Users can add and edit notes about each of their favorite trees, and delete trees from their favorites list.

<b>Approach Taken</b>

Firstly, I set up my tree_app database and created 2 tables; a user table and a favorites table, which acts as a joined-ish table, joining user IDs with tree ID's from the NYC Open Data - Tree Census API.
My main focus was on generating a map with pins to represent each tree in the tree API for any zipcode in NYC. This was made possible by using code supplied by the Google Maps API in ejs views as well as a static JS file. Once this was generated, I worked on pulling details about each tree from the API and displaying it as a pop-up window using the Google Maps API. Then I created a favorite button that would add an individual tree to a user's 'Favorite Tree' list and render that list. Within that list, I gave users the option to add and edit notes about each tree. 

<b>Technologies Used</b>

-HTML(EJS)<br>
-CSS<br>
-JavaScript(Node.js)<br>
-Express.js<br>
-Express-Session<br>
-File-Store<br>
-Isomorphic Fetch<br>
-Body-Parser<br>
-Method-Overide<br>
-Heroku<br>

<b>User Stories</b>

-As a Returning Web App User I want to visit the Tree Finder homepage so I can view a 'login' button

-As a Returning Web App User I want to submit a login form to compare that info with my info recorded in the User Database so I can have access to my list of favorite trees
-As a Returning Tree Finder User I want to add a favorited tree to my favorite list so I can keep track of all the best trees
-As a Returning Tree Finder User I want to be able to delete trees from my list of my previously saved favorite trees
-As a Returning Tree Finder User I want to view my updated list of favorite trees so I know my favorited tree was added

-As a Web App User I want to type in my zip code in preperation for search
-As a Neighborhood Resident I want to generate a map of trees in my zipcode so I can see where trees have been planted
-As a Neighborhood resident I want to select trees in my zipcode and return data about that tree
-As a Person Who is Curious About Trees I want to view the species of a specific tree so I can learn more about my neighborhood
-As a Dendrologist I want to view the latin species of a specific tree so I can talk to other professionals about the tree
-As a Tourist I want to view the condition of a specific tree so I can find the healthiest trees to view near me.
-As a Returning Tree Finder User I want to view the address, borough, and zipcode of a specific tree so I can know exactly where the tree is located

<b>API References</b>

-NYC Open Data - 2015 Street Tree Census - Tree Data: https://data.cityofnewyork.us/Environment/2015-Street-Tree-Census-Tree-Data/uvpi-gqnh <br>
-Google Maps Javascript API: https://developers.google.com/maps/documentation/javascript/



