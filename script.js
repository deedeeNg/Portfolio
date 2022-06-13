//Mouse Circle
const mouseCircle = document.querySelector('.mouse-circle');
const mouseDot = document.querySelector('.mouse-dot');

let mouseCircleBool = true;

const mouseCircleFn =(x,y) =>{
    if(mouseCircleBool){
        mouseCircle.style.cssText= `top:${y}px; left:${x}px; opacity:1`;
    }
    mouseDot.style.cssText= `top:${y}px; left:${x}px; opacity:1`
};
//End of Mouse Circle

//Animated Circle
const circles = document.querySelectorAll(".circle")
const mainImg = document.querySelector(".main-circle img")
;

let mX = 0;
let mY = 0;
const z = 100;
const animateCircles = (e,x,y) =>{

    if(x < mX){
        circles.forEach(circle =>{
            circle.style.left = `${z}px`;
        })
        mainImg.style.left = `${z}px`;
    }else if(x > mX){
        circles.forEach(circle =>{
            circle.style.left = `-${z}px`;
        })
        mainImg.style.left = `-${z}px`;
    }

    if (y < mY){
        circles.forEach(circle =>{
            circle.style.top = `${z}px`;
        })
        mainImg.style.top = `${z}px`;
    }else if(y > mY){
        circles.forEach(circle =>{
            circle.style.top = `-${z}px`;
        })
        mainImg.style.top = `-${z}px`;
    }

    mX = e.clientX;
    mY = e.clientY;

}
//End of Animated Circle

let hoveredElementPosition = [];

const stickyElement = (x, y, hoveredElement) => {
     // Sticky Element
     if (hoveredElement.classList.contains("sticky")){
        hoveredElementPosition.length < 1 &&
            (hoveredElementPosition = [hoveredElement.offsetTop, hoveredElement.offsetLeft]);
        
        hoveredElement.style.cssText = `top: ${y}px; left: ${x}px`;

        if(hoveredElement.offsetTop <= hoveredElementPosition[0] - 100 || hoveredElement.offsetTop >= hoveredElementPosition[0] + 100 || 
            hoveredElement.offsetLeft <= hoveredElementPosition[1] - 100 || hoveredElement.offsetLeft >= hoveredElementPosition[1] + 100){
            hoveredElement.style.cssText = "";
            hoveredElementPosition = [];
        }

        hoveredElement.onmouseleave = () =>{
            hoveredElement.style.cssText = "";
            hoveredElementPosition = [];
        }
    }
    // End of Sticky Element
}

document.body.addEventListener('mousemove',(e)=>{
    let x = e.clientX;
    let y = e.clientY;

    mouseCircleFn(x,y);
    animateCircles(e,x,y);

    const hoveredElement = document.elementFromPoint(x, y);

    stickyElement(x, y,hoveredElement);

    mouseCircleTransform(hoveredElement);
});

// Mouse Circle Transform
const mouseCircleTransform = (hoveredElement) => {
    if(hoveredElement.classList.contains("pointer-center")){
        mouseCircleBool = false;
        hoveredElement.onmousemove = () =>{
            mouseCircle.style.cssText = `width: ${hoveredElement.getBoundingClientRect().width}px;
                                        height: ${hoveredElement.getBoundingClientRect().height}px;
                                        top: ${hoveredElement.getBoundingClientRect().top}px;
                                        left: ${hoveredElement.getBoundingClientRect().left}px;
                                        opacity: 1;
                                        transform: translate(0, 0);
                                        animation: none;
                                        border-radius: ${getComputedStyle(hoveredElement).borderBottomLeftRadius};
                                        transition: width .5s, height .5s, top .5s, left .5s, transform .5s, border-radius .5s;`;
        }
    }

    hoveredElement.onmouseleave = () =>{
        mouseCircleBool =  true;
    }

    document.onscroll = () =>{
        if(!mouseCircleBool){
            mouseCircle.style.top = `${hoveredElement.getBoundingClientRect().top}px`;
        }
    }
}
// End of Mouse Circle Transform

document.body.addEventListener('mouseleave',()=>{
    mouseCircle.style.opacity = '0';
    mouseDot.style.opacity = '0';
});

// Main Button
const mainBtns = document.querySelectorAll('.main-btn');
mainBtns.forEach(btn=>{
    let ripple;

    btn.addEventListener('mouseenter',e=>{
        const left = e.clientX - e.target.getBoundingClientRect().left;
        const top = e.clientY - e.target.getBoundingClientRect().top;
        ripple = document.createElement('div');
        ripple.classList.add("ripple");
        ripple.style.left = `${left}px`
        ripple.style.top = `${top}px`
        btn.prepend(ripple);
    })
    
    btn.addEventListener('mouseleave',()=>{
        btn.removeChild(ripple);
    })
})
// End of main Button

// Progress Bar
const sections = document.querySelectorAll('section');
const progressBar = document.querySelector('.progress-bar');
const halfCircles = document.querySelectorAll('.half-circle');
const halfCircleTop = document.querySelector('.half-circle-top');
const progressBarCircle = document.querySelector('.progress-bar-circle');

const progressBarFunction = () =>{
    
    const pageViewportHeight = window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;
    const scrolledPortion = window.pageYOffset;

    const scrolledPortionDegree = (scrolledPortion / (pageHeight - pageViewportHeight)) * 360;
    halfCircles.forEach((el)=>{
        el.style.transform = `rotate(${scrolledPortionDegree}deg)`
    })

    if (scrolledPortionDegree >= 180){
        halfCircles[0].style.transform = "rotate(180degree)";
        halfCircleTop.style.opacity = "0";
    }else{
        halfCircleTop.style.opacity = "1";
    }

    const scrollBool = scrolledPortion + pageViewportHeight === pageHeight;
    // Progress Bar Click
    progressBar.onclick = e =>{
        e.preventDefault();

        const sectionPositions = Array.from(sections).map(section=>{
            return scrolledPortion + section.getBoundingClientRect().top;
        })
        const position = sectionPositions.find(sectionPosition =>{
            return sectionPosition > scrolledPortion
        })
        scrollBool ? window.scrollTo(0, 0) : window.scrollTo(0, position);
    }
    // End of Progress Bar Click

    // Arrow Rotation
    if(scrollBool){
        progressBarCircle.style.transform = "rotate(180deg)";
    }else{
        progressBarCircle.style.transform = "rotate(0)";
    }
    // End of Arrow Rotation
}
progressBarFunction();
// End of Progress Bar

// Navigation
const menuIcon = document.querySelector('.menu-icon');
const navbar = document.querySelector('.navbar');

document.addEventListener('scroll',()=>{
    menuIcon.classList.add("show-menu-icon");
    navbar.classList.add("hide-navbar");

    if (window.scrollY === 0){
        menuIcon.classList.remove('show-menu-icon');
        navbar.classList.remove("hide-navbar");
    }

    progressBarFunction();
})

menuIcon.addEventListener('click', ()=>{
    menuIcon.classList.remove('show-menu-icon');
    navbar.classList.remove("hide-navbar");
})
// End of Navigation

// About Me Text
const aboutMeText = document.querySelector('.about-me-text');
const aboutMeTextContent = 'Seeking a challenging position in a reputed organization where I can learn new skills, expand my knowledge, and leverage my learnings.';

Array.from(aboutMeTextContent).forEach((char)=>{
    const span = document.createElement('span');
    span.textContent = char;
    aboutMeText.appendChild(span);

    span.addEventListener('mouseenter', (e)=>{
        e.target.style.animation = "aboutMeTextAnimation 10s infinite";
    })
});
// End of About Me Text

// Projects
const container = document.querySelector('.container');
const projects = document.querySelectorAll('.project');
const projectHideBtn = document.querySelector('.project-hide-btn');

