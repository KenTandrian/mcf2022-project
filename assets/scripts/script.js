/* SMOOTH SCROLLING */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

/* SCROLL BACK TO TOP BUTTON */
scrollBtn = document.getElementById("scroll");

window.onscroll = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
}

/* TYPEWRITER EFFECT - HEADER SECTION */
let messageIdx = 0;

const changeTxt = (typewriter) => {
  // Remove existing animation style
  typewriter.style.animation = 'none'
  typewriter.style.webkitAnimation = 'none';

  // Set the new text and speed
  typewriter.innerHTML = messagesData[messageIdx];
  speed = 3.5 * messagesData[messageIdx].length / 50; 

  // Set the type-out animation
  typewriter.style.animation = 'type-out '+ speed +'s steps(20, end) forwards, blink .75s step-end infinite'; 
  typewriter.style.webkitAnimation = 'type-out '+ speed +'s steps(20, end) forwards, blink .75s step-end infinite'; 

  // Set the 'type-out' class
  if(typewriter.classList.contains('removed')) typewriter.classList.remove('removed');
  typewriter.classList.add('type-out');
}

const removeTxt = (typewriter) => {
  setTimeout(() => { 
    // The speed of removing is twice that of typing out
    speed = 3.5 * typewriter.innerHTML.length / 100; 

    // Set the remove-type animation
    typewriter.style.animation = 'remove-type '+ speed +'s steps(20, end) forwards, blink .75s step-end infinite'; 
    typewriter.style.webkitAnimation = 'remove-type '+ speed +'s steps(20, end) forwards, blink .75s step-end infinite'; 

    // Set the 'removed' class
    typewriter.classList.remove('type-out');
    typewriter.classList.add('removed');

    // Change message index
    if (messageIdx === messagesData.length - 1) messageIdx = 0
    else messageIdx += 1;
  }, 1000); // delay 1s before removing
}

const handleTypingEnd = (event) => {
  let typewriter = event.target;
  (typewriter.classList.contains('type-out')) ? removeTxt(typewriter) : changeTxt(typewriter);
}

// Typewriter: Initial Render
changeTxt(document.getElementById("typewriter"));

// Listen to changes
document.getElementById("header-sub").addEventListener("animationEnd", handleTypingEnd); // standard
document.getElementById("header-sub").addEventListener("webkitAnimationEnd", handleTypingEnd); // for Chrome, Safari and Opera

// Render Events
let eventsBox = document.getElementsByClassName('events-content-box')[0];
const renderEvents = (data) => {
  data.forEach(({ name, speaker, position, image, date, time, price}) => {
    let row = document.createElement('div');
    row.classList.add('card-vertical');

    row.innerHTML = `
      <div class="card-img" style="background-image: url(./assets/images/${image});">&nbsp;</div>
        <div class="card-content">
          <h3 class="card-heading">${name}</h3>
          <div class="card-speaker-box">
              <p class="card-desc">${speaker}</p>
              <p class="card-pos">${position}</p>
          </div>
          <div class="card-icon-box">
              <ion-icon class='card-icon' name="calendar-outline"></ion-icon><p class="card-icon-text">${date}</p>
          </div>
          <div class="card-icon-box">
              <ion-icon class='card-icon' name="time-outline"></ion-icon><p class="card-icon-text">${time}</p>
          </div>
          <div class="card-icon-box">
              <ion-icon class='card-icon' name="pricetags-outline"></ion-icon><p class="card-icon-text">Rp${price}</p>
          </div>
        </div>
      </div>
    `;

    eventsBox.appendChild(row);
  });
}
renderEvents(eventsData);

// Render Companies
let companiesBox = document.getElementsByClassName('companies-content-box')[0];
const renderCompanies = (data) => {
  data.forEach(({ name, logo, subject }) => {
    let row = document.createElement('div');
    row.classList.add('card-horizontal');

    row.innerHTML = `
      <div class="card-comp-logos" style="background-image: url('./assets/logos/${logo}');">&nbsp;</div>
      <div class="card-content">
        <h3 class="card-heading">${name}</h3>
        <p class="card-desc">${subject}</p>
      </div>
    `;

    companiesBox.appendChild(row);
  });
}
renderCompanies(companiesData);