let money = document.getElementById("money");
let display = document.getElementById("display");
let bill_acc = document.getElementById("bill_acc");
let displayInfo = document.getElementById("displayInfo");
let displayBalance = document.getElementById("displayBalance");
let progressBar = document.getElementsByClassName("progress-bar")[0];
let progress = 0;
let change_box = document.getElementById("change_box");
let lock = document.getElementById("lock");
let cof_cup = document.getElementById("cof_cup")

function getCoffee(coffeName,price){
  if(+money.value>=price){
    money.value = +money.value-price;
    displayBalance.innerText = money.value;
      cof_cup.hidden = true;
      let timerId = setInterval(()=>{
      lock.hidden = false;
      if(progress>110){
        clearInterval(timerId);
        progressBar.hidden = true;
        progressBar.style.width = 0+'%';
        displayInfo.innerHTML = `<i class="fas fa-mug-hot"></i> Ваш ${coffeName} готов...`;
        cof_cup.hidden = false;
        progress = 0;
        lock.hidden = true;
        return;
      }
      else if(progress<40) displayInfo.innerHTML = `<i class="fas fa-hourglass-start"></i> Жарим...`;
      else if(progress<80) displayInfo.innerHTML = `<i class="fas fa-hourglass-half"></i> Молим...`;
      else displayInfo.innerHTML = `<i class="fas fa-hourglass-end"></i> Варим...`;
        let audio = new Audio("audio/cof_cup.mp3");
        audio.play();              
      progressBar.hidden = false;
      progressBar.style.width = ++progress+'%';
    },50);
  }else{
    displayInfo.innerHTML = `<i class="far fa-frown"></i> Недостаточно средств`;
  }
}

  function getChange(num){
  let change_box_h = change_box.getBoundingClientRect().height-60;
  let change_box_w = change_box.getBoundingClientRect().width-60;
  let change = 0;
  let top = Math.random()*change_box_h;
  let left = Math.random()*change_box_w;
  if(num>=10) change = 10;
  else if(num>=5) change = 5;
  else if(num>=2) change = 2;
  else if(num>=1) change = 1;
  else{
    let audio = new Audio("audio/getChange.mp3");
    audio.play();
  }
  
  if(change>0){
    let img = document.createElement('img');
    img.src = `img/${change}rub.png`;
    img.style.top = top+'px';
    img.style.left= left+'px';
    img.onclick = function(){this.hidden=true;}
    change_box.append(img);
    displayBalance.innerText = money.value = 0;
    getChange(num-change);
  }
}
//Сдача Рекурсия
function getChange(num){
  let change_box_h = change_box.getBoundingClientRect().height-63;
  let change_box_w = change_box.getBoundingClientRect().width-63;
  let change = 0;
  let top = Math.random()*change_box_h;
  let left = Math.random()*change_box_w;
  if(num>=10) change = 10;
  else if(num>=5) change = 5;
  else if(num>=2) change = 2;
  else if(num>=1) change = 1;
  else{
    let audio = new Audio("audio/monets.mp3");
    audio.play();
  }
  
  if(change>0){
    let img = document.createElement('img');
    img.src = `img/${change}rub.png`;
    img.style.top = top+'px';
    img.style.left= left+'px';
    img.onclick = function(){this.hidden=true;}
    change_box.append(img);
    displayBalance.innerText = money.value = 0;
    getChange(num-change);
  }
}

// Перемещение банкнот по экрану
let banknotes = document.querySelectorAll("[src$='rub.jpg']");
for(let i=0; i<banknotes.length; i++){
  let banknote = banknotes[i];
  banknote.onmousedown = function(event){
    banknote.ondragstart = function(){return false;}
    banknote.style.position = 'absolute';
    banknote.style.zIndex = 2;
    banknote.style.transform = 'rotate(90deg)';
    moveAt(event);
    function moveAt(event){
      banknote.style.top = (event.clientY-banknote.offsetHeight/2)+'px';
      banknote.style.left = (event.clientX-banknote.offsetWidth/2)+'px';
    }
    document.addEventListener('mousemove',moveAt);
    banknote.onmouseup = function(){
      document.removeEventListener('mousemove',moveAt);
      banknote.style.zIndex = 1;
      let bill_acc_top = bill_acc.getBoundingClientRect().top;
      let bill_acc_bottom = bill_acc.getBoundingClientRect().bottom - (bill_acc.getBoundingClientRect().height*2/3);
      let bill_acc_left = bill_acc.getBoundingClientRect().left;
      let bill_acc_right = bill_acc.getBoundingClientRect().right;
      let banknote_top = banknote.getBoundingClientRect().top;
      let banknote_left = banknote.getBoundingClientRect().left;
      let banknote_right = banknote.getBoundingClientRect().right;
      if(bill_acc_top<banknote_top && bill_acc_bottom>banknote_top && bill_acc_left<banknote_left && bill_acc_right>banknote_right){
        money.value = (+money.value)+(+banknote.dataset.value);
        displayBalance.innerText = money.value;
        let audio = new Audio("audio/banknotes.mp3");
        audio.play();
        banknote.hidden = true;
      }
    }
  }
}