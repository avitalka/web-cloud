var countBoxes =0
var initSizeForNewBox=80;
var letterArray =['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
var gameStatus =0;
var playCount=0;
var gameArray =[];
var timer;
document.getElementById("container").addEventListener("click", arrangeBoardGame.bind(this));

function addBoxesToGameBoard() {
    if(gameStatus==0){
        for(var i =0; i<3;i++)
            {
                var newElement = document.createElement("DIV");
                newElement.className="box_3_"+ countBoxes;
                newElement.style.background = '#000000';
                newElement.style.width = initSizeForNewBox+'px';
                newElement.style.height=initSizeForNewBox+'px';
                document.getElementById("container").appendChild(newElement);
                initSizeForNewBox=initSizeForNewBox+20;
                countBoxes++;
            }
        }
}

function arrangeBoardGame(clickedBox){
    var numberOfLetters =0;
    if (gameStatus == 0){
        allBoxes=document.getElementById("container").children;
        if(countBoxes%2 == 0)
            numberOfLetters = countBoxes/2;
        else  numberOfLetters=Math.ceil((countBoxes/2));
        
        var tempLetterArray= letterArray.slice(0,numberOfLetters);
        tempLetterArray= tempLetterArray.concat(tempLetterArray);
        var x= tempLetterArray.length , y , temp;
        /* randomize letter array */
        while(--x){
	        y=Math.floor(Math.random()*(x-1));
	        temp =tempLetterArray[x];
	        tempLetterArray[x]=tempLetterArray[y];
            tempLetterArray[y]=temp;
        }
        /*add text to Boxes*/
        for(var i=0; i<countBoxes;i++){
            var textNode = document.createElement('span');
            textNode.textContent = tempLetterArray[i];
            textNode.style.color ="#000000"
            allBoxes[i].appendChild(textNode);          
        }
        gameStatus++;
    }
    if(gameStatus==1){
        document.getElementById("container").id="container_done";
        document.getElementById("container_done").addEventListener("click", playGameErorCheck.bind(this));
        playGameErorCheck(clickedBox);
        gameStatus++;
    }

};

function playGame(clickedBox){
    var clickedBoxClassName = clickedBox.target.className;
    if(playCount==0){
        gameArray[0]=clickedBoxClassName;
        console.log("first clicked class name" + gameArray[0]);
        gameArray[1] =clickedBox.target.children[0].textContent;
        clickedBox.target.children[0].style.color="#FFFFFF";
        playCount++;
    }
    else if(playCount==1){
        if(clickedBoxClassName==gameArray[0]){
            alert ("Choose another box");
        }
        else{
            gameArray[2]=clickedBoxClassName;
            console.log("first clicked class name" + gameArray[0]);
            gameArray[3] =clickedBox.target.children[0].textContent;
            clickedBox.target.children[0].style.color="#FFFFFF";
            playCount++;
        }
   }
   
    if(playCount==2){
        if(gameArray[1]==gameArray[3]){
            document.getElementsByClassName(gameArray[0])[0].style.background ="#4169E1";
            document.getElementsByClassName(gameArray[0])[0].children[0].style.color ="#4169E1";
            document.getElementsByClassName(gameArray[2])[0].style.background ="#4169E1";
            document.getElementsByClassName(gameArray[2])[0].children[0].style.color ="#4169E1";
            countBoxes=countBoxes-2;
        }
        else{
            timer = setInterval(hideBack,500);
        }
        playCount=0;
    }
    if (countBoxes == 0 || countBoxes ==1){
        alert("congratulations you won the game ");
    }
};

function hideBack(){
    clearInterval(timer);
    document.getElementsByClassName(gameArray[0])[0].children[0].style.color ='#000000';
    document.getElementsByClassName(gameArray[2])[0].children[0].style.color ='#000000';
};

function playGameErorCheck(clickedBox){
    var _clickedBoxClassName = clickedBox.target.className;
    var checkBoxName = _clickedBoxClassName.includes("box");

    if(checkBoxName==false){
        alert("Make sure to click on a card");
    }
    else if(clickedBox.target.style.background == "rgb(65, 105, 225)"){
        alert ("This pair was already found- try again");
    }
    else if(_clickedBoxClassName=="top_box"){
        alert ("Oops you already started the game - can't add any more cards ");
    }
    else{
        playGame(clickedBox);
    }
};


window.onload  = function(){
    var newElement = document.createElement("DIV");
    newElement.className="top_box";
    newElement.style.background = '#000000';
    newElement.style.position ="absolute";
    newElement.style.top = "21px";
    newElement.style.right = "24px";
    newElement.style.width = "80px";
    newElement.style.height="80px";
    document.getElementById("_header").appendChild(newElement);
    document.getElementsByClassName("top_box")[0].addEventListener("click", addBoxesToGameBoard);
};
