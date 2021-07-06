let apiKey = "3891e966-9722-41ad-9d87-071f63de9f35";
let inp = document.getElementById("input");
let search = document.getElementById("search");
let load_div = document.querySelector(".loading");
let not_found = document.querySelector(".not__found");
let audio = document.querySelector(".audio");
let suggestion = document.querySelector(".didYouMean");



search.addEventListener("click", getData);

async function getData() {
    let word = inp.value;
    console.log(word);
    const response = await fetch("https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}");
    const data = await response.json();
    console.log(data);
}