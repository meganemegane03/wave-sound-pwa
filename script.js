// 波の音アプリ Ver.1.4
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

let started = false;






// --------------------
// 小豆生成
// --------------------

function createBeans(){


if(beans.length > 0) return;



for(let i = 0; i < BEAN_COUNT; i++){


const bean =
document.createElement("div");


bean.className = "bean";



const data = {

element: bean,

x: Math.random() * 85,

y: Math.random() * 75,

speed:0

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
// 小豆の動き
// --------------------

function updateBeans(){


beans.forEach(bean=>{


bean.speed += tiltX * 0.008;


bean.speed *= 0.95;


bean.x += bean.speed;



if(bean.x < 0){

bean.x = 0;

bean.speed *= -0.2;

}



if(bean.x > 90){

bean.x = 90;

bean.speed *= -0.2;

}



bean.element.style.left =
bean.x + "%";


});



requestAnimationFrame(
updateBeans
);


}







// --------------------
// 音量調整
// --------------------

function updateVolume(){


currentVolume +=

(targetVolume-currentVolume)
*0.04;



waveSound.volume =
currentVolume;



requestAnimationFrame(
updateVolume
);


}







// --------------------
// 傾きセンサー
// --------------------

function handleTilt(event){



tiltX =
event.gamma || 0;



const angle = Math.abs(tiltX);

if (angle < 5) {

    targetVolume = 0;

} else if (angle < 10) {

    targetVolume = 0.1;

} else if (angle < 20) {

    targetVolume = 0.3;

} else if (angle < 30) {

    targetVolume = 0.6;

} else {

    targetVolume = 1.0;

}











async function startSensor(){


try{


if(
typeof DeviceOrientationEvent !== "undefined" &&
typeof DeviceOrientationEvent.requestPermission === "function"
){


const permission =

await DeviceOrientationEvent.requestPermission();



if(permission==="granted"){


window.addEventListener(
"deviceorientation",
handleTilt
);


}


}else{


window.addEventListener(
"deviceorientation",
handleTilt
);


}


}catch(e){


console.log(
"センサー未許可"
);


}


}







// --------------------
// 開始
// --------------------

startButton.addEventListener(
"click",
async()=>{


if(started) return;


started=true;



startScreen.style.display="none";



createBeans();



updateBeans();



updateVolume();



await startSensor();




waveSound.volume =
currentVolume;



try{


await waveSound.play();


}catch(e){


console.log(
"音声待機"
);


}


});