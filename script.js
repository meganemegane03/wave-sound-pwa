// 波の音アプリ Ver.1.0
// script.js


const startButton = document.getElementById("startButton");
const startScreen = document.getElementById("startScreen");
const waveSound = document.getElementById("waveSound");

const beansArea = document.getElementById("beansArea");

const beanCount = 100;

let beans = [];

let tiltX = 0;
let currentVolume = 0.5;


// ----------------------
// 小豆生成
// ----------------------

function createBeans(){

  for(let i = 0; i < beanCount; i++){

    const bean = document.createElement("div");

    bean.className = "bean";


    const x = Math.random() * 90;
    const y = Math.random() * 80;


    bean.style.left = x + "%";
    bean.style.top = y + "%";


    beansArea.appendChild(bean);


    beans.push({

      element: bean,

      x:x,

      y:y,

      vx:0

    });

  }

}


// ----------------------
// 小豆の動き
// ----------------------

function moveBeans(){

  beans.forEach(bean=>{


    // 傾きによる加速度

    bean.vx += tiltX * 0.015;


    // 摩擦

    bean.vx *= 0.95;


    bean.x += bean.vx;



    // 範囲制限

    if(bean.x < 0){

      bean.x = 0;
      bean.vx *= -0.3;

    }


    if(bean.x > 90){

      bean.x = 90;
      bean.vx *= -0.3;

    }



    bean.element.style.left =
    bean.x + "%";


  });


  requestAnimationFrame(moveBeans);

}



// ----------------------
// 傾きセンサー
// ----------------------

function startSensor(){


  if(
    typeof DeviceOrientationEvent !== "undefined" &&
    typeof DeviceOrientationEvent.requestPermission === "function"
  ){


    DeviceOrientationEvent
    .requestPermission()
    .then(permission=>{


      if(permission==="granted"){

        window.addEventListener(
          "deviceorientation",
          handleTilt
        );

      }


    });


  }else{


    window.addEventListener(
      "deviceorientation",
      handleTilt
    );


  }


}



function handleTilt(event){


  // 横向き時の左右傾き

  tiltX = event.gamma || 0;


  // 音量変更

  let power =
  Math.min(Math.abs(tiltX) / 45,1);


  currentVolume =
  0.2 + power * 0.8;


  waveSound.volume =
  currentVolume;


}



// ----------------------
// 開始ボタン
// ----------------------

startButton.addEventListener(
"click",
()=>{


  startScreen.style.display="none";


  createBeans();


  moveBeans();


  startSensor();


  waveSound.volume = 0.5;


  waveSound.play()
  .catch(()=>{


    console.log(
    "音声開始待機"
    );


  });


});