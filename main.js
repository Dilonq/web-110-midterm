function start(){
    document.cookie="language=de";
    updateLanguage();
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
    let data;

    await fetch('lang.json')
        .then((response) => response.json())
        .then((json) => {
            data = json;
        });


    let lang = getCookie("language");
    data = data[lang];

    //change html text
    for (var key in data){
        document.getElementById(key).textContent=data[key];
    }

    //change dynamic attributes
    document.documentElement.lang = lang;
    document.title = data["title"];
}

function getCookie(name){
    function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
}