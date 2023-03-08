const cards = [
{
  title:"Which of the following is a block level element in HTML5 ?",
  options:["paragraph tag", "image tag", "bold tag", "strong tag"],
  correct: 0
},
{
  title:"Which is not the valid property in CSS3 ?",
  options:["height", "color", "conjugation", "transform"],
  correct: 2
},
{
  title:"Which is not a pre-defined Data type in JavaScript ?",
  options:["string", "boolean", "integer", "stack"],
  correct: 3
},
{
  title:"What is the root element (tag) of a page in HTML5 ?",
  options:["head", "body", "image", "html"],
  correct: 3
},
{
  title:"How many Numbers we can add in JavaScript at same time ?",
  options:["100,000", "500", "infinite", "4,000,000"],
  correct: 2
},
{
  title:"What is default value of text-decoration of an anchor ?",
  options:["none", "underline", "capitalize", "bold"],
  correct: 1
},
{
  title:"Using what object in JavaScript we can access DOM ?",
  options:["FileReader", "int32", "document", "window"],
  correct: 2
},
{
  title:"What attribute is used to set method of form in HTML5 ?",
  options:["method", "to_use", "where", "by_which"],
  correct: 0
},
{
  title:"What the CSS stands for ?",
  options:["Cascading Style Sheet", "Cascading Style Context", "Sheet for Cascading", "Styling Sheet for Cascade"],
  correct: 0
},
{
  title:"How call a function named 'foo' in JavaScript ?",
  options:["foo();", "()foo", "function foo(){}", "foo"],
  correct: 0
},
]

let result = {
  correct:0,
  wrong:0
}
let length = cards.length;
let curr;

function show_result() {
  const container = document.getElementById("container");
  container.innerHTML = `<div id="result">
	    <h2 align="center">Result</h2>
	    <hr/>
	    <div><b>Correct</b> : ${result.correct}</div>
	    <div><b>Wrong</b> : ${result.wrong}</div>
	  </div>
	  <div id="rights" align="right">© by <a href="https://github.com/PrathameshThorat1729/">Prathamesh Thorat</a></div>`;
}

function option_clicked (el) {
  if (el.target.getAttribute("index") != cards[curr].correct) {
    el.target.classList.add("wrong");
    result.wrong++;
  }
  else
    result.correct++;
  
  for(let i of document.getElementsByClassName("option"))
  {
    i.onclick = () => {};
    if (i.getAttribute("index") == cards[curr].correct)
      i.classList.add('correct');
  }
  
  const next = document.querySelector(".next");
  next.classList.remove("disable");
  next.onclick = () => {
    cards.splice(curr,1);
    
    if (cards.length == 0) {
      show_result();
    }
    else {
      curr = parseInt((Math.random() * 10) % cards.length);
      create_element();
    }
  };
}

function create_element () {
  const card = document.querySelector("#container .card");
  card.innerHTML = "";
  
  const attempted = document.createElement("div");
  attempted.setAttribute("class", "attempted");
  attempted.innerHTML = `<div><b>Ongoing</b> : ${length+1-cards.length}</div><div><b>Total</b> : ${length}</div>`;
  
  const title = document.createElement("div");
  title.setAttribute("class", "title");
  title.innerText = cards[curr].title;
  
  const options = document.createElement("div");
  options.setAttribute("class", "options");
  let indexes = [0, 1 ,2 ,3];
  for (let i = 0; i < 4; i++) {
    let curr_ind = parseInt((Math.random() * 10) % indexes.length);
    const opt = document.createElement("div");
    opt.setAttribute("class","option");
    opt.innerText = cards[curr].options[indexes[curr_ind]];
    opt.setAttribute("index", indexes[curr_ind]);
    opt.onclick = option_clicked;
    options.appendChild(opt);
    indexes.splice(curr_ind,1);
  };
	    
	const next = document.createElement("div");
	next.innerText = "CONTINUE"
	next.setAttribute("class","next disable");
	
  card.appendChild(attempted);
  card.appendChild(title);
  card.appendChild(options);
  card.appendChild(next);
}

window.onload = () => {
  curr = parseInt((Math.random() * 10) % cards.length);
  create_element();
}