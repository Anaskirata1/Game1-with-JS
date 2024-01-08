// get button to start game
document.querySelector(".control-button  span").onclick = function(){
    // get the name
    let yourName = prompt("Whats Your Name?");
    
    // put the name in span
    if(yourName == null || yourName == ""){

        document.querySelector(".name span").innerHTML = 'UnKnown' ;
    } else {
        document.querySelector(".name span").innerHTML = yourName ;
    }

    // remove control-button form page
    document.querySelector(".control-button").remove()
}

// seconds of wait
let duration = 1000 ;

// get the container of all blocks
let blocksContainer = document.querySelector(".memory-game-blocks") ;

// get all blocks
let blocks = Array.from(blocksContainer.children) ;

// get numbers of blocks (19)
let orderRange = [...Array(blocks.length).keys()] ;


shuffle(orderRange) ;


// add order css property to game blocks
blocks.forEach((block , index)=>{

    block.style.order = orderRange[index] ;

    // add click event 
    block.addEventListener('click', function(){
        // trigger the flip block function 
        flipBlock(block) ;
    })
}) ;


// flip block function
function flipBlock(selectedBlock){

    // add class is-flipped
   selectedBlock.classList.add("is-flipped") ;

   // collect all flipped cards
   let allFlippedBlock = blocks.filter(flippedBlock => flippedBlock.classList.contains("is-flipped")) ;

   // if there is tow selected blocks
   if(allFlippedBlock.length ===2){
   
    stopClicking();

    checkMatchedBlocks(allFlippedBlock[0] , allFlippedBlock[1] )
   }
   
}

// stop clicking function
function stopClicking(){
    // add class no clicking on main container
    blocksContainer.classList.add('no-clicking') ;

    setTimeout(() => {

        blocksContainer.classList.remove('no-clicking') ;

    } , duration) ;
}


// check matched blocks 
function checkMatchedBlocks(firstBlock , secondBlock){

    let triesElement = document.querySelector(".tries span") 
    // check if the first block = second block 
    if(firstBlock.dataset.technology === secondBlock.dataset.technology) {

        firstBlock.classList.remove("is-flipped") ;
        secondBlock.classList.remove("is-flipped") ;

        firstBlock.classList.add("has-match") ;
        secondBlock.classList.add("has-match")

        document.getElementById("success").play()
    } else {

        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1 ; 
        
        setTimeout(() =>{

            firstBlock.classList.remove("is-flipped") ;
            secondBlock.classList.remove("is-flipped") ;

        } , duration)
        document.getElementById("fail").play()
    }

}

// create shuffle function 
function shuffle(array){
    // settings vars 
    let current = array.length,
    temp,
    random ;

    while(current > 0) {

        // get random number
        random = Math.floor(Math.random() * current) ;

        current-- ; 

       // save current element in stash 
       temp = array[current] ;

       // current element = random element 
       array[current] = array[random] ;

       // random element = get element from stash 
       array[random] = temp ;

       
    }
    return array ;
}


