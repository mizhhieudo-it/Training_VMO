const btnVideo = document.getElementById("btn-video");
const btnMic = document.getElementById("btn-mic");
const btnSentMgs = document.getElementById("btn-sent-mgs");
const inputChatElmt = document.getElementById("inputChat");
const gridChatBox = document.getElementById("screenChat");
const gridVideoBox = document.getElementById("screenVideo");
const videoClient = document.getElementById("videoElement");
let text;
let personName = null;
let idCaller = null;
// create port PeerJS 
const getNameUser = () => {
    var person = prompt("Please enter your name:", "example : John etc..");
    if (person == null || person == "") {
        getNameUser()
    } else {
        personName = person
    }
}
getNameUser()
// console.log("========>", ROOM_ID);
// console.log(socket)
btnMic.addEventListener('click', () => {
    const isMicMuted = btnMic.getAttribute("isMicMuted");
    if (isMicMuted == 'false') {
        btnMic.innerHTML = '<i class="fa-solid fa-microphone"></i>';
        btnMic.setAttribute("isMicMuted", true)
        navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(stream => {
            window.localStream = stream; // A
            window.localAudio.srcObject = stream; // B
            window.localAudio.autoplay = true; // C
        }).catch(err => {
            console.log("u got an error:" + err)
        });
    } else {
        btnMic.innerHTML = '<i class="fa-solid fa-microphone-slash"></i>';
        btnMic.setAttribute("isMicMuted", false)
        local_stream.getAudioTracks()[0].enabled = !local_stream.getAudioTracks()[0].enabled;

    }

})
btnVideo.addEventListener('click', () => {
    const isVideoMuted = btnVideo.getAttribute("isMuted");
    if (isVideoMuted == 'false') {

        btnVideo.innerHTML = '<i class="fa-solid fa-video"></i>';
        btnVideo.setAttribute("isMuted", true);
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                    video.srcObject = stream;

                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    } else {
        btnVideo.innerHTML = '<i class="fa-solid fa-video-slash"></i>';
        btnVideo.setAttribute("isMuted", false)
        var stream = video.srcObject;
        var tracks = stream.getTracks();

        for (var i = 0; i < tracks.length; i++) {
            var track = tracks[i];
            track.stop();
        }

        video.srcObject = null;
    }

    //console.log(isVideoMuted)
})
var socket = io("localhost:3000/");
// socket.listeners("localhost:3000/" + ROOM_ID, () => {
//     console.log("connected port 3000");
// })
socket.on("mgs-from-server", (data) => {
    ReceiverMessage(data)
})
socket.on("get-id-client", (idClient) => {
    console.log(idClient);
})
socket.emit("sent-id-room", ROOM_ID);
function ReceiverMessage(data) {
    console.log(data.userName)
    let rowsMessage = document.createElement("div");
    rowsMessage.setAttribute("id", "rowsChat")
    let nameCustomer = document.createElement("h4");
    let contentMess = document.createElement("p");
    nameCustomer.innerText = data.userName + ": ";
    rowsMessage.appendChild(nameCustomer);
    contentMess.innerText = data.content;
    rowsMessage.appendChild(contentMess);
    gridChatBox.appendChild(rowsMessage)

}

function SentMessage() {

    if (inputChatElmt.value != null) {
        contentSent = {
            userName: personName,
            content: inputChatElmt.value,
        };
        socket.emit("mgs-from-client", contentSent)
    }
}
inputChatElmt.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        SentMessage();
        inputChatElmt.value = ""
    }
})
btnSentMgs.addEventListener("click", () => {
    SentMessage();
})
//======================= Call Video =======================================
async function getMedia() {
    let stream = null;
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        videoClient.srcObject = stream;
        let myPeer = new Peer(undefined, {
            host: '/',
            port: '3001'
        })
        myPeer.on('open', (id) => {
            const video1 = document.createElement("video");
            socket.emit("sent-id-client", id);
            myPeer.on("call", (call) => {
                call.answer(stream);
                call.on('stream', (stream) => {

                    video1.srcObject = stream;
                    video1.addEventListener('loadedmetadata', () => {
                        video1.play()
                    })

                })
                gridVideoBox.appendChild(video1)
            })
            socket.on("sent-id-caller", (idClient) => {
                console.log(idClient);

                let call = myPeer.call(idClient, stream);
                call.on('stream', (stream) => {

                    video1.srcObject = stream;
                    video1.addEventListener('loadedmetadata', () => {
                        video1.play()
                    })

                })
                gridVideoBox.appendChild(video1)
            })
        })
    } catch (error) {
        console.log(error);
    }
}
getMedia();
// const peers = {}
// function addVideoStream(video, stream) {
//     video.srcObject = stream
//     video.addEventListener('loadedmetadata', () => {
//         video.play()
//     })
//     //videoGrid.append(video)
// }
// function connectToNewUser(userId, stream) {
//     const call = myPeer.call(userId, stream)
//     const video = document.createElement('video')
//     call.on('stream', userVideoStream => {
//         addVideoStream(video, userVideoStream)
//         videoGrid.append(video)
//     })
//     call.on('close', () => {
//         video.remove()
//     })

//     peers[userId] = call
// }
// myPeer.on('open', function (id) {
//     idCaller = id;
//     navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true
//     }).then((stream) => {
//         addVideoStream(video, stream);
//         myPeer.on('call', call => {
//             call.answer(stream);
//             const video = document.createElement("video");
//             call.on("stream", (userVideoStream) => {
//                 addVideoStream(video, userVideoStream);
//             });
//         });
//         socket.on('user-connected', userId => {
//             connectToNewUser(userId, stream)
//         })

//     })
// });

