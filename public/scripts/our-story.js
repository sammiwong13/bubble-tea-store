
//This is for the repeating image code
const imageContainers = document.querySelectorAll('.image-container');
let currentIndex = 0;

function showNextImage() {
    // Remove 'active' class from all images
    imageContainers.forEach(container => {
        container.classList.remove('active');
    });

    // Add 'active' class to the current image
    imageContainers[currentIndex].classList.add('active');

    // Move to the next image
    currentIndex = (currentIndex + 1) % imageContainers.length;
}

// Set an interval to call the showNextImage function every 2000 milliseconds (2 seconds)
setInterval(showNextImage, 2000);

//This is for async/await
async function myDisplay() {
    let myPromise = new Promise(function (resolve) {
        setTimeout(function () { resolve("Thank you for visiting the website, we hope that you had a great experience shopping. Goboba!"); }, 3000);
    });
    document.getElementById("thank-you").innerHTML = await myPromise;
}

myDisplay();