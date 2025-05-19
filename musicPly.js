

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio("./songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  {
    songName: "Warriyo - Mortals [NCS Release]",
    filePath: "./songs/1.mp3",
    coverPath: "./covers/1.jpg",
  },
  {
    songName: "Cielo - Huma-Huma",
    filePath: "./songs/2.mp3",
    coverPath: "./covers/2.jpg",
  },
  {
    songName: "DEAF KEV - Invincible [NCS Release]-320k",
    filePath: "./songs/3.mp3",
    coverPath: "./covers/3.jpg",
  },
  {
    songName: "Different Heaven & EH!DE - My Heart [NCS Release]",
    filePath: "./songs/4.mp3",
    coverPath: "./covers/4.jpg",
  },
  {
    songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release",
    filePath: "./songs/5.mp3",
    coverPath: "./covers/5.jpg",
  },
  {
    songName: "Rabba - Salam-e-Ishq",
    filePath: "./songs/6.mp3",
    coverPath: "./covers/6.jpg",
  },
  {
    songName: "Sakhiyaan - Salam-e-Ishq",
    filePath: "./songs/7.mp3",
    coverPath: "./covers/7.jpg",
  },
  {
    songName: "Bhula Dena - Salam-e-Ishq",
    filePath: "./songs/8.mp3",
    coverPath: "./covers/8.jpg",
  },
  {
    songName: "Tumhari Kasam - Salam-e-Ishq",
    filePath: "./songs/9.mp3",
    coverPath: "./covers/9.jpg",
  },
  {
    songName: "Na Jaana - Salam-e-Ishq",
    filePath: "./songs/10.mp3",
    coverPath: "./covers/10.jpg",
  },
];

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

document.getElementById("Song-Cover").src = songs[songIndex].coverPath;

masterPlay.addEventListener("click", MusicPlay);
function MusicPlay() {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    document.getElementById("Song-Cover").src = songs[songIndex].coverPath;
    document.getElementById("songTittle").innerHTML = songs[songIndex].songName;
    masterPlay.classList.toggle("bi-play-circle", false);
    masterPlay.classList.toggle("bi-pause-circle", true);
  } else {
    audioElement.pause();
    masterPlay.classList.toggle("bi-pause-circle", false);
    masterPlay.classList.toggle("bi-play-circle", true);
  }
}

// Listen to Events
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

// audioElement.addEventListener('timeupdate', ()=>{

//     progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
//     myProgressBar.value = progress;

// })

document.getElementById("next").addEventListener("click", NextPlay);
function NextPlay() {
  if (songIndex >= 9) {
    songIndex = 0;
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.play();
    masterPlay.classList.toggle("bi-play-circle", false);
    masterPlay.classList.toggle("bi-pause-circle", true);
    document.getElementById("Song-Cover").src = songs[songIndex].coverPath;
    document.getElementById("songTittle").innerHTML = songs[songIndex].songName;
    audioElement.currentTime = 0;
  } else {
    songIndex += 1;
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.play();
    document.getElementById("Song-Cover").src = songs[songIndex].coverPath;
    document.getElementById("songTittle").innerHTML = songs[songIndex].songName;
    audioElement.currentTime = 0;
    masterPlay.classList.toggle("bi-play-circle", false);
    masterPlay.classList.toggle("bi-pause-circle", true);
  }
}

document.getElementById("previous").addEventListener("click", PreviousPlay);

function PreviousPlay() {
  if (songIndex <= 0) {
    songIndex = 9;
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.play();
    document.getElementById("Song-Cover").src = songs[songIndex].coverPath;
    document.getElementById("songTittle").innerHTML = songs[songIndex].songName;
    masterPlay.classList.toggle("bi-play-circle", false);
    masterPlay.classList.toggle("bi-pause-circle", true);

    audioElement.currentTime = 0;
  } else {
    songIndex -= 1;
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.play();
    document.getElementById("Song-Cover").src = songs[songIndex].coverPath;
    document.getElementById("songTittle").innerHTML = songs[songIndex].songName;
    masterPlay.classList.toggle("bi-play-circle", false);
    masterPlay.classList.toggle("bi-pause-circle", true);
    masterSongName.innerText = songs[songIndex].songName;

    audioElement.currentTime = 0;
  }
}

const volumeUpBtn = document.getElementById("volume-up");
console.log(volumeUpBtn);
if (volumeUpBtn && typeof audioElement !== "undefined" && audioElement) {
  volumeUpBtn.addEventListener("click", () => {
    audioElement.volume = Math.min(
      1,
      Math.round((audioElement.volume + 0.1) * 10) / 10
    );
  });
}

const volumedownBtn = document.getElementById("volume-down");
if (volumedownBtn && typeof audioElement !== "undefined" && audioElement) {
  volumedownBtn.addEventListener("click", () => {
    audioElement.volume = Math.max(
      0,
      Math.round((audioElement.volume - 0.1) * 10) / 10
    );
  });
}

const muteButton = document.getElementById("volume-mute");
muteButton.addEventListener("click", () => {
  // audioElement.muted = !audioElement.muted;
  // muteButton.classList.add("text-success");
  if (audioElement.muted) {
    audioElement.muted = false;
    muteButton.classList.remove("bi-volume-mute");
    muteButton.classList.add("bi-volume-up");
  } else {
    audioElement.muted = true;
    muteButton.classList.remove("bi-volume-up");
    muteButton.classList.add("bi-volume-mute");
  }
});

const greet = document.getElementById("greeting");
const currentTime = new Date();
const currentHour = currentTime.getHours();

if (currentHour >= 5 && currentHour < 12) {
  greet.textContent = "Good Morning! ";
} else if (currentHour >= 12 && currentHour < 18) {
  greet.textContent = "Good Afternoon!";
} else {
  greet.textContent = "Good Evening!";
}

const songtime = document.getElementById("songtime");
audioElement.addEventListener("timeupdate", () => {
  const currentTime = audioElement.currentTime;
  const duration = audioElement.duration;
  const progress = (currentTime / duration) * 100;
  myProgressBar.value = progress;
  const currentMinutes = Math.floor(currentTime / 60);
  const currentSeconds = Math.floor(currentTime % 60);
  const durationMinutes = Math.floor(duration / 60);
  const durationSeconds = Math.floor(duration % 60);
  songtime.textContent = `${currentMinutes}:${currentSeconds} / ${durationMinutes}:${durationSeconds}`;
});
