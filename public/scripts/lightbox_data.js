// Title of the slideshow
let lightboxTitle = "Our Valuable Customer Image";

// Names of the image files shown in the slideshow
let imgFiles = [
    "../images/lightbox-1.jpg",
    "../images/lightbox-2.jpg",
    "../images/lightbox-3.jpg",
    "../images/lightbox-4.jpg",
    "../images/lightbox-5.jpg",
    "../images/lightbox-6.jpg"
];

// Captions associated with each image
let imgCaptions = new Array(6);
imgCaptions[0] = "Bubble Tea late at night by the road";
imgCaptions[1] = "Jumbo size bubble tea";
imgCaptions[2] = "Milk tea with brown sugar";
imgCaptions[3] = "Drinking bubble tea late at the Night Market";
imgCaptions[4] = "Holding an extra large bubble tea";
imgCaptions[5] = "Drinking bubble tea at my favorite spot";

// Count of images in the slideshow
let imgCount = imgFiles.length;

// Lightbox Container
let lightBox;

// Function to move forward through the image list
function showNext() {
    lbImages.appendChild(lbImages.firstElementChild);
    currentImg = (currentImg < imgCount) ? currentImg++ : currentImg = 1;
    lbCounter.textContent = currentImg + " / " + imgCount;
}

// Function to move backward through the image list
function showPrev() {
    lbImages.insertBefore(lbImages.lastElementChild, lbImages.firstElementChild);
    (currentImg > 1) ? currentImg-- : currentImg = imgCount;
    lbCounter.textContent = currentImg + " / " + imgCount;
}

// Function to create the lightbox
function createLightbox() {
    // Lightbox Container
    lightBox = document.getElementById("lightbox");

    // Parts of the lightbox
    let lbTitle = document.createElement("h1");
    let lbPrev = document.createElement("div");
    let lbNext = document.createElement("div");
    let lbPlay = document.createElement("div");
    let lbImages = document.createElement("div");
    let control = document.createElement("div");
    control.setAttribute("id", "lightbox-control");

    // Design the lightbox title
    lightBox.appendChild(lbTitle);
    lbTitle.id = "lbTitle";
    lbTitle.textContent = lightboxTitle;

    lightBox.appendChild(control);

    // Design the lightbox previous slide button
    control.appendChild(lbPrev);
    lbPrev.id = "lbPrev";
    lbPrev.innerHTML = "&#9664;";
    lbPrev.onclick = showPrev;

    // Design the lightbox next slide button
    control.appendChild(lbNext);
    lbNext.id = "lbNext";
    lbNext.innerHTML = "&#9654;";
    lbNext.onclick = showNext;

    // Design the lightbox Play-Pause button
    control.appendChild(lbPlay);
    lbPlay.setAttribute("id", "lightbox-play");
    lbPlay.id = "lbPlay";
    lbPlay.innerHTML = "&#9199";

    var intervalId; // Declare a variable to store the interval ID

    lbPlay.onclick = function () {
        // Check if the interval is already running
        if (intervalId) {
            // If running, stop the interval
            clearInterval(intervalId);
            intervalId = null; // Reset the interval ID
        } else {
            // If not running, start the interval
            intervalId = window.setInterval(showNext, 2000);
        }
    };

    // Design the lightbox images container
    lightBox.appendChild(lbImages);
    lbImages.setAttribute("class", "lightbox-image");
    lbImages.id = "lbImages";

    // Add images from the imgFiles array to the container
    for (let i = 0; i < imgCount; i++) {
        let image = document.createElement("img");
        image.setAttribute("width", "220px");
        image.setAttribute("height", "120px");
        image.src = imgFiles[i];
        image.alt = imgCaptions[i];
        lbImages.appendChild(image);
    }
}

window.addEventListener("load", createLightbox);
