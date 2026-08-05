// 波の音アプリ Ver.1.1
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
// 小豆の物理移動
// --------------------

function updateBeans(){


beans.forEach(bean=>{


// 傾きによる力

bean.speed += tiltX * 0.012;



// 摩擦

bean.speed *= 0.94;



// 移動

bean.x += bean.speed;




// 左右端

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
// 傾きセンサー
// --------------------

function startSensor(){



if(
typeof DeviceOrientationEvent !== "undefined" &&
typeof DeviceOrientationEvent.requestPermission === "function"
){


DeviceOrientationEvent
.requestPermission()

.then(result=>{


if(result === "granted"){


window.addEventListener(
"deviceorientation",
handleOrientation
);


}


});


}

else{


window.addEventListener(
"deviceorientation",
handleOrientation
);


}



}







function handleOrientation(event){



// 横向き左右

tiltX =
event.gamma || 0;



// 音量

const power =

Math.min(
Math.abs(tiltX) / 45,
1
);



waveSound.volume =

0.25 + power * 0.75;



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



startSensor();



waveSound.volume =
0.4;



try{


await waveSound.play();



}catch(e){


console.log(
"音声待機"
);


}



});