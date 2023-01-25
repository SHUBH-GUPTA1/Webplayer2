const img=document.getElementById("imagee");
const music=document.querySelector("audio");
const play=document.getElementById("play");
const artist=document.getElementById("artist");
const title=document.getElementById("title");
const previous=document.getElementById("previous");
const next=document.getElementById("next");


let progress=document.getElementById("progress");
let total_duration=document.getElementById("duration");
let current_time=document.getElementById("current_time");
let progress_div=document.getElementById("progress_div");


const songs=[
    {
        name:"1",
        title:"Faded",
        artist:"alan Walker",
        img:1
    },
    {
        name:"2",
        title:"Alone",
        artist:"alan Walker",
        img:2
    },
    {
        name:"3",
        title:"On My way",
        artist:"alan walker",
        img:3
    },
];


let isplaying=false;

const playMusic=()=>{
  
    isplaying= true;
    music.play();
    play.classList.replace("fa-play","fa-pause");
    img.classList.add("anime");
};

const pauseMusic=()=>{
  
    isplaying= false;
    music.pause();
    play.classList.replace("fa-pause","fa-play");
    img.classList.remove("anime");
};

play.addEventListener("click",()=>{
    // if(isplaying){
    //     pauseMusic();
    // }
    //     else{
    //         playMusic();
    //     }
        isplaying? pauseMusic() : playMusic();
})

const loadSong= (songs) =>{
    title.textContent=songs.title;
    artist.textContent=songs.artist;
    music.src=`music js photo/${songs.name}.mp3` ; 
    img.src=`music js photo/${songs.name}.jpg`;
};

let songIndex =0;

// loadSong(songs[1]);

const nextSong=() =>{
    songIndex=(songIndex + 1)% songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};

const prevSong=() =>{
    songIndex=(songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};

music.addEventListener("timeupdate",(e)=>{
    const{ duration, currentTime,}= e.srcElement;
    let progress_time=(currentTime/duration)*100;
    progress.style.width=`${progress_time}%`;

 let min_duration =Math.floor(duration/60);
 let sec_duration=Math.floor(duration%60);
 let tot_duration=`${min_duration}:${sec_duration}`;
 total_duration.textContent=`${tot_duration}`;


 let min_currentTime =Math.floor(currentTime/60);
 let sec_currentTime=Math.floor(currentTime%60);
 if(sec_currentTime<10){
    sec_currentTime=`0${sec_currentTime}`;
 }

 let tot_currentTime=`${min_currentTime}:${sec_currentTime}`;
 current_time.textContent=`${tot_currentTime}`;

});

progress_div.addEventListener("click",(event)=>{
  //to know offsetX&clientWidth console.log(event);
  const {duration}=music;
  //const duration=music.duration;  object distruction
  let move_progress=(event.offsetX/event.srcElement.clientWidth)*duration;//clientWidth is the total width of progressbar music& offsetX is the width where we click on progressbar
  music.currentTime=move_progress;     //the value of currentTime indicates the time position within the media at which playback will begin once the play() method is called.HTMLmediaElement.currentTime

});
music.addEventListener("ended",nextSong);
next.addEventListener("click",nextSong);
prev.addEventListener("click",prevSong);


 



