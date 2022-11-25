//Start

function gameStart(){
    document.getElementById('start').style="display:none";
    document.getElementById('ronda').innerHTML = "Ronda " +  cookieReader(gamedata,"round")


    const interval = setInterval(timerNumbers, 1000); //Set Timer

    
    
    
    function timerNumbers(){
        numbers.push(values())
        
        repeat(numbers)
        

        if(numbers.length <= parseInt(cookieReader(gamedata,"nCount"))){
            document.getElementById("txt").innerHTML = `<h1 style="color:red;">`+ numbers[numbers.length-1];
        }else{
            clearInterval(interval); numbers.splice(numbers.length-1, numbers.length)
            document.getElementById('txt').innerHTML = 'Seleccione los numeros en el orden correcto:';
            NPConstruct();
            
        }


    }
}



document.getElementById('clean').onclick = function(){
    uNumbers.length = 0;
    document.getElementById('uSelect').innerHTML = ''
    const btnList = document.querySelectorAll(".btn");
    for(let x in btnList){
        btnList[x].class = 'btn';
    }
}



function selectCharacter(event){
    let btn = document.getElementById(event.target.id); 
    if(btn.style.backgroundColor == "rgba(255, 0, 0, 0.2)"){
        btn.style.backgroundColor = "rgba(0, 0, 0, 0)";
        
    }else{
         btn.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
         uNumbers.push(parseInt(btn.innerText));  
         document.getElementById('validate').style="";
         document.getElementById('clean').style="";
         document.getElementById('uSelect').innerHTML = uNumbers.join(' - ')
    }

}

document.getElementById('validate').onclick = function(){
    let cAccert = 0
    if(uNumbers.length == numbers.length){
        for(let x in uNumbers){
            if(uNumbers[x] == numbers[x]){
                cAccert+=1;
            }
        }
        if(cAccert == numbers.length){
            alert(`Ganaste`)
            round+=1;
            points+=20
            gamedata = document.cookie = `nCount=${ncount++};round=${round};points=${points}` 
            broom();
            gameStart()
        }else{
            fail();
            
        }

    }else{
        fail();
        
    }

    
}

document.getElementById('info').onclick = function(){
        alert(`¡Hola Jugador!
        Esta es tu puntuacion actual:
        Ronda/s : ${cookieReader(gamedata,"round")}
        Puntaje : ${cookieReader(gamedata,"points")}`)
}

function fail(){
    alert(`Perdiste, la secuencia era ${numbers}
        Esta es tu puntuacion final:
        Ronda/s : ${cookieReader(gamedata,"round")}
        Puntaje : ${cookieReader(gamedata,"points")}`)
		broom(); 
        round = 1;
        gamedata = document.cookie = `nCount=3;round=${round};points=0`
        gameStart()
}

