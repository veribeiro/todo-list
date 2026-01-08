//---Seleção de elementos
const player = document.querySelector("#player");
const musicName = document.querySelector("#musicName");
const musicImage = document.querySelector("#img-music");
const prevButton = document.querySelector("#prevButton");
const playPauseButton = document.querySelector("#playPauseButton");
const nextButton = document.querySelector("#nextButton");
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");
const currentTime = document.querySelector("#currentTime");
const duration = document.querySelector("#duration");
const wave = document.querySelector("#wave");
const removeMusicPlayer = document.querySelector("#remove-music-player");
const playerClass = document.querySelector(".player");
const addMusic = document.querySelector("#addMusic");

import songs from "./songs.js";

const textButtonPlay = "<i class='fa-solid fa-play'></i>";
const textButtonPause = "<i class='fa-solid fa-pause'></i>";

let index=0;

prevButton.onclick = () =>prevNextMusic("prev");
nextButton.onclick = () =>prevNextMusic();
playPauseButton.onclick = () =>playPause();

const playPause = () => {
    if(player.paused) { //se o aúdio estiver pausado
        player.play();//irá dar play na música
        playPauseButton.innerHTML = textButtonPause;// aparecerá o botão pause
        wave.classList.remove("hidden");//aparecerá a song wave na imagem
    } else{ //se estiver iniciado
        player.pause();//irá pausar a música
        playPauseButton.innerHTML = textButtonPlay;// aparecerá o botão play
        wave.classList.add("hidden");//desaparecerá a song wave na imagem
    }
};

player.ontimeupdate = () => updateTime();

const updateTime = () => {
    const currentMinutes = Math.floor(player.currentTime / 60);
    const currentSeconds = Math.floor(player.currentTime % 60);
    currentTime.textContent = currentMinutes + ":" + formatZero(currentSeconds);

    const durationFormatted = isNaN(player.duration) ? 0 : player.duration; // verificar se não for o número, se for é igual a zero, se não ent: player.duration
    const durationMinutes = Math.floor(durationFormatted / 60);
    const durationSeconds = Math.floor(durationFormatted % 60);
    duration.textContent = durationMinutes + ":" + formatZero(durationSeconds);

    const progressWidth = durationFormatted //Se tiver a duração formatada (durationFormatted) 
    ? (player.currentTime / durationFormatted) * 100 : 0; //irá pegar a hora atual do player (player.currentTime) dividir pela duração formatada vezes 100. Se não, irá ser zero

    progress.style.width = progressWidth + "%"; //Estilização de tamanho
};

const formatZero = (n) => (n < 10 ? "0" + n: n);//implementar o zero. Exemplo: se receber 1 será modificado como 01

progressBar.onclick = (e) => {
    const newTime = (e.offsetX / progressBar.offsetWidth) * //irá registrar a posição horizontal (offsetX) que o usuário clicou, dividir com o progressBar.offsetWidth e multiplicar a duração do player 
    player.duration;
    player.currentTime = newTime;
};

const prevNextMusic = (type = "next") => { //Passar ou voltar a próxima música
if ((type == "next" && index + 1 === songs.length) || type === "init") { // Verificar se é a primeira vez que o usuário clicou no site ou se foi a última música
    index=0; //voltar para a primeira música
}else if (type == "prev" && index === 0) { //se o usuário está na primeira música e quer voltar
    index = songs.length; //irá para a última música
} else {
    index = type === "prev" && index ? index - 1: index + 1;
}

player.src = songs[index].src; //selecionar a pasta "songs" para aplicar a música que está dentro do array
musicName.innerHTML = songs[index].name; //selecionar a pasta "songs" para aplicar o nome da música que está dentro da array 
musicImage.src = songs[index].img;
if (type !== "init") playPause(); //verificação se o tipo é diferente do inicial e chamar a função "playPause()" que vai verificar se o aúdio está pausado

sessionStorage.setItem("musicIndex", index);


updateTime();
};


removeMusicPlayer.onclick = (e) => { //Para remover o music player por completo
    const remove = e.target;
    if(remove){
        playerClass.style.display = "none";
        addMusic.classList.remove("hidden");
        player.pause();

        sessionStorage.setItem("playerVisible", "false");
    }
};

addMusic.onclick = (e) => { //Para adicionar o music player 
    const add = e.target;
    if(add){
        playerClass.style.display = "flex";
        addMusic.classList.add("hidden");
        playPause();

        sessionStorage.setItem("playerVisible", "true");
    }
};

window.onload = () => { //Para verificação do estado salvo, ao reiniciar a página. 
    const savedState = sessionStorage.getItem("playerVisible");

    if(savedState === "false"){
        playerClass.style.display = "none";
        addMusic.classList.remove("hidden");
    } else{
        playerClass.style.display = "flex";
        addMusic.classList.add("hidden");
    }
    
}

prevNextMusic("init"); //para carregar