projects.forEach((project,i)=>{
    project.addEventListener('mouseenter',()=>{
        project.firstElementChild.style.top = `-${project.firstElementChild.offsetHeight - project.offsetHeight + 20}px`;
    });
    project.addEventListener('mouseleave',()=>{
        project.firstElementChild.style.top = "2rem";
    });
    // Big Project Image
    project.addEventListener('click',()=>{
        const bigImgWrapper = document.createElement('div');
        bigImgWrapper.className = 'project-img-wrapper';
        container.appendChild(bigImgWrapper);

        const bigImg = document.createElement('img');
        bigImg.className = "project-img";
        const imgPath = project.firstElementChild.getAttribute("src").split(".")[0];
        bigImg.setAttribute("src",`${imgPath}-big.jpg`);
        bigImgWrapper.appendChild(bigImg);
        document.body.style.overflowY = "hidden";

        mouseCircle.style.opacity = 0;

        projectHideBtn.classList.add('change');

        projectHideBtn.onclick = () =>{
            projectHideBtn.classList.remove('change');
            bigImgWrapper.remove();
            document.body.style.overflowY = "scroll";
        }

        progressBarFunction();
    })
    // End of Big Project Image

    if (i >= 6){
        project.style.cssText = "display: none; opacity: 0";
    }
    // Projects Button
    const section3 = document.querySelector('.section-3');
    const projectsBtn = document.querySelector('.project-btn');
    const projectsBtnText = document.querySelector('.project-btn span');
    let showHideBool = true;

    const showProjects = (project,i) =>{
        setTimeout(() =>{
            project.style.display = "flex";
            section3.scrollIntoView({block: "end"});
        },600)
    }

    const hideProjects = (project,i) =>{
        setTimeout(()=>{
            project.style.display = "none";
            section3.scrollIntoView({block: "end"});
        },1200)
    }

    projectsBtn.addEventListener('click',(e)=>{
        e.preventDefault();

        projectsBtn.firstElementChild.nextElementSibling.classList.toggle("change");

        projects.forEach((project,i)=>{
            if(i >= 6){
                if(showHideBool){
                    showProjects(project,i);
                    setTimeout(() =>{
                        project.style.opacity = "1";
                    },i * 200)

                    projectsBtnText.textContent = "Show Less";
                }
                else{
                    hideProjects(project,i); 
                    setTimeout(() => {
                        project.style.opacity = "0";
                    }, i * 100);

                    projectsBtnText.textContent = "Show More";
                }
            }
        })
        showHideBool = !showHideBool;
    })
    // End of Projects Button
});
// End of Projects
// Section 4
document.querySelectorAll('.service-btn').forEach(service=>{
    service.addEventListener('click',(e)=>{
        e.preventDefault();

        const serviceText = service.nextElementSibling;
        serviceText.classList.toggle("change");

        const rightPosition = serviceText.classList.contains("change") ? `calc(100% - ${getComputedStyle(service.firstElementChild).width})` : 0;

        service.firstElementChild.style.right = rightPosition;
    })
})
// End of Section 4
// Section 5
// Form
const formHeading = document.querySelector('.form-heading');
const formInputs = document.querySelectorAll('.contact-form-input');

formInputs.forEach(input=>{
    input.addEventListener('focus',()=>{
        formHeading.style.opacity ="0";
        setTimeout(()=>{
            formHeading.textContent = `Your ${input.placeholder}`;
            formHeading.style.opacity = "1";
        },300);
    });
    input.addEventListener('blur',()=>{
        formHeading.style.opacity ="0";
        setTimeout(()=>{
            formHeading.textContent = "Let's Talk";
            formHeading.style.opacity = "1";
        },300);
    })
})
// End of Form
// Slideshow
const slideshow = document.querySelector('.slideshow');
setInterval(()=>{
    const firstIcon = slideshow.firstElementChild;

    firstIcon.classList.add("faded-out");

    const thirdIcon = slideshow.children[3];
    thirdIcon.classList.add("light");
    thirdIcon.previousElementSibling.classList.remove("light");

    setTimeout(()=>{
        slideshow.removeChild(firstIcon);
        slideshow.appendChild(firstIcon);

        setTimeout(()=>{
            firstIcon.classList.remove("faded-out");
        },500)
    },500)

},3000)
// End of Slideshow

// Form Validation
const form = document.querySelector('.contact-form');
const username = document.getElementById('name');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const message = document.getElementById('message');
const messages  = document.querySelectorAll(".message");

const error = (input, message) =>{
    input.nextElementSibling.classList.add("error");
    input.nextElementSibling.textContent = message;
}

const success = (input) =>{
    input.nextElementSibling.classList.remove("error");
}

const checkRequiredFields = (inputArr) =>{
    inputArr.forEach((input) => {
        if(input.value.trim() == ""){
            error(input, `${input.id} is required`)
        }
    })
}

const checkLength = (input, min) =>{
    if(input.value.trim().length < min){
        error(input, `${input.id} must be at least ${min} characters`);
    }else{
        success(input);
    }
}

const checkEmail = (input) =>{
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if(re.test(input.value.trim())){
        success(input)
    }else{
        error(input,"Email is not valid")
    }
}

form.addEventListener("submit", (e) =>{

    checkLength(username, 2);
    checkLength(subject, 2);
    checkLength(message, 10);
    checkEmail(email);
    checkRequiredFields([username,email,subject,message]);

    const notValid = Array.from(messages).find(message =>{
        return message.classList.contains("error");
    })

    notValid && e.preventDefault();
})
// End of Form Validation
// End of Section 5