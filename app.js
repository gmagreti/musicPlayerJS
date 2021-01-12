// Seleciona todos os elementos do MusicPlayer
const musicContainer = document.getElementById('music-container');

const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Faz a listagem do titulo das musicas
const songs = ['Ghosts - Mike Shinoda', 'In The End - Linkin Park', 'Numb - Linkin Park'];

// Acompanha a musica
let songIndex = 1;

// Carrega os detalhes da musica dentro da DOM
loadSong(songs[songIndex]);

//Atualiza os detalhes das musicas
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
}

//Play Song
function playSong() {
    musicContainer.classList.add("play");
    playBtn.querySelector("i.fas").classList.remove("fa-play");
    playBtn.querySelector("i.fas").classList.add("fa-pause");

    audio.play();
}

//Pause Song 
function pauseSong() {
    musicContainer.classList.remove("play");
    playBtn.querySelector("i.fas").classList.add("fa-play");
    playBtn.querySelector("i.fas").classList.add("fa-pause");

    audio.pause();
}

//Previous Song
function prevSong() {
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);

    playSong();
}

//Next Song
function nextSong() {
    songIndex++;
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);

    playSong();
}

//Update Progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

//Set Progress Bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

//Event Listener
playBtn.addEventListener('click', ()=> {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying){
        pauseSong();
    } else{
        playSong();
    }
});

// Change Song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

//TIme&Song update

audio.addEventListener('timeupdate', updateProgress);

//Click on progress bar
progressContainer.addEventListener("click", setProgress);

//Fim da Musica
audio.addEventListener("ended", nextSong);