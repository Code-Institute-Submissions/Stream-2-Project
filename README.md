McDonald's Menu
================
This Web App was built as the second project for the Code Institute's classroom bootcamp.
It is an interactive Data visualisation Web Application using Pythons Flask framework.
The web app shows the nutritional content of the macdonald's menu.

Live Demo
==========

Follow this link to view deployed version of the web app:https://stream2-mcdonalds.herokuapp.com/

Built with
===========
*Flask

*Python

*HTML

*CSS

*Bootstrap

*MongoDB database

*JavaScript Libraries:

d3.js
      
dc.js
      
crossfilter.js
      
queue.js
      
A dataset obtained (https://www.kaggle.com/mcdonalds/nutrition-facts/data)

Components
=============

Flask
========

A Python micro-framework that was used to serve the data and render the HTML pages for this Application

Python
========
A Python file name threatened_species.py renders a graphs.html template and builds a web server using pymongo to interact with MongoDB

MongoDB database
================

NoSQL database that converts and presents data in JSON format. The dataset resource was downloaded as a csv file from (https://www.kaggle.com/mcdonalds/nutrition-facts/data) 

Queue.js
==========

An asynchronour helper library for JavaScript

Crossfilter.js
================

A Javascript based data manipulation library that enables two way data binding - you will see this in action when a section of a graph is clicked, all the other graphs filter

D3.js
========

A JavaScript based visualisation engine that renders interactive charts and graphs in svg format when given data, which are then passed in to divs in graphs.html

Dc.js
======

A Javascript based wrapper library for d3.js - this made plotting the charts easier

Deployment / Hosting
=====================

This Application was deployed and is hosted on Heroku - gunicorn Python package runs the http server for the app, the Procfile gives Heroku the information to run the app and requirements.txt is a file that conains all the Python packages (pip installs) required to run the app. mLab MongoDB was chosen to host the dataset on the server.

Testing
=======

This Application was tested across a range of browsers.

