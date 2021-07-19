let apiKey = "3891e966-9722-41ad-9d87-071f63de9f35";
let inp = document.getElementById("input");
let search = document.getElementById("search");
let load_div = document.querySelector(".loading");
let notFound = document.querySelector(".not_found");
let defBox = document.querySelector(".def");
let audioBox = document.querySelector(".audioBox");
let suggestion = document.querySelector(".didYouMean");


search.addEventListener("click", function clicked(e) {
    e.preventDefault();
    audioBox.innerHTML = '';
    notFound.innerHTML = '';
    suggestion.innerHTML = '';
    defBox.innerText = '';
    load_div.style.display = "block";

    setTimeout(() => {}, 3000);

    let word = inp.value;
    if (word === '') {
        window.alert("Word Required");
        return;
    }

    getData(word);
});

function suggest(data) {
    load_div.style.display = "none";
    suggest_h1 = document.createElement('h3');
    suggest_h1.innerText = "DID YOU MEAN ?";
    suggestion.appendChild(suggest_h1)

    let html = `<ul>`;
    for (key in data) {
        html += `<li>${data[key]}</li>`
    }
    html += `</ul>`;
    console.log(html)
    defBox.innerHTML = html;
}

function display(defList) {
    if (defList === undefined) {
        notFound.innerHTML = `<h3>Not Found</h3>`;
    } else {
        defBox.innerText = defList;
    }

}

async function getData(word) {
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);
    const data = await response.json();
    // if response is suggestion
    if (typeof data[0] === 'string') {
        suggest(data);
    }
    // if response is not found
    if (!(data.length)) {
        notFound.innerHTML = `<h3>Not Found</h3>`;
        return;
    }
    // if results are found

    load_div.style.display = "none";
    console.log(data[0].shortdef[0])
    display(data[0].shortdef[0])

    // Render sound in the DOM
    soundSrc = data[0]['hwi'].prs[0].sound.audio;
    renderSound(soundSrc);

}


function renderSound(soundName) {
    // https://media.merriam-webster.com/soundc11
    let subfolder = soundName.charAt(0);
    let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apiKey}`;
    let aud = document.createElement('audio')
    aud.src = soundSrc;
    aud.controls = true;
    audioBox.appendChild(aud);
}