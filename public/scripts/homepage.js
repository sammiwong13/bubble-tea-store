//Navigation Bar from Brad Traversy Videeo
const nav = document.querySelector('.nav')
window.addEventListener('scroll', fixNav)

function fixNav() {
    if (window.scrollY > nav.offsetHeight + 150) {
        nav.classList.add('active')
    } else {
        nav.classList.remove('active')
    }
}

//Testimonial from Brad Traversy
const testimonialsContainer = document.querySelector('.testimonials-container')
const testimonial = document.querySelector('.testimonial')
const userImage = document.querySelector('.user-image')
const username = document.querySelector('.username')
const role = document.querySelector('.role')

const testimonials = [
    {
        name: 'Miyah Myles',
        position: 'Customer',
        photo:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6',
        text:
            'Cheapest store around New York City with the best tapiocas.'
    },
    {
        name: 'June Cha',
        position: 'Customer',
        photo: 'https://randomuser.me/api/portraits/women/44.jpg',
        text:
            'Greatest quantity coming in extra, extra, extra large.'
    },
    {
        name: 'Iida Niskanen',
        position: 'Customer',
        photo: 'https://randomuser.me/api/portraits/women/68.jpg',
        text:
            'My favorite bubble tea store with a variety of flavors.'
    },
    {
        name: 'Renee Sims',
        position: 'Customer',
        photo: 'https://randomuser.me/api/portraits/women/65.jpg',
        text:
            'Greatest employees with the best customer service.'
    },
    {
        name: 'Jonathan Nunfiez',
        position: 'Customer',
        photo: 'https://randomuser.me/api/portraits/men/43.jpg',
        text:
            'My family and I order drinks here every day and were never sick of it.'
    },
    {
        name: 'Sasha Ho',
        position: 'Customer',
        photo:
            'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?h=350&auto=compress&cs=tinysrgb',
        text:
            'The best drink store in town.'
    },
    {
        name: 'Veeti Seppanen',
        position: 'Customer',
        photo: 'https://randomuser.me/api/portraits/men/97.jpg',
        text:
            'I love all the drinks here!'
    },
]

let idx = 1

function updateTestimonial() {
    const { name, position, photo, text } = testimonials[idx]

    testimonial.innerHTML = text
    userImage.src = photo
    username.innerHTML = name
    role.innerHTML = position

    idx++

    if (idx > testimonials.length - 1) {
        idx = 0
    }
}

setInterval(updateTestimonial, 10000)

//Scroll animation brad traversy
const boxes = document.querySelectorAll('.box')

window.addEventListener('scroll', checkBoxes)

checkBoxes()

function checkBoxes() {
    const triggerBottom = window.innerHeight / 5 * 4

    boxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top

        if (boxTop < triggerBottom) {
            box.classList.add('show')
        } else {
            box.classList.remove('show')
        }
    })
}

//This is for async/await
async function myDisplay() {
    let myPromise = new Promise(function (resolve) {
        setTimeout(function () { resolve("Best bubble tea store established in New York City since 1970"); }, 3000);
    });
    document.getElementById("title-info").innerHTML = await myPromise;
}

myDisplay();