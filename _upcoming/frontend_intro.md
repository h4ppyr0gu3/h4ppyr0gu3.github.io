---
layout: single
title: Frontend Intro
toc: true
excerpt:  Version control basically allows us to develop seperate versions of the application in a single folder
---

**Disclaimer**: This is my journey of getting started with frontend, although I am a backend engineer, and so to this is just a start and by no means the endgame.

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
To add or delete these items we would need to edit the HTML file itself so we should add a form as well as a button to remove the item.
Above the list we can add a form to create an item:
```html
<form>
  <label>Item Todo</label>
  <input/>
  <button>Submit</button>
</form>
```
This is a very basic form which doesn't have any functionality because there is no way to update the HTML without javascript but for now this will be good enough to demonstrate the use case of HTML.
Please notice the input tag is opened and closed in one line and doesn't require a closing tag seperately.
We can pass additional attributes to the input tag: `<input placeholder="Item Todo"` so if you reload you should see faint text in the input space. We can also replace `<button>Submit</button>` with `<input type="submit">`.
Many different attributes can be passed to an HTML element this way, have a look at this [article](https://www.w3schools.com/htmL/html_attributes.asp). Another thing to note is that google is your best friend however it is sometimes difficult to find what you are looking for without the right termionlogy.
The final thing we could add is a button to remove the item.
We need to add children elements to the list item:
```html
<li>
  <p>Item 1</p>
  <button>Remove</button>
</li>
```
However this is not easy to understand as the button renders on a different line.
We can remedy this by having inline styles or a seperate css file,
first lets look at the possibility of inline styles:
```html
<div style="display: flex">
  <div style="display: inline-block;">
    Item 1
  </div>
  <div style="display: inline-block;">
    <button>Remove</button>
  </div>
</div>
```
We use the div tag to represent a block which can contain anything, it is basically a general purpose tag.
In the above snippet we have used the html attrbute `style="*"` to change the style of that specific element but if we need to reuse that style property we would have to rewrite that same thing again and again, this is the reason for CSS.
The display property of an element tells the browser how to display the specific element.
If we want to see exactly what is happening before and after adding that style we can either right click in our browser and select inspect to view the dev tools or,
we can add the property `border: 1px solid red;` which will show a border around the div elements before and after editing the display property.
The border property takes certain arguments which you can pass with spaces between them.
Each style property takes different arguments so be aware of this and remember to google if in doubt.

## CSS

CSS is the rules that each element should follow.
Lets start by adding an index.css file to our current directory and then add the following between the head tags:
```html
<link rel="stylesheet" href="index.css"/>
```
which will allow us to add css to our `index.css` file and have the changes reflect in our html page, for more information there is an [article](https://matthewjamestaylor.com/add-css-to-html).
Lets reimplement the styles we implemented in the list element but we will do this for all our list items with hopefully less typing.
A css file has the following layout:
```
.class {
  style-property: parameters/value;
  another-property: parameters/value;
}

#id {
  property: parameters/value;
}

tag {
  property: parameters/value;
}
```
Lets add the following to our css file:
```css
.parent-container {
  display: flex;
}

#child-container {
  display: inline-block;
}
```
The `.` represents an html element where `class="parent_container"` and the `#` represents an html element where `id="child_container"`.
Now lets change the html file to use these properties:
```html
<div class="parent-container"> 
  <div id="child-container">
    Item 2
  </div>
  <div id="child-container">
    <button> Remove</button>
  </div>
</div>
```
We can change the `#` to `.` in the css file and reference class attribute in html instead of id and it would work the same so from my perspective they can be used somewhat interchangeably.
Next thing we might want to do is change the appearance of the buttons:
```css
button{
  background-color: #22CE22;
}
```
The button doesn't specify which HTML attribute it is on so it is on the button HTML tag itself.
If we reload we should see that all our buttons are green.
We represent colors with hexadecimal (base 16) numbers which means it is a value from 0 to 15 where 0 to 9 are themselves and 10 -> A to 15 -> F to replace all the double digit decimals.
There are many online color pickers so find one you like and customize the color value, [here](https://colorpicker.me/#7ee612) is one to get you started.
The remove button shouldn't be green:
```css
.remove {
  background-color: #EE1B1B;
}
```
```html
<button class="remove">Remove</button>
```
Well that is the basics of it so I am going to jump ahead now so that our css file looks like this: 
```css
.parent-container {
  display: flex;
}

.text {
  display: inline-block;
  width: 75%;
}

.buttons {
  display: inline-block;
  width: 25%;
}

.list-item {
  font-size: 20px;
  margin: 1rem;
}

.remove {
  background-color: #ff6c5c;
}

.submit {
  background-color: #5cff7e;
}

.item {
  font-size: 20px;
  font-weight: 500;
}

.container {
  margin-left: 33%;
  margin-right: 33%;
}

button {
  color: #101110;
  margin: 0, 1rem;
  padding: 0.5rem;
  text-align: center;
  border-radius: 10px;
  border: 0px;
  font-weight: 700;
  cursor: pointer;
  font-size: 20px;
}

h1 {
  text-align: center;
  padding: 0.5rem;
}

ul {
  width: 100%;
  padding: 0px;
}

.input {
  border-radius: 10px;
  border: 3px solid #383838;
  padding: 5px;
  font-size: 20px;
  width: 90%;
  background-color: transparent;
  color: #BFB0B0;
}

.input:focus {
  border: 3px double transparent;
}

html {
  background-color: #555;
}
```
there are modifiers such as `.input:focus` which is what the browser displays when you are focused on the input, there are others such as `:hover` when you mouse over it. CSS is very powerful and this is just the beginning, you are able to do animations on a per element basis. The next step would be SCSS or SASS which is Sassy CSS and Syntacticaly Awesome StyleSheets respectively.

The HTML now looks like this:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./index.css"/>
    <title>Custom Title shows up in browser tab</title>
  </head>
  <body>
    <div class="container">
      <h1 class="title">ToDo app</h1>
      <form class="parent-container">
        <div class="text">
          <input class="input" placeholder="Item name"/>
        </div>
        <div class="buttons">
          <button class="submit">Submit</button>
        </div>
      </form>
      <ul>
        <li class="list-item"> 
          <div class="parent-container"> 
            <div class="text">
              <div class="item">
                Item 1
              </div>
            </div>
            <div class="buttons">
              <button class="remove">Remove</button>
            </div>
          </div>
        </li>
        <li class="list-item"> 
          <div class="parent-container"> 
            <div class="text">
              <div class="item">
                Item 2
              </div>
            </div>
            <div class="buttons">
              <button class="remove">Remove</button>
            </div>
          </div>
        </li>
        <li class="list-item"> 
          <div class="parent-container"> 
            <div class="text">
              <div class="item">
                Item 3
              </div>
            </div>
            <div class="buttons">
              <button class="remove">Remove</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </body>
</html>
```
As you can see there are a lot more children elements and making the most of css class properties.
CSS may be slow to use and style correctly especially for a backend engineer, however there are a couple open source stylesheets which have very good documentation and can be required in the href of the stylesheet tag in the `<head>`, these CSS libraries make it very easy to get going quickly so take a look at all of them and find the one you like the most, all of them have their pros and cons so choose what works best for you:
- [bulma](https://bulma.io/)
- [bootstrap](https://getbootstrap.com/)
- [tailwindcss](https://tailwindcss.com/)

This is good and all but I still can't add or delete a TODO item...?

## Javascript

Javascript adds functionality to the beauty of the web so that we can have interactive components that do what we would expect from a modern web application.
To add a javascript file we first create a javascript file (`.js` extension) and then we add a script tag to the end of our HTML page.
you are able to use inline javascript like we did with css but this time it has its own tag instead of being an attribute of an HTML element ie:
```html
<script>
  console.log("this should be visible on page load in the console of the dev tools");
</script>
```
Alternatively we can import a js file with the script tag:
```
<script src="index.js" ></script>
```
The script tag should be inside the head or body tags of the HTML page.
Add the following to the js file then inspect the page and navigate to the console and see if you can see the message:
```js
console.log("hello from file");
```
Now to add some functionality:
First we need to `console.log()` the entered text on submit.
Before we do that though, we are going to have to add the id to some elements in the html file. The id attribute is normally used when we would like to get only one element from the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) (Document Object Model)which is basically the HTML already rendered and hence the reason we should place this script at the bottom of the body of the html page so that those objects are already present before we start trying to look for them with javascript, so add `id="input"` to the input tag and `id="submit"` to the submit button tag.
Then we can get the element from the document with the js function `document.getElementById("<element-id-here>")`.
Next we can listen for events on a specific element such as a click on the button with the function `<object>.addEventListener('<event>', <function>)`.
In javascript there are 2 ways to declare a function, one is without a name so that it is executed inline `(<variables>) => {<function code here>}` or by explicitly declaring it which is useful when you want to reuse the function in different places in the javascript file:
```js
function <func-name>(<variables>) {
  <function code here>
}
```
See if you can understand what is going on in the following javascript code:
```js
var input = document.getElementById("input");
var submit = document.getElementById("submit");

submit.addEventListener('click', () => {
  event.preventDefault();
  console.log(input.value);
});
```

The `event.preventDefault()` function stops the button from redirecting the page and allows us to manipulate the whole page through javascript by itself.
The `input.value` is the value attribute of the input element which is where the text which we type is stored, try explicitly setting the value attribute in the html itself and notice that it basically gives us a default value.
Now that we have the value we put entered we would like to generate a list item with that value.
We can use an elements `innerHTML` value to push HTML onto the page, but first we need to remove the old list that was explicitly generated but copy a single `<li>` element over to the js file because that is our template which we will use to generate other items.
Also add the `id` attribute to the `<ul>` tag so that we can manipulate that element with js, in my case I set the id attribute to list.
Whilst we are grabbing all the html elements we will add another so we can get the list element as well:
```js
var list = document.getElementById("list");
```
now we can define a function to manipulate this element:
```js

function addTodo(text) {
  list.innerHTML +=
  `<li class="list-item"> 
    <div class="parent-container"> 
      <div class="text">
        <div class="item">
          ${text}
        </div>
      </div>
      <div class="buttons">
        <button class="remove">Remove</button>
      </div>
    </div>
  </li>`
}
```
We are using the += operator which adds to the existing innerHTML instead of overwriting it.
We can insert variables anywhere in our JS code by using the `${<variable>}` but apart from that you should notice that that list item HTML is exactly what we had before but the only difference is the JS text variable.
Now instead of just logging the value of the input to the console in the browser we can add an element by replacing the `console.log` with `addTodo` which will pass the text value to the function and add to the HTML.
Now we should be able to add Items to do.

Theres a button to remove the item but that JS didn't seem to fix the issue?



