let play = document.getElementById("play");
let img = document.getElementById("song_img");
let songName = document.getElementById("song_name");
let seekBar = document.getElementById("seekBar");
let time = document.getElementById("time");
let index = 0;
let audio = new Audio(
  `https://firebasestorage.googleapis.com/v0/b/blazingsound-32357.appspot.com/o/after-hours-lyrics.mp3?alt=media&token=66af3c5f-7367-444b-bb73-4d59c142a664`
);
let container = document.querySelector(".container");

console.log(audio);

let songs = [];
fetch("../data.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    songs = data;
  })
  .catch((error) => {
    console.error("Error fetching JSON data:", error);
  });

console.log(index);

function seek() {
  audio.addEventListener("timeupdate", function () {
    seekBar.value = 0;
    progress = parseInt((audio.currentTime / parseInt(audio.duration)) * 100);
    seekBar.value = progress;
    if (progress == 100) {
      console.log("Song completed");
      masterNext();
    }
  });

  seekBar.addEventListener("change", function () {
    audio.currentTime = (seekBar.value * parseInt(audio.duration)) / 100;
  });
}

function masterPlay() {
  //   console.log(parseInt(audio.duration));
  if (play.className == "fa-solid fa-play") {
    play.className = "fa-solid fa-pause";
    audio.play();
    seek();
  } else {
    seekBar.value = 0;
    play.className = "fa-solid fa-play";
    audio.pause();
  }
}

function masterNext() {
  seekBar.value = 0;
  if (index >= 0 && index < songs.length - 1) {
    audio.pause();
    index++;
    audio = new Audio(songs[index].link);
    audio.play();
    seek();
    if (play.className == "fa-solid fa-play") {
      play.className = "fa-solid fa-pause";
    }
    img.src = songs[index].img;
    songName.textContent = songs[index].name;
  } else {
    if (index == songs.length - 1 || seekBar.value == 100) {
      seekBar.value = 0;
      index = 0;
      audio.pause();
      audio = new Audio(songs[index].link);
      audio.play();
      seek();
      if (play.className == "fa-solid fa-play") {
        play.className = "fa-solid fa-pause";
      }
      songName.textContent = songs[index].name;
      img.src = songs[index].img;
    }
  }
}

function masterPrev() {
  if (index > 0 && index < songs.length) {
    console.log(index);
    audio.pause();
    index--;
    audio = new Audio(songs[index].link);
    seekBar.value = 0;
    audio.play();
    seek();
    if (play.className == "fa-solid fa-play") {
      play.className = "fa-solid fa-pause";
    }
    songName.textContent = songs[index].name;
    img.src = songs[index].img;
  } else {
    if (index == 0) {
      audio.pause();
      index = songs.length - 1;
      audio = new Audio(songs[index].link);
      seekBar.value = 0;
      audio.play();
      seek();
      if (play.className == "fa-solid fa-play") {
        play.className = "fa-solid fa-pause";
      }
      songName.textContent = songs[index].name;
      img.src = songs[index].img;
    }
  }
}
