var video = document.querySelector('#camera-stream'),
    image = document.querySelector('#snap'),
    start_camera = document.querySelector('#start-camera'),
    controls = document.querySelector('.controls'),
    take_photo_btn = document.querySelector('#take-photo'),
    delete_photo_btn = document.querySelector('#delete-photo'),
    download_photo_btn = document.querySelector('#download-photo'),
    error_message = document.querySelector('#error-message');

    var constraints = { audio: false, video: true }; 

    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(stream) {
      video.src = window.URL.createObjectURL(stream);
      video.play();
      video.onplay = function() {
        showVideo();
      };
    })
    .catch(function(err){
      displayErrorMessage("There was an error with accessing the camera stream: " + err.name, err);      
    });

start_camera.addEventListener("click", function(e){

  e.preventDefault();
  video.play();
  showVideo();

});

take_photo_btn.addEventListener("click", function(e){

  e.preventDefault();

  var snap = takeSnapshot();
  image.setAttribute('src', snap);
  image.classList.add("visible");

  delete_photo_btn.classList.remove("disabled");
  download_photo_btn.classList.remove("disabled");
  download_photo_btn.href = snap;

  video.pause();

});


delete_photo_btn.addEventListener("click", function(e){

  e.preventDefault();
   $('#output').hide();

  image.setAttribute('src', "");
  image.classList.remove("visible");

  delete_photo_btn.classList.add("disabled");
  download_photo_btn.classList.add("disabled");

  video.play();

});

function showVideo(){

  hideUI();
  video.classList.add("visible");
  controls.classList.add("visible");
}

function takeSnapshot(){

  alert('Your Image has been captured successfully, Please provide your signature.');

  var hidden_canvas = document.querySelector('canvas'),
      context = hidden_canvas.getContext('2d');

  var width = video.videoWidth,
      height = video.videoHeight;

  if (width && height) {

    hidden_canvas.width = width;
    hidden_canvas.height = height;

    context.drawImage(video, 0, 0, width, height);
     
    return hidden_canvas.toDataURL('image/jpeg', 1.0);  // Bydefault it is 'image/png' and value(image quality) is 0.92 
  }
}


function displayErrorMessage(error_msg, error){
  error = error || "";
  if(error){
    console.log(error);
  }

  error_message.innerText = error_msg;

  hideUI();
  error_message.classList.add("visible");
}


function hideUI(){

  controls.classList.remove("visible");
  start_camera.classList.remove("visible");
  video.classList.remove("visible");
  snap.classList.remove("visible");
  error_message.classList.remove("visible");
}

var imageone = document.querySelector('#snapone');
var canvas = document.getElementById('signature-pad');
 
function resizeCanvas() {
    var ratio =  Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
}

window.onresize = resizeCanvas;
resizeCanvas();

var signaturePad = new SignaturePad(canvas, {
  backgroundColor: 'rgb(255, 255, 255)'
}); 

document.getElementById('save-jpeg').addEventListener('click', function () {
  if (signaturePad.isEmpty()) {
    return alert("Please provide a signature first.");
  }

  var data = signaturePad.toDataURL('image/jpeg', 1.0);

  imageone.setAttribute('src', data); 
  image.classList.add("visible");
  
  $('#output').show();

});

document.getElementById('clear').addEventListener('click', function () {
  signaturePad.clear();
});

document.getElementById('draw').addEventListener('click', function () {
  var ctx = canvas.getContext('2d');
  ctx.globalCompositeOperation = 'source-over'; 
});
