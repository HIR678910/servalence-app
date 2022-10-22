video ="";
status = "";
objects = [];

function preload()
{
    video = createVideo('video.mp4');
    video.hide();
}

function setup()
{
    canvas = createCanvas(480,380);
    canvas.center();
}

function draw()
{
    image(video, 0, 0, 480, 380);
    if(status !="")
    {
      objectDetector.detect(video, gotResults);
    for(i = 0; i < objects.length; i++)
    {
        document.getElementById("status").innerHTML = "Status : Objects Detected";
        document.getElementById("no_of_obj").innerHTML = " Number of objects detected are : "+ objects.lenght;
        fill("#f27949");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill()
        stroke("#f27949");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
    }
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = " Status: Detecting Objects";
}

function modelloaded()
{
        console.log("Model Loaded!");
        status = true;
        video.loop();
        video.speed(1);
        video.volume(0);
    
}

function gotResults(error, results)
{
    if(error)
    {
      console.log(error);
    }
    console.log(results);
    objects = results;
}