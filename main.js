song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;


function preload() {
    song1 = loadSound("Fix_You.mp3");
    song2 = loadSound("Yellow.mp3");
}

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

}

function modelLoaded() {
    console.log("PoseNet Is Initialized!! ✅");
    }

    function gotPoses(results) {
        if(results.length > 0) {
            console.log(results);
            scoreLeftWrist = results[0].pose.keypoints[9].score;
            scoreRightWrist = results[0].pose.keypoints[10].score;
            console.log("scoreLeftWrist = " + scoreLeftWrist);
            console.log("scoreRightWrist = " + scoreRightWrist);
    
            leftWristX = results[0].pose.leftWrist.x;
            leftWristY = results[0].pose.leftWrist.y;
            console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
    
            rightWristX = results[0].pose.rightWrist.x;
            rightWristY = results[0].pose.rightWrist.y;
            console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
        }
    }

    function draw() {
        image(video, 0, 0, 600, 500);

        fill("#CCEEFF");
        stroke("#CCEEFF");

        if(scoreLeftWrist > 0.2) { 
            circle(leftWristX, leftWristY, 20);

            song2.stop();

            if(song1.play() == "false") { 
                
    
                song1.play();
                document.getElementById("name").innerHTML = "Fix You";
            }
        }
        if(scoreRightWrist > 0.2) { 
            circle(rightWristX, rightWristY, 20);

            song1.stop();

            if(song2.play() == "false") { 
               
    
                song2.play();
                document.getElementById("name").innerHTML = "Yellow";
            }
        }
        }
        
