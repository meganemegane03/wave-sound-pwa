// 波の音アプリ Ver.1.3
// script.js


const startButton =
document.getElementById("startButton");


const startScreen =
document.getElementById("startScreen");


const waveSound =
document.getElementById("waveSound");


const beansArea =
document.getElementById("beansArea");



const BEAN_COUNT = 100;


let beans = [];


let tiltX = 0;


let targetVolume = 0.4;

let currentVolume = 0.4;





// --------------------
// 小豆生成
// --------------------

function createBeans(){


for(let i = 0; i < BEAN_COUNT; i++){


const bean =
document.createElement("div");


bean.className = "bean";



const data = {

element: bean,

x: Math.random() * 90,

y: Math.random() * 75,

speed: 0

};



bean.style.left =
data.x + "%";


bean.style.top =
data.y + "%";



beansArea.appendChild(bean);


beans.push(data);



}


}





// --------------------
// 小豆物理
// --------------------

function updateBeans(){


beans.forEach(bean=>{


bean.speed += tiltX * 0.012;


bean.speed *= 0.94;


bean.x += bean.speed;




if(bean.x < 0){

bean.x = 0;

bean.speed *= -0.25;

}



if(bean.x > 90){

bean.x = 90;

bean.speed *= -0.25;

}



bean.element.style.left =
bean.x + "%";



});



requestAnimationFrame(
updateBeans
);


}






// --------------------
// センサー
// --------------------

function startSensor(){



if(
typeof DeviceOrientationEvent !== "undefined" &&
typeof DeviceOrientationEvent.requestPermission === "function"
){


DeviceOrientationEvent
.requestPermission()

.then(permission=>{


if(permission === "granted"){


window.addEventListener(
"deviceorientation",
handleTilt
);


}


});


}

else{


window.addEventListener(
"deviceorientation",
handleTilt
);


}



}





function handleTilt(event){



tiltX =
event.gamma || 0;



// 傾きの大きさ

const power =

Math.min(
Math.abs(tiltX) / 45,
1
);



// 波音量

targetVolume =

0.25 + (power * 0.75);



}







// --------------------
// 音量なめらか変化
// --------------------

function updateVolume(){


currentVolume +=

(targetVolume - currentVolume)
* 0.05;



waveSound.volume =
currentVolume;



requestAnimationFrame(
updateVolume
);


}







// --------------------
// 開始
// --------------------

startButton.addEventListener(

"click",

async()=>{


startScreen.style.display =
"none";



createBeans();


updateBeans();


updateVolume();


startSensor();



waveSound.volume =
currentVolume;



try{


await waveSound.play();


}catch(e){


console.log(
"音声待機"
);


}



}

);