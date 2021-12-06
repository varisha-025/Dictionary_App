let apiKey = "3891e966-9722-41ad-9d87-071f63de9f35";
let inp = document.getElementById("input");
let search = document.getElementById("search");
let load_div = document.querySelector(".loading");
let notFound = document.querySelector(".not_found");
let defBox = document.querySelector(".def");
let audioBox = document.querySelector(".audioBox");
let suggestion = document.querySelector(".didYouMean");
let wordofday = document.getElementById("word")
let suggest_box = document.getElementById("suggest_box")
let date =document.getElementById("date")
search.addEventListener("click", function clicked(e) {
    e.preventDefault();
    document.getElementById("our").style.display="block";
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
    load_div.style.display= "none";
    document.getElementById("our").style.display="none";
    document.getElementById("day").style.display="none";
    
    document.getElementById("suggest_h3").style.display="block";
    // suggestion.appendChild(suggest_h1)

    let html = `<div class="d-flex flex-column bd-highlight mb-3">`;
    for (key in data) {
        html += `<div class="p-2 bd-highlight">${data[key]}</div>`
    }
    html+=`</div>`
    // console.log(html)
    suggest_box.innerHTML = html;
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
    // console.log(data[0].shortdef[0])
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

async function getRandomWord(){
    try{
    const response = await fetch(`https://random-word-api.herokuapp.com/word?number=1`);
    const data = await response.json();
    console.log(data)
    return data
}
    catch(err){
        console.log("this is the error",err)
    }
    
}


wordofday.addEventListener("click",async ()=>{
    let got=await getRandomWord();
    // document.getElementsByClassName("div2").style.display="block";
    let f=got[0]
    // var d = new Date();
    // var curr_date = d.getDate();
    // var curr_month = d.getMonth();
    // curr_month++;
    // var curr_year = d.getFullYear();
    // let dt=curr_date + "-" + curr_month + "-" + curr_year
    // day.innerText= dt;
    document.getElementById("display").innerText=f;
})



// for button


  