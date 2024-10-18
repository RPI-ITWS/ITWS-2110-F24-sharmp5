Pranay Sharma
Websystems Development
Lab 4 
README


My first question to ChatGPT is simply just the lab 3 instructions and it provided code that, of course, won't work since no API information has been provided. 

My second prompt is to send ChatGPT each code file of mine 1 by 1. Starting with the HTML the Javascript, then PHP files. I told the AI not to do anything each time to where it only provided me with comments, complimenting my code structure or observing that the code seems to work. 

For example, this was the answer and feedback after I sent my update_data.php file:


“Thank you for sharing update_data.php. This script is comprehensive, with functionality to update both weather_data and astronomy_data tables. It checks the incoming JSON data, updates the most recent row in each respective table based on the specified data, and provides error handling for missing fields.
Once you provide the additional instructions, I’ll review everything together and ensure the entire codebase aligns with the lab requirements and addresses any other aspects you’d like to refine. Just let me know when you’re ready!” 
Once all of my code was sent, I revealed to it the lab 4 instructions in a way where I want it to recreate everything I did with its limitations including its inability to access phpmyadmin directly

This was my prompt:

“That was all the code from my last project. In this new project, I want that entire project remade using only AI. Here are the instructions: I may not write any code yourself or edit any code the AI provides. If I don’t like what I got, I will need to find another way to prompt the AI to get what I want. EVERYTHING must be AI-generated: code, images, text, everything. Nothing can come from your own hand. It does not need to be 1-to-1 identical, but any functionality that exists in the previous project I coded must exist by you, the AI. You will be graded on how close you replicate the functionality between my code and your code.”

ChatGPT’s Answer: “Let's start with the HTML structure for your project, similar to the one you used in Lab 3. I’ll generate the HTML, and then we can move on to the CSS, JavaScript, and PHP files as needed to replicate the functionality. Just let me know when you’re ready to begin, or if you’d like to tackle a specific part of the project first!”

I told it to begin with the HTML and it provided an AI generated layout of its goal. I think it is able to generate images due to me having ChatGPT 4.0. 

The HTML Code it provided is the one being used for this project’s index.html
My next prompt was: 
“Now recreate the entire javascript, remember you do not have direct access to phpmyadmin. So along with that, send instructions of what to do in phpmyadmin and what you would do to make all the code files such as the php files work.”
ChatGPT’s Response gave the javascript code (used in project) along with instructions for the mysql tables:

I then prompted ChatGPT to make the PHP files with a provided password. 
ChatGPT’s response after providing its generated code for each file:

“1. Save PHP Files: Save each of these PHP files (save_weather_data.php, save_astronomy_data.php, load_data.php, update_data.php) in your project directory on the server.
2.  Database Setup: Follow the MySQL setup instructions to create the weatherastronomydb database and the necessary tables if you haven't already done so.
3. Configure Database Credentials: Replace "your_password" with your actual MySQL root password in each PHP file where the $mysqli connection is established.
4. Permissions: Make sure your PHP files have the necessary permissions to be accessed by the JavaScript on your frontend.
5. Testing: Test each functionality by clicking the corresponding buttons on your HTML page to ensure data is saved, loaded, and updated correctly in the database.
This should set up all necessary files and make your lab project fully functional. Let me know if you'd like further customization or additional details!”

I had to give ChatGPT the correct openweathermap API fetch link as it needs that and so that it could display weather in Troy, NY. The code and instructions for creating the mysql tables itb provided me were all correct. I was having trouble as I noticed file names and database table names need to be changed, So I asked chat to rewrite accordingly by changing certain names. It had trouble in other aspects where when giving the correct API fetch links. It completely forgot and took out the already working function to update fetched data.  The input text boxes completely disappeared.
My prompt for this was: “Everything works perfectly, however the updating the openweathermap API text buttons is no longer there. Why did you remove that? Add that back witgout changing how the NASA API is fetched, displayed, and updated. Everything works perfectly, however the updating the openweathermap API text buttons is no longer there. Why did you remove that? Add that back without changing how the NASA API is fetched, displayed, and updated.”
It then finally re-added the lost function and display buttons, so I then prompted it to update the style sheet to match the generated image it gave earlier. 

I then had it generate an image of space and had it apply that image as the background while also making the API containers feel more like widgets. 