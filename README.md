 ![alt text](https://github.com/loti-ibrahimi/Spruced/blob/master/Spruced-logo.png) 
 ### Creator: Loti Ibrahimi 
 ### Student Number: 20015453
 
 ## Description of Application 
 Web application platform for individual barbers to showcase their cuts - Spruced.
 
 Preview of Web App (back-end) server testing - YouTube link: https://www.youtube.com/watch?v=yVPqSdyGbFg
 
 ## Functionality Description
 ### Showcase Models:
 1. Cuts - Range of haircuts (cutType, cutPrice, cutDate, barberName, likes)
 2. Barbers - Range of barbers (barberName, barberBio, tel, likes)
 
 #### Haircuts Routes
 * GET/ - **cuts** - Returns all Cuts stored in the database with their associated metadata.
 * GET/ - **cuts/:id** - Returns an individual Cut of a specified Cut ID with associated metadata.
 * GET/ - **cuts/barberName/:barberName** - Returns all Cuts of the specified Barber with associated metadata.
 * GET/ - **cuts/cutDate/:cutDate** - Returns all Cuts of a specified Date with associated metadata.
 * POST/ - **cuts** - Creates a new cut with provided metadata.
 * PUT/ - **cuts/:id** - Updates an individual Cut with provded metadata.
 * PUT/ - **cuts/:id/likes** - Updates an individual Cut by incrementing the likes +1.
 * DELETE/ - **cuts/:id** - Deletes an individual cut with its associated metadata.
 
 #### Barbers Routes
 * GET/ - **barbers** - Returns all Barbers stored in the database with their associated metadata.
 * GET/ - **barbers/:id** - Returns an individual Barber of a specified Barber ID with associated metadata.
 * GET/ - **barbers/barberName/:barberName** - Returns an individual Barber via specified Barber name, with associated metadata.
 * GET/ - **barbers/region/:region** - Returns all Barbers of a specified Region with provided metadata.
 * POST/ - **barbers** - Creates a new Barber with provided metadata.
 * PUT/ - **barbers/:id** - Updates an individual Barber via specified Barber ID with provided metadata.
 * PUT/ - **barbers/:id/likes** - Updates an individual Barber by incrementing the likes +1.
 * DELETE/ - **barbers/:id** - Deletes an individual Barber via specified Barber ID along with associated metadata.
 
 ## Deployment
 ![alt text](https://github.com/loti-ibrahimi/Spruced/blob/master/heroku.jpeg) 
 
 The Web App was deployed using Heroku: https://spruced.herokuapp.com/
 
 ## Persistence 
 ![alt text](https://github.com/loti-ibrahimi/Spruced/blob/master/mlab.png)
 
 **MongoDB** and **Mongoose** were made use of in the development of this Web App back-end. 
 MongoDB is a free and open-source cross-platform document-oriented database program. 
 Using MongoDB I created a *database* called **'getsprucedb'**. This database has two *collection*: **'cuts'** & **'barbers'**, which contain associated documents. 
 
 I used **mLab** to store my Web App data in the cloud.  
 
 ## DX Approach
 Clear & readable code format - made use of comments throughout the project files, not only to provide an explanation of functions of the code in use but also for visual neatness/readability. 
 
 ## References 
 The base code structure was created with the help of David Drohans [Web App Development 2 (lab tutorials)](https://ddrohan.github.io/wit-wad-2-2018/topic02-wad/index.html).

