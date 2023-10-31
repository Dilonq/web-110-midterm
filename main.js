async function start(){
    //hide website until the site loads
    document.body.style.visibility = "hidden";

    //set up everything
    if (!getCookie("language")){
        document.cookie="language=en";
    }
    await updateLanguage();

    //now that the side has loaded, show the website
    document.body.style.visibility = "visible";
}

function changeLanguage(){
    if (getCookie("language") == "de"){
        document.cookie="language=en";
    }else{
        document.cookie="language=de";
    }

    updateLanguage();
}

async function updateLanguage(){
    var data;

    await fetch('lang.json')
        .then((response) => response.json())
        .then((json) => {
            data = json;
        });


    let lang = getCookie("language");

    // change html text
    for (var key in data[lang]){
        let elem = document.getElementById(key);
        if (elem){//error handling: check if it exists first
            console.log(elem.textContent);
            elem.textContent=data[lang][key];
        }
    }

    //change dynamic attributes
    if (lang){
        document.documentElement.lang = lang;
    }
    if (data[lang]["title"]){
        document.title = data[lang]["title"];
    }
}

function getCookie(name){
    function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
}