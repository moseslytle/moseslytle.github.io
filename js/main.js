

//snatching ids from html
var before = document.getElementById("before");
var liner = document.getElementById("liner");
var command = document.getElementById("typer"); 
var textarea = document.getElementById("texter"); 
var terminal = document.getElementById("terminal");
let existCommands = ["help","about","languages","software","interests","skills","video","social","projects","history","email","clear","banner","youtube","business","instagram", "theme", "snake", "exit"];

var audioGood = new Audio("sounds/public_textPrint.mp3");
var audioBad = new Audio("sounds/public_error.mp3");
audioBad.volume = 0.45;
audioGood.volume = 1;


let currentTheme = "dark";


//initializing
var git = 0;
var pw = false;
let pwd = false;
var commands = [];

//looplines for banner
setTimeout(function() {
  loopLines(banner, "", 80);
  textarea.focus();
}, 100);

//listens for the keycommands for term
window.addEventListener("keyup", enterKey);
window.addEventListener('keydown', keyDown);


//init
textarea.value = "";
command.innerHTML = textarea.value;

var gameInProgress = false

function keyDown(e) {

    if (e.key === 'Tab') {
        e.preventDefault();
        autoComplete();
      }
    }

//commands terminal 
function enterKey(e) {
    
    if (e.keyCode == 181) {
      document.location.reload(true);
    } else {
      if (e.keyCode == 13) {
        commands.push(command.innerHTML);
        git = commands.length;
        addLine("online@momo_port:~$ " + command.innerHTML, "no-animation", 0);
        commander(command.innerHTML.toLowerCase());
        command.innerHTML = "";
        textarea.value = "";
      }
      if (e.keyCode == 38 && git != 0 && gameInProgress === false) {
        git -= 1;
        textarea.value = commands[git];
        command.innerHTML = textarea.value;
      }
      if (e.keyCode == 40 && git != commands.length) {
        git += 1;
        if (commands[git] === undefined) {
          textarea.value = "";
        } else {
          textarea.value = commands[git];
        }
        command.innerHTML = textarea.value;
      }
      
    }
  }
  

//takes different commands and spits different actions
function commander(cmd) {
    
  switch (cmd.toLowerCase()) {
    case "help":
      loopLines(help, "color2 margin", 80);
      audioGood.play();
      break;
    case "about":
      loopLines(about, "color2 margin", 80);
      audioGood.play();
      break;
    case "languages":
      loopLines(languages, "color2 margin", 80);
      audioGood.play();
      break;
    case "software":
      loopLines(software, "color2 margin", 80);
      audioGood.play();
      break;
    case "interests":
      loopLines(interests, "color2 margin", 80);
      audioGood.play();
      break;  
    case "skills":
      loopLines(skills, "color2 margin", 80);
      audioGood.play();
      break;  
    case "video":
      addLine("Opening YouTube...", "color2", 80);
      audioGood.play();
      newTab(youtube);
      break;

    case "snake":
        start();
        document.getElementById("board").classList.remove("hidden");
        loopLines(snake, "color2 margin", 80);
        gameInProgress = true;
        audioGood.play();
      break;
      
      case "exit":
        resetGame()
        document.getElementById("board").classList.add("hidden");
        loopLines(exit, "color2 margin", 80); 
        gameInProgress = false;
        audioGood.play();
      break;
      
    
    case "social":
      loopLines(social, "color2 margin", 80);
      audioGood.play();
      break;
    
    case "projects":
      loopLines(projects, "color2 margin", 80);
      audioGood.play();
      break;

    case "theme":
    if (currentTheme === "light") {
        currentTheme = "dark";
        document.body.classList.add("dark-theme");
        document.body.classList.remove("light-theme");
        addLine("Switched to dark theme.", "color2", 80);
        audioGood.play();
    } else {
        currentTheme = "light";
        document.body.classList.add("light-theme");
        document.body.classList.remove("dark-theme");
        addLine("Switched to light theme.", "color2", 80);
        audioGood.play();
    }
    break;


   
    case "history":
      addLine("<br>", "", 0);
      var historyCommands = commands.slice(-10);
      loopLines(historyCommands, "color2", 80);
      addLine("<br>", "command", 80 * commands.length + 50);
      audioGood.play();
      break;
    case "email":
      addLine('Opening mail to: <a href="mailto:moseslytle@gmail.com">moseslytle@gmail.com</a>...', "color2", 80);
      newTab(email);
      audioGood.play();
      break;
    case "clear":
      setTimeout(function() {
        terminal.innerHTML = '<a id="before"></a>';
        before = document.getElementById("before");
      }, 1);
      audioGood.play();
      break;
    case "banner":
      loopLines(banner, "", 80);
      audioGood.play();
      break;
    // socials
    case "youtube":
      addLine("Opening YouTube...", "color2", 80);
      newTab(youtube);
      audioGood.play();
      break;
    case "business":
      addLine("Opening Chronicle...", "color2", 0);
      newTab(store);
      audioGood.play();
      break;
    
    case "instagram":
      addLine("Opening Instagram...", "color2", 0);
      newTab(instagram);
      audioGood.play();
      break;
    
    default:
      addLine("<span class=\"inherit\">Command not found. For a list of commands, type <span class=\"command\">'help'</span>.</span>", "error", 100);
      audioBad.play();
      break;
  }
}

//opens new tab in browser with given link times out if not

function newTab(link) {
  setTimeout(function() {
    window.open(link, "_blank");
  }, 500);
}


//break spaces for 2 and add lines to the webpage with delay
function addLine(text, style, time) {
  setTimeout(function() {
    var next = document.createElement("p");
    next.innerHTML = text.replace(/  /g, "&nbsp;&nbsp;");
    next.className = style;

    before.parentNode.insertBefore(next, before);

    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}

function loopLines(name, style, time) {
  name.forEach(function(item, index) {
    addLine(item, style, index * time);
  });
}

function autoComplete() {
    let arr = existCommands.filter((item) => item.startsWith(command.innerHTML));
    if (arr.length === 1) {
      textarea.value = arr[0];
      command.innerHTML = arr[0];
    }
  }

