window.onload = function(){
    let preloader = document.getElementById('preloader');
    preloader.style.display='none';
}
const imgs = document.querySelectorAll('.image');
const modal = document.querySelector('.modal');
const activeImage = document.querySelector('#active-image');
const overlay = document.querySelector('.overlay');
const closeIcon = document.querySelector('#close'); 

class MyGallery extends HTMLElement {
    constructor() {
        super()

        const div = document.createElement("div");
        const shadow = this.attachShadow({ mode: "open" });
        
        shadow.appendChild(div);
        div.setAttribute("id", "image-gallery");
        const style = document.createElement("style");
        style.innerHTML = `
        #image-gallery
        {
            margin-top: 20px;
            display: grid;
            grid-template-columns: 1fr 1fr  ;
            grid-gap: 5px;  

        }
        
        #image-gallery div
        {
            width: 500px;
            height: 500px;
            margin: 5px;
            display: flex;
            overflow: hidden;
            align-items: center;
            justify-content: center;
        }
        
        #image-gallery div#fullscreen
        {
            position: absolute;
            height: 100%;
            width: 100%;
            transition: all .5s ease-out;
            z-index: 3;
        }
        #image-gallery div1#fullscreen{
            position: absolute;
            filter: grayscale(100%);
            opacity: 0.5;
            z-index: 1;
        }`;

        shadow.appendChild(style);
        if (this.hasAttribute("Photo-list")) {
            let piclist = this.getAttribute("Photo-list").split(';');
            for (let i of piclist) {
                const element = document.createElement("div");
                element.setAttribute("onclick", "print(this)");
                const pic = document.createElement("img");
                pic.setAttribute("onerror", "this.src = 'resourses/error.png'")
                pic.setAttribute("onload", "displayImage(this)")
                pic.setAttribute("src", i);
                element.appendChild(pic);
                div.appendChild(element);
                displayImage;
            }
        }
    }
}


imgs.forEach(img => img.addEventListener('click', displayImage));

function displayImage(e){

    activeImage.src=e.target.src;
    modal.style.display='block';
    overlay.style.display='block';
}
closeIcon.addEventListener('click',closeImage);
function closeImage(){
    modal.style.display='none';
    overlay.style.display='none';
} 
overlay.addEventListener('click',closeByOverlay);
function closeByOverlay(){
    modal.style.display='none';
    overlay.style.display='none';
} 

const next= document.querySelector('#right').addEventListener('click',nextImage);
function nextImage(){
    for (var i=0; i<imgs.length; i++){
        if(activeImage.src === imgs[i].src){
            var nextImageVar = imgs[i].nextElementSibling;
        }
    }
    if(nextImageVar === null){
        activeImage.src = imgs[0].src;
    }
    else{
        activeImage.src=nextImageVar.src
    }
}
const previous= document.querySelector('#left').addEventListener('click',previousImage)
function previousImage(){
    for (var i=0; i<imgs.length; i++){
        if(activeImage.src === imgs[i].src){
            var nextImageVar = imgs[i].previousElementSibling;
        }
    }
    if(nextImageVar === null){
        activeImage.src = imgs[imgs.length - 1].src;
    }
    else{
        activeImage.src=nextImageVar.src
    }
}
customElements.define("my-gallery", MyGallery);

let full = false;
let gallerystyle = '';
function print(pic) {
    if (!full) {
        full = true;
        pic.setAttribute("id", "fullscreen");
        gallerystyle = pic.firstChild.getAttribute("style");
        pic.firstChild.setAttribute("style", "height:95vh;");
    } else {
        pic.setAttribute("id", "");
        pic.firstChild.setAttribute("style", gallerystyle);
        full = false;
    }
}
