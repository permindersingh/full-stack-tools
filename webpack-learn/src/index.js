import _ from "lodash";
// For Loading CSS example
import "./assets/css/style.css";
// For Loading Images example
import smileyImage from "./assets/images/smiley.png";
// For Loading Data example
import namesCSV from "./assets/files/names.csv";
import heroNames from "./assets/files/names.json";
// For Custom Output example
import printMe from './print.js';

function component() {
  const element = document.createElement("div");

  // For Custom Output example
  const btn = document.createElement('button');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = `
        <h1>${_.join(namesCSV, " ")}</h1>
        <ol>
            <li>${heroNames.heroes[0]["hero-name"]}, ${heroNames.heroes[0]["comics-company"]}</li>
            <li>${heroNames.heroes[1]["hero-name"]}, ${heroNames.heroes[1]["comics-company"]}</li>
            <li>${heroNames.heroes[2]["hero-name"]}, ${heroNames.heroes[2]["comics-company"]}</li>
        </ol>
    `;
  element.classList.add("hello");

  // Add the image to our existing div.
  const myImage = new Image();
  myImage.src = smileyImage;

  element.appendChild(myImage);

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;
  element.appendChild(btn);
  
  return element;
}

document.body.appendChild(component());
