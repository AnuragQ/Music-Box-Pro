// require('howler');
const $ = require("jquery");
const { dialog } = require('electron').remote
// let file='sound.mp3'

let sound = new Howl({
    src: ['/media/anurag/Data/music']
    })
let file=[];
let cur=0;

playing=false
$(document).ready(async function () {
    document.onkeydown = function(e) {
        switch(e.which) {
            case 37: // left
                sound.seek(sound.seek()-3)

            break;
    
            case 38: // up
                sound.volume(sound.volume()+.1)
            break;
    
            case 39: // right
                 sound.seek(sound.seek()+4)

            break;
    
            case 40: // down
            sound.volume(sound.volume()-.1)
            break;

            case 32: //space
            if(playing){
                pause()
            }else{
                
                play()
            }  
            break;
    
            default: return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    };
    // $('#search').on('input',function(){
    //     if($('#search').val()=''){
    $('#seeker').val(0);
    $('#seeker').on("change",function(){
        console.log($('#seeker').val())
        sound.seek($('#seeker').val()*sound.duration()/100)
    })
        setInterval(() => {
            updateWidth(); 
          },700);
          
          function updateWidth() {
            if (sound.playing()) {
                console.log(sound.duration()+" "+sound.seek())
              let width = (sound.seek()/sound.duration()*100);
              console.log(width)
              $('#seeker').val(width)
            }
          }

    $('#search').on("input",function(){
        console.log('search')
        let inp=$('#search').val()
        let new_file=[]
        for(let i=0;i<file.length;i++){
            if(file[i].toLowerCase().includes(inp.toLowerCase())){
                new_file.push(file[i]);
            }
        }
        // for(let i=0;i<file.length;i++){
        //     if(new_file.includes(file[i])){
        //         continue;
        //     }else{
        //         new_file.push(file[i]);
        //     }
        // }
        // file=new_file
        // console.log(file)
        console.log(new_file)
        $("#song-queue").empty();
        for(let i =0; i<new_file.length;i++){
            $('#song-queue').append('<div class="queue-element" id=music-'+i+'>'+new_file[i]+'</div>')
            $('#music-'+i).click({file_name:new_file[i]},addAndPlay)
            
        }


        
    })


    $("#pause").hide();

    $('#play').on('click',play)
    $('#pause').on('click',pause)
    $('#stop').on('click',function(){
        sound.stop();
    })
    $('#open-file').on('click',function(){
        let audio_file=dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] })
        audio_file.then(function(data){
            let songListThatAdd = data.filePaths
            for(let i = 0 ; i < songListThatAdd.length ; i++){
                if(file.includes(songListThatAdd[i])){continue}
                file.push(songListThatAdd[i]);
            }
            sound.stop();
            sound = new Howl({
                src :[file[cur]]
            })

            length = file.length;

            $("#song-queue").empty();
            for(let i =0; i<file.length;i++){
                $('#song-queue').append('<div class="queue-element" id=music-'+i+'>'+file[i]+'</div>')
                $('#music-'+i).click({file_name:file[i]},addAndPlay)
                
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

function pause(){  
    sound.pause();
    $("#play").show();
    $("#pause").hide();  
    playing=false;      
}
function play(){
    sound.pause();

        sound.play()
        $("#pause").show();
        $("#play").hide();
        playing=true;
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