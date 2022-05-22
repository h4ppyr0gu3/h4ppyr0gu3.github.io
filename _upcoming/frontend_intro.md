---
layout: single
title: Frontend Intro
toc: true
excerpt:  Version control basically allows us to develop seperate versions of the application in a single folder
---

**Disclaimer**: This is my journey to getting started with frontend although I am a backend engineer and so to this is just a start and by no means the endgame.

## Introduction

To get started with frontend development it is very important to understand how the browser works although that could be learnt later so then the first step is to understand the language of the frontend.

There are 3 major languages/technologies being used:
- [CSS](https://developer.mozilla.org/en-US/docs/Learn/CSS/): Cascading Style Sheets
- [HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML): HyperText Markup Language
- [Javascript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript)

The attached links reference mozilla docs where you can look for more info about each language

## HTML

To get started with frontend we have to start with HTML.
HTML is very simple to understand as it is just a collection of opening and closing tags with attributes to describe what the layout should look like.
In most tutorials a ToDo app is created and that seems fitting to share the possibilities of all three of these technologies. So... to get started we start by making a file with the `.html` extension, so lets create an index.html file in a new directory:
```bash
mkdir fe_intro
cd fe_intro
touch index.html
```
now that we have created that file you can open it in your favourite text editor or IDE. I recommend an open source solution like [atom](https://atom.io/) but the choice is yours.
Add the following to the file:
```html
!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Custom Title shows up in browser tab</title>
  </head>
  <body>
    <!-- <body goes here/> -->
  </body>
</html>
```
This is just the boiler plate and doesn't add much functionality to the page which I got from this [article](https://www.freecodecamp.org/news/basic-html5-template-boilerplate-code-example/), which explains what each element is.

Now Lets get to the ToDo application, all the following code must be added between the body opening (`<body>`) and closing (`</body>`) tags, notice the forward slash on the closing tag.
First lets add a title by adding `<h1>ToDo app</h1>`, if you now open the index.html file with your browser of choice you should see a large title. This is a header tag which is self explanatory, the number can be changed from 1 (which is the largest) to 6 (smallest) which represents the size of the heading.
Now we need to give some information to the user about what this application does:
`<p>This is a list of ToDos to Achieve today</p>`
The above tag is a paragraph tag which you can see formats the text differently compared to the heading tag.
Now to list the Todos we can use a list tag. There is 2 options here, namely:
- unordered list (`<ul>` tag)
2. ordered list (`<ol>` tag)
and they do what you'd expect, but they are very extensible, for example you can use an ordered list with roman numerals or letters if you'd like.
We are going to use both so that you can appreciate the difference:
```html
<ul>
  <li> Item 1</li>
  <li> Item 2</li>
</ul>
<ol>
  <li> Item 3</li>
  <li> Item 4</li>
</ol>
```
Notice the indentation above which isn't necessary but helps to maintain the readability of the code, also notice how the list item (`<li>` tag) is surrounded by the list type tags, the list item is a child of the list type in this case, this concept will become more prominent later on.




