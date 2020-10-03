import 'bootstrap/dist/css/bootstrap.css'
import jokes from "./jokes";
// import navigation from "./navigation";

displayAllJokes();

// // Solution 1
document.getElementById("getJoke").addEventListener("click", getJoke);
document.getElementById("addJoke").addEventListener("click", addJoke);
document.getElementById("getQuote").addEventListener("click", getHourlyJoke);
document.getElementById("clover").addEventListener("click", showCardinal);
setInterval(getHourlyJoke, 60000);

function displayAllJokes() {
    const allJokes = jokes.getJokes().map(joke => "<li>" + joke + "</li>");
    document.getElementById("jokes").innerHTML = allJokes.join("");
}

function getJoke() {
    let jokeId = document.getElementById("jokeId").value;
    document.getElementById("jokeContainer").innerHTML = jokes.getJokeById(jokeId);
}

function addJoke() {
    let joke = document.getElementById("jokeContent").value;
    jokes.addJoke(joke);
    displayAllJokes();
}

function getHourlyJoke() {
    fetch("https://studypoints.info/jokes/api/jokes/period/hour")
        .then(res => res.json())
        .then(data => {
            document.getElementById("quoteContainer").innerHTML = data.joke;
    })
}

function showCardinal(evnt) {
    let text = evnt.target();
    document.getElementById("cardinal").innerHTML = text;
}

// document.getElementById('1').innerHTML = 'TEST11111111111111';

// // Solution 2
// document.getElementById('2').innerHTML = 'TEST2222222222222222';


