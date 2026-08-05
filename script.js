// 波の音アプリ Ver.2.0
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


// 現在の傾き
let currentTilt = 0;

// 前回の傾き
let lastTilt = 0;

// 傾き変化量
let movement = 0;


// 音量
let targetVolume = 0;
let currentVolume = 0;


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


// 傾きの変化で動かす

bean.speed += movement * 0.08;


bean.speed *= 0.94;


bean.x += bean.speed;



if(bean.x < 0){

bean.x = 0;

bean.speed *= -0.3;

}


if(bean.x > 90){

bean.x = 90;

bean.speed *= -0.3;

}



bean.element.style.left =
bean.x + "%";


});


// 動きは徐々に消える

movement *= 0.85;


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
*0.08;



waveSound.volume =
Math.min(
Math.max(currentVolume,0),
1
);



requestAnimationFrame(
updateVolume
);


}








// --------------------
// 傾きセンサー
// --------------------

function handleTilt(event){


currentTilt =
event.gamma || 0;
console.log(currentTilt);


// 前回との差を見る

movement =
Math.abs(
currentTilt - lastTilt
);



lastTilt =
currentTilt;



// 動きがある時だけ音

if(movement < 0.3){

    targetVolume = 0;

    waveSound.pause();

}else{

    targetVolume =
    Math.min(
        movement / 8,
        1
    );


    if(waveSound.paused){

        waveSound.play()
        .catch(e=>{
            console.log("音声待機");
        });

    }

}


}









// --------------------
// センサー開始
// --------------------

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
"センサーエラー"
);


}


}








// --------------------
// 開始ボタン
// --------------------

startButton.addEventListener(
"click",
async()=>{


if(started) return;


started=true;


startScreen.style.display="none";


createBeans();


updateBeans();





await startSensor();


waveSound.volume = 0;

waveSound.pause();
waveSound.currentTime = 0;


}
);