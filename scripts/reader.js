var highlighted_block=null;

//BUG- when mouse is moved fast around,some of blocks may not update their class;
var hovered_history=[];

//wait for the entire document to be loaded.
$(document).ready((e)=>{
   $("*:not(body)").hover(e=>{
     //when mouse enters in an element
     
      //this will stops bubling event from child to parent
     e.preventDefault();

     // add css class to hightlight it;
     $(e.target).addClass('hightlight');
     selected_block=e.target;
     hovered_history.push(selected_block);
   },e=>{
    //on mouse leaves remove that css class to make it normal.
    $(e.target).removeClass('hightlight');
    selected_block=null;

    //bug fix for discussion aboove
    hovered_history.forEach(block=>{
        $(block).removeClass('hightlight');
    });

   })

   //add key listener on document to make it read when only space bar pressed.
   $(document).keydown(e=>{
    //if spacebar is pressed
    if(e.keyCode==0 || e.keyCode==32){
        e.preventDefault();
        let text="";
        if(selected_block && selected_block.nodeName==='IMG'){
            text=selected_block.alt || selected_block.src;
        }else if(selected_block){
            text=selected_block.textContent;
        }     
        //cancel all on going speech synthesis; 
        speechSynthesis.cancel();
        //speak out text;
        speechSynthesis.speak(new SpeechSynthesisUtterance(text));
    } 
   });
   //this prevent jumping of page when space bar clicked.
   window.onkeydown = function (e) {
       return !(e.keyCode == 32 && e.target == document.body);
   };
});
