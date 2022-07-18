const btnVideo = document.getElementById("btn-video");
const btnMic = document.getElementById("btn-mic");
var video = document.querySelector("#videoElement");

btnMic.addEventListener('click', () => {
    const isMicMuted = btnMic.getAttribute("isMicMuted");
    if (isMicMuted == 'false') {
        btnMic.innerHTML = '<i class="fa-solid fa-microphone-slash"></i>';
        btnMic.setAttribute("isMicMuted", true)
    } else {
        btnMic.innerHTML = '<i class="fa-solid fa-microphone"></i>';
        btnMic.setAttribute("isMicMuted", false)

    }

})
btnVideo.addEventListener('click', () => {
    const isVideoMuted = btnVideo.getAttribute("isMuted");
    if (isVideoMuted == 'false') {
        btnVideo.innerHTML = '<i class="fa-solid fa-video-slash"></i>';
        btnVideo.setAttribute("isMuted", true);
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                    video.srcObject = stream;
                })
                .catch(function (err0r) {
                    console.log("Something went wrong!");
                });
        }
    } else {
        btnVideo.innerHTML = '<i class="fa-solid fa-video"></i>';
        btnVideo.setAttribute("isMuted", false)
    }

    //console.log(isVideoMuted)
})

