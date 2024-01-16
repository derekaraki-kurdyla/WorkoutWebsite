let count = 0;

let list=["push-ups", "pull-ups", "pistol-squats", "pike-push-ups", "bulgarians", "RDLs", "ez-bar-curls", "sumo-walks", "lateral-raises", "planche-pushups", "planche-holds", "handstand-holds", "squat-jumps", "glute-bridges", "squats", "archer-push-ups", "archer-pull-ups", "one-armed-pull-ups", "reverse-grip-curls", "hammer-curls", "incline-curls", "tricep-pushdowns"];

let modlist = [...list];

function StartWorkout(){

  //play audio
  var audio = document.getElementById("yeahbuddy");
  audio.play();

  let valid = false;
  
  while (!valid){
    let interval = window.prompt("How many minutes do you want between workout sets?");
    if (interval.trim() != "" && interval != null){
      valid = true;
      let interval_min = Number(interval);
      let interval_sec = interval_min * 60;
      var interval_ms = interval_sec * 1000;

      simulation();
    }
    else {
      window.alert("Please input a valid input.");
    }
  }
  
  
  
  let myCycle = setInterval(simulation, interval_ms);
  
  
  function simulation(){
    if (count >= 10){
      //when 10 workouts are finished
      console.log("Finished simulation");
      speak("Your workout is finished");
      modlist = [...list];
      clearInterval(myCycle);
      
      return;
    }
    
    console.log("reached simulation");
    count++; 

    console.log(count);
    
    update_table();
  
    display_countdown();
  
  
    function update_table(){
      //has access to count because global variable

      let index = Math.floor(Math.random() * modlist.length);

      speak("Your workout is " + modlist[index]);

      console.log("reached update_table");

      update_workout(index);
      update_color();
      
      modlist.splice(index, 1);
      
      function update_workout(index){
        console.log("reached update_workout");
        let tablerow = document.getElementById("w" + count);
        tablerow.textContent = modlist[index];
      }
  
      function update_color(){
        console.log("reached update_color");
        let tablerow = document.getElementById("tr" + count);
        tablerow.style.backgroundColor = "yellow";
      }
      
    }
  
    function display_countdown(){
      console.log("reached display countdown")
      //has access to interval_ms because in same function scope and 
  
      var total_time=interval_ms;
      console.log("total time is" + total_time);
      
      var myCountdown = setInterval(update_countdown, 1000);

      function update_countdown(){
        console.log("reached update countdown")
        if (total_time <= 0){
          total_time=interval_ms;
          clearInterval(myCountdown);
          console.log("end of this workout");
        }
        console.log(total_time);
        let seconds = (total_time/1000) % 60;
        let minutes = Math.floor(total_time/60000);
        
        if (seconds.toString().length == 1){
          seconds = "0"+seconds;
        }
        if (minutes.toString().length == 1){
          minutes = "0"+minutes;
        }
        //display timer
        timer.textContent = minutes + "." + seconds;
        total_time -= 1000;
    }
      
    }

    
  }

}

function speak(sentence){
  if ('speechSynthesis' in window) {
      // Create a new instance of the SpeechSynthesisUtterance object
      const message = new SpeechSynthesisUtterance();
      // Set the text to be spoken
      message.text = sentence;
      // Use the default speech synthesis voice
      message.voice = speechSynthesis.getVoices()[0];
      // Speak the message
      speechSynthesis.speak(message);
    }
}

/*
let list=["push-ups", "pull-ups", "pistol-squats", "pike-push-ups", "bulgarians", "RDLs", "ez-bar-curls", "sumo-walks", "lateral-raises", "side-planks", "crucifixes", "mountain-climbers", "planks", "planche-pushups", "planche-holds", "handstand-holds", "scissor-kicks", "squat-jumps", "glute-bridges", "squats", "archer-push-ups", "archer-pull-ups", "one-armed-pull-ups", "reverse-grip-curls", "hammer-curls", "incline-curls", "tricep-pushdowns"];
let modlist = [...list];

function StartWorkout(){
  
  //play ronnie coleman meme
  var audio = document.getElementById("yeahbuddy");
  audio.play();
  

  function displayCountdown(seconds){
    console.log("reached displayCountdown");
    myCountdown=setInterval(function(){
      let timer=document.getElementById("timer");
      
      let minutes = Math.floor(seconds/60);

      if (minutes.toString().length == 1){
        let minutes = "0" + minutes;
      }
      if (seconds.toString().length == 1){
        let seconds = "0" + seconds;
      }
      console.log(minutes, seconds);
      timer.textContent = minutes + "." + seconds;
      console.log(minutes, interval_sec);

      if (seconds <= 0 && minutes <= 0){
        clearInterval(myCountdown);
        console.log("Reached the end of countdown");
      }
      else{
        seconds --;
      }
    }, 1000);
  }
  
  function workoutFunction(){
    console.log("reached workout function");
    let index = Math.floor(Math.random() * modlist.length);
    
    //speak the workout to the user
    speak("Your workout is " + modlist[index]);

    //update the html table
    update_workout(count, index);
    update_color(count)

    //display the countdown
    displayCountdown(interval_sec);
    
    console.log("length of list is " + modlist.length);
    modlist.splice(index, 1);
    console.log("it is now " + modlist.length);
  }
  
  
  function cycleFunction(){
    if(count >= 10){
      count = 0;
      clearInterval(mytimer);
      speak("Your are done now bitch");
      modlist = [...list];
      return;
    }
    console.log("reached cycle function");
    count ++;
    workoutFunction();
  }

  let valid = false;
  
  while (!valid){
    let interval = window.prompt("How many minutes do you want between workout sets?");
    if (interval.trim() != "" && interval != null){
      valid = true;
      console.log("hello");
      let interval_min = Number(interval);
      var interval_sec = interval_min * 60;
      let interval_ms = interval_sec * 1000;

      //do one iteration of workoutFunction() before the for loop so that the user can start their first exercise immediately
      count++;
      workoutFunction();
      
      //call cycleFunction() once every time interval that the user specified
      console.log("this is where the error is");
      var mytimer = setInterval(cycleFunction, interval_ms);
    }
    else {
      window.alert("Please input a valid input.");
    }
  }
  
}

function speak(sentence){
  if ('speechSynthesis' in window) {
      // Create a new instance of the SpeechSynthesisUtterance object
      const message = new SpeechSynthesisUtterance();
      // Set the text to be spoken
      message.text = sentence;
      // Use the default speech synthesis voice
      message.voice = speechSynthesis.getVoices()[0];
      // Speak the message
      speechSynthesis.speak(message);
    }
}

function update_workout(count, index){
  let tablerow = document.getElementById("w" + count);
  tablerow.textContent = modlist[index];
}

function update_color(count){
  let tablerow = document.getElementById("tr" + count);
  tablerow.style.backgroundColor = "yellow";
}
*/