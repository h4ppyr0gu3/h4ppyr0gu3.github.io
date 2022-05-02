var highSchool = document.getElementById("high-school");
var highSchoolToggle = document.getElementById("high-school-toggle");
var university = document.getElementById("university");
var universityToggle = document.getElementById("university-toggle");
var monterail = document.getElementById("monterail");
var monterailToggle = document.getElementById("monterail-toggle");
var musicapp = document.getElementById("musicapp");
var musicappToggle = document.getElementById("musicapp-toggle");
var backend = document.getElementById("backend");
var backendToggle = document.getElementById("backend-toggle");
var frontend = document.getElementById("frontend");
var frontendToggle = document.getElementById("frontend-toggle");
var other = document.getElementById("other");
var otherToggle = document.getElementById("other-toggle");

var highSchoolHtml, backendHTML, frontendHTML, 
  otherHTML, universityHTML, musicappHTML, monterailHTML;
fetch('templates/high_school.html')
  .then(data => data.text())
  .then(html => highSchoolHtml = html)
fetch('templates/backend.html')
  .then(data => data.text())
  .then(html => backendHTML = html)
fetch('templates/frontend.html')
  .then(data => data.text())
  .then(html => frontendHTML = html)
fetch('templates/other.html')
  .then(data => data.text())
  .then(html => otherHTML = html)
fetch('templates/university.html')
  .then(data => data.text())
  .then(html => universityHTML = html)
fetch('templates/music_app.html')
  .then(data => data.text())
  .then(html => musicappHTML = html)
fetch('templates/monterail.html')
  .then(data => data.text())
  .then(html => monterailHTML = html)

function toggleFunc(element, html) {
  if (element.innerHTML == "") {
    element.innerHTML += html;
  } else {
    element.innerHTML = "";
  };
};

highSchoolToggle.addEventListener('click', () => {
  toggleFunc(highSchool, highSchoolHtml);
});

universityToggle.addEventListener('click', () => {
  toggleFunc(university, universityHTML);
});

monterailToggle.addEventListener('click', () => {
  toggleFunc(monterail, monterailHTML);
});

musicappToggle.addEventListener('click', () => {
  toggleFunc(musicapp, musicappHTML);
});

backendToggle.addEventListener('click', () => {
  toggleFunc(backend, backendHTML);
});

frontendToggle.addEventListener('click', () => {
  toggleFunc(frontend, frontendHTML);
});

otherToggle.addEventListener('click', () => {
  toggleFunc(other, otherHTML);
});
