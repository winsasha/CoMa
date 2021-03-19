// ==UserScript==
// @name         Yandex Bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @grant        none
// ==/UserScript==
let keywords = ["Как звучит флейта","Валторна","Тромбон","Кларнет","Фагот","Гобой","Саксофон"];
let randomIndex = Math.floor(Math.random()*keywords.length);
let keyword = keywords[randomIndex];
let yaInput = document.getElementById('text');
let search = document.getElementsByClassName("button_theme_websearch")[0];
let links = document.links;
if(search!=undefined){
    let i = 0;
    let timerId = setInterval(()=>{
        yaInput.value += keyword[i++];
        if(i==keyword.length){
            clearInterval(timerId);
            search.click();
        }
    },300);
}else{
    let nextYaPage = true;
    for(let i=0; i<links.length; i++){
        let link = links[i];
        if(link.href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai")!=-1){
            nextYaPage = false;
            link.removeAttribute("target");
            link.click(); // Кликаем по ссылке
            break; // Прерываем цикл
        }
    }
    if(nextYaPage) document.getElementsByClassName("pager__item_kind_next")[0].click();
}
