// Array of image paths
const images = [
    'images/image1.jpg', 'images/image2.jpg', 'images/image3.jpg', 'images/image4.jpg', 'images/image5.jpg', 'images/image6.jpg', 'images/image7.jpg', 'images/image8.jpg', 'images/image9.jpg'
];

let currentImageIndex = 0;
const slideshow = document.getElementById('slideshow');

// Function to display the next image
function nextSlide() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    slideshow.src = images[currentImageIndex];
}

// Function to display the previous image
function prevSlide() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    slideshow.src = images[currentImageIndex];
}

