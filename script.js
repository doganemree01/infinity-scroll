import { apiKey } from "./apikey.js";

const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// helper Function to set Attributes on DOM Elements
function setAttributes(element, attributes){
    for( const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

// create elements for links & photos, add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function forEach object in photosArray
    photosArray.forEach((photo)=>{
        // create <a> to link to unsplash
        const item = document.createElement("a");
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank",
        });
        // create <img> for photo
        const img = document.createElement("img");
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // evetlistener, check when each is finished loading
        img.addEventListener("load", imageLoaded);
        // put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}

// unsplash api
const count = 30 ;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count};`

// check is all images were loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready= true;
        loader.hidden= true;
    }
}

async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch(err){
        console.log(err)
        // catch err here 
    }

}

//Check to see if scrolling near bottom of page, load More Photos
window.addEventListener("scroll", ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready= false;
        getPhotos();        
    }
})

getPhotos();