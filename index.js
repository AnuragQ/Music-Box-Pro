// require('howler');
const $ = require("jquery");
const { dialog } = require('electron').remote
// let file='sound.mp3'
let sound = new Howl({
    src: ['/media/anurag/Data/music']
    })
let file;
let cur=0;
let ctr=0;
$(document).ready(async function () {
    $('#play').on('click',play)
    $('#pause').on('click',function(){
        sound.pause();
    })
    $('#stop').on('click',function(){
        sound.stop();
    })
    $('#open_file').on('click',function(){
        let audio_file=dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] })
        audio_file.then(function(data){
            file=data.filePaths
            // console.log(file[cur])
            for(let i =0; i<file.length;i++){
                $('#song_queue').append('<button id=music_'+ctr+'>'+file[i]+'</button>')
                $('#music_'+ctr).click({file_name:file[i]},addAndPlay)
                ctr++;
            }
            // sound.stop()
            // sound = new Howl({
            // src: [file[cur]]
            // })
            // count=file.length
        })
        // console.log()
        
// filefole
//TODO
// open folder
// add audio as buttons
//buutons pe onclick
//auto continue to next song

    })
    
})


function play(){
    sound.pause();

        sound.play()
}
function addAndPlay(event){
    console.log(event.data.file_name)
    sound.stop()
            sound = new Howl({
            src: [event.data.file_name]
            })
    // sound.pause();

        sound.play()
}