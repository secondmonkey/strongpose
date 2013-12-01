var timeoutHandle;
var currentpage;

// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
//
function onDeviceReady() {
  navigate('1');
}

function isCordovaLoaded() {
  if(typeof window.navigator.notification !== 'undefined') {
    return true;
  }
  else {
    return false;
  }
}

if (isCordovaLoaded() == false) {
  navigate('1');
  var doneSound = new Audio('audio/bell.mp3'); 
}

// Utility functions

function playAudio(url) {
  var my_media = new Media(url,
  // success callback
  function() {
    console.log("playAudio():Audio Success");
  },
  // error callback
  function() {
    console.log("playAudio():Audio Error" + err);
  }
  );
  // play media
  my_media.play();
};

function ding() {
  if(isCordovaLoaded()) {
    vibrate();
    playAudio('audio/bell.mp3');
    nextPage();
  }
  else {
    doneSound.play();
    nextPage();
  }
}

function vibrate() {
  navigator.notification.vibrate(2000);
}

function reset() {
  navigate('1');
}

function navigate(pagenum) {
  var pages = document.getElementsByClassName('page');
  var page = document.querySelectorAll("[data-pagenum='" + pagenum + "']")[0];
  for (i = 0; i < pages.length; i++) {
    pages[i].classList.add("hidden");
  }
  page.classList.remove("hidden");
  currentpage = pagenum;
}

function hasClass(element, classname) {
  var el = document.getElementById(element);
  var counter = 0;
  for (var i=0; i < el.classList.length; i++) {
    if (el.classList[i] == classname) {
      counter = counter + 1;
    }
  }
  if (counter == 0) {
    return false;
  }
  else {
    return true;
  }
}

function resetDetails() {
  if (hasClass("details","hidden")) {
    return;
  }
  else {
    toggle("details");
  }
}

function toggle(element) {
  var el = document.getElementById(element);
  if (hasClass(element, "hidden")) {
    el.classList.remove("hidden");
  }
  else {
    el.classList.add("hidden");
  }
}

function nextPage(callback) {
  var newpage = +currentpage + 1; 
  navigate(newpage);
  typeof callback === 'function' && callback();
}

// The timer
//

function clearTime(timerid) {
  window.clearTimeout(timeoutHandle);
  var o = document.getElementById(timerid);
  o.innerHTML = "0:00";
}

// Make a closure for timer and format time to simplify?
// 
function timer(timerid, timeInSeconds, callback, format) {

  var t = timeInSeconds;
  var o = document.getElementById(timerid);

  clearTime(timerid);
  o.innerHTML = formatTime(t, format);

  if (t > 0) {
    t--;
    o.innerHTML = formatTime(t, format);   
    if (t % 5 == 0 && t != 0) {
      console.log(t);
      console.log("toggling breathing");
      toggleBreathing();
    }
    timeoutHandle = window.setTimeout(function() {timer(timerid, t, callback, format)},1000);
  }
  else if (t == 0) {
    resetBreathing();
    callback();
  }
}

function resetBreathing() {
  var breathstructions = document.getElementsByClassName("breathing");
  for (var i = 0; i < breathstructions.length; i++) {
    var breathstruction = breathstructions[i];
    breathstruction.innerHTML = "Take a deep breath..."
  }
}


function toggleBreathing() {
  var breathstructions = document.getElementsByClassName("breathing");
  for (var i = 0; i < breathstructions.length; i++) {
    var breathstruction = breathstructions[i];
    if (breathstruction.innerHTML == "Take a deep breath...") {
      breathstruction.innerHTML = "...breathe out";
    }
    else if (breathstruction.innerHTML == "...breathe out") {
      breathstruction.innerHTML = "breathe in...";
    }
    else if (breathstruction.innerHTML == "breathe in...") {
      breathstruction.innerHTML = "...breathe out";
    }
    else {
      break;
    }
  }
}

function formatTime(timeInSeconds,format) {
  var t = timeInSeconds;
  //var m = Math.floor(t / 60);
  //var s = t % 60;
  //var formatted = (t < 10 ? '0' : '') + m + ":" + (s < 10 ? '0' : '') + s;
  if (format == "simple") {
    var formatted = t.toString();
  }
  else {
    var formatted = '0:' + (t < 10 ? '0' : '') + t;
  }
  return formatted;
}

// adding event listeners to buttons
//

var begin = document.getElementById('startButton');
begin.addEventListener('click', function() {navigate('2')});
begin.addEventListener('click', function() {resetDetails()});

var start1 = document.getElementById("pose1start");
start1.addEventListener('click', function() {timer("ready1",3, function(){ return nextPage(function() {timer("countdown1",40,ding)})},'simple')});

var start2 = document.getElementById("pose2start");
start2.addEventListener('click', function() {timer("ready2",3,function(){ return nextPage(function() {timer("countdown2",40,ding)})},'simple')});

var start3 = document.getElementById("pose3start");
start3.addEventListener('click', function() {timer("ready3",3,function(){ return nextPage(function() {timer("countdown3",40,ding)})},'simple')});
