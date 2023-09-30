// initialiasng variables
let songindex = 0
let masterplay = document.getElementById('play-pause')
let progressbar = document.getElementById('progressbar')
let gif = document.getElementById('gif')
let songitems = Array.from(document.getElementsByClassName('songitem'));
let currentsong = document.getElementById('currentsong')
let play = document.getElementById('play')
let pause = document.getElementById('pause')
let songs = [
    { songname: 'Mortals', filepath: 'songs/1.mp3', coverpath: 'covers/1.jpg' },
    { songname: 'Faded', filepath: 'songs/2.mp3', coverpath: 'covers/2.jpg' },
    { songname: 'Unstoppable', filepath: 'songs/3.mp3', coverpath: 'covers/3.jpg' },
    { songname: 'See You Again', filepath: 'songs/4.mp3', coverpath: 'covers/4.jpg' },
    { songname: 'Secrets', filepath: 'songs/5.mp3', coverpath: 'covers/5.jpg' },
    { songname: 'Pasoori', filepath: 'songs/6.mp3', coverpath: 'covers/6.jpg' },
    { songname: 'Hall Of Fame', filepath: 'songs/7.mp3', coverpath: 'covers/7.jpg' },
    { songname: 'Let me Love You', filepath: 'songs/8.mp3', coverpath: 'covers/8.jpg' },
    { songname: 'Raftaarein', filepath: 'songs/9.mp3', coverpath: 'covers/9.jpg' },
    { songname: '295', filepath: 'songs/10.mp3', coverpath: 'covers/10.jpg' }
]

let audioelement = new Audio('songs/1.mp3')
songitems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverpath;
    element.getElementsByClassName('songname')[0].innerText = songs[i].songname;
})

// Handle Play/Pause Click
masterplay.addEventListener('click', () => {
    if (audioelement.paused) {
        audioelement.play();
        document.getElementById('play').style.display = 'none';
        document.getElementById('pause').style.display = 'initial';
        gif.style.opacity = 1;
    }
    else if (audioelement.played) {
        audioelement.pause();
        document.getElementById('pause').style.display = 'none';
        document.getElementById('play').style.display = 'initial';
        gif.style.opacity = 0;
    }
})

// Listen to events
audioelement.addEventListener('timeupdate', () => {
    // Update Seekbar
    progress = parseInt((audioelement.currentTime / audioelement.duration) * 100)
    progressbar.value = progress
})

progressbar.addEventListener('change', () => {
    audioelement.currentTime = progressbar.value * audioelement.duration / 100;
})

Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        songindex = parseInt(e.target.id)
        if (audioelement.paused) {
            audioelement.src = `songs/${songindex + 1}.mp3`
            audioelement.currentTime = 0
            audioelement.play()
            gif.style.opacity = 1
        }
        else {
            audioelement.pause();
            document.getElementById('pause').style.display = 'none';
            document.getElementById('play').style.display = 'initial';
            gif.style.opacity = 0;
        }
        currentsong.innerText = songs[songindex].songname
    })
})

document.getElementById('forward').addEventListener('click', () => {
    if (songindex > 9) {
        songindex = 0;
    }
    else {
        songindex += 1;
    }
    currentsong.innerText = songs[songindex].songname
    audioelement.src = `songs/${songindex + 1}.mp3`
    audioelement.currentTime = 0
    audioelement.play()
})

document.getElementById('backward').addEventListener('click', () => {
    if (songindex < 0) {
        songindex = 9;
    }
    else {
        songindex -= 1;
    }
    currentsong.innerText = songs[songindex].songname
    audioelement.src = `songs/${songindex + 1}.mp3`
    audioelement.currentTime = 0
    audioelement.play()
})