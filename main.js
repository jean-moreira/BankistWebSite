"use strict";

const btnsOpenModal = document.querySelectorAll(".btn__open--modal");
const btnsCloseModal = document.querySelectorAll(".btn__close--modal");
const selectorModal = document.querySelector(".modal");
const selectorOverlay = document.querySelector(".overlay");
const btnLearnMore = document.querySelector(".btn__learnMore");
const section1 = document.getElementById("section--1");
const section2 = document.getElementById("section--2");
const section3 = document.getElementById("section--3");
const selectorLinks = document.querySelector(".nav__links");
// section 2
const selectorTabBtnAllDiv = document.querySelector(".btns__tabbed");
const selectorTabs = document.querySelectorAll(".btn__tab");
const selectorTabsContent = document.querySelectorAll(".tab");
const selectorNav = document.querySelector("nav");
// section 3
const selectorSlides = document.querySelectorAll(".slide");
const btnSlideLeft = document.querySelector(".slider__btn--left");
const btnSlideRight = document.querySelector(".slider__btn--right");
const selectorSlider = document.querySelector(".slider");
const selectorDotDiv = document.querySelector(".dots");
// get height of navbar for when adding fixed postion
const navHeight = selectorNav.getBoundingClientRect().height;
const header = document.querySelector("header");
// selector for effect when viewport change
const selectorAllSections = document.querySelectorAll(".section");
const selectorFooter = document.querySelector("footer");
const imgTarget = document.querySelectorAll(".img__beside");
// overlay

const openModal = function () {
  selectorOverlay.classList.remove("hidden");
  selectorModal.classList.remove("hidden");
};

const closeModal = function () {
  selectorOverlay.classList.add("hidden");
  selectorModal.classList.add("hidden");
};

btnsOpenModal.forEach((element) => {
  element.addEventListener("click", openModal);
});

btnsCloseModal.forEach((element) => {
  element.addEventListener("click", closeModal);
});

selectorOverlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (event) {
  if (event.key == "Escape" && !selectorModal.classList.contains("hidden")) {
    closeModal();
  }
});

btnLearnMore.addEventListener("click", function (event) {
  section1.scrollIntoView({ behavior: "smooth" });
});

// adding scrollView to the nav header
selectorLinks.addEventListener("click", function (event) {
  event.preventDefault();
  //   get where it's suppose to move you
  const hrefId = event.target.getAttribute("href");

  //   make function return if click elsewhere
  if (hrefId === null) return;

  document.querySelector(hrefId).scrollIntoView({ behavior: "smooth" });
});

// tabbed component section 2 :

selectorTabBtnAllDiv.addEventListener("click", function (event) {
  // make sure if click on span element it still works
  const target = event.target.closest(".btn__tab");

  //   make sur click on a target
  if (!target) return;

  selectorTabs.forEach((tab) => tab.classList.remove("btn__tab--active"));
  target.classList.add("btn__tab--active");

  //   get the number we want for tabs
  const activeNumber = target.dataset.number;

  selectorTabsContent.forEach(function (tabContent) {
    tabContent.classList.remove("tab--active");
    if (!tabContent.classList.contains("tabHidden")) {
      tabContent.classList.add("tabHidden");
    }
  });
  //   add active class and remove tab class (that makes it invisible)
  document.querySelector(`.tab--${activeNumber}`).classList.add("tab--active");
  document.querySelector(`.tab--${activeNumber}`).classList.remove("tabHidden");
});

selectorNav.addEventListener("mouseover", function (event) {
  // only keep mouse on actual elements
  if (event.target.classList.contains("nav__link")) {
    //   get siblings of target : getting to parents and then all his childrens
    const siblings = event.target.closest("nav").querySelectorAll(".nav__link");
    const target = event.target;
    // sort the one NOT hovered over
    siblings.forEach((sib) => {
      if (sib !== event.target) {
        sib.style.opacity = 0.4;
      }
    });
    // Same for the image =
    document.querySelector(".nav__img__box").style.opacity = 0.4;
  }
});

selectorNav.addEventListener("mouseout", function (event) {
  // only keep mouse on actual elements
  if (event.target.classList.contains("nav__link")) {
    //   get siblings of target : getting to parents and then all his childrens
    const siblings = event.target.closest("nav").querySelectorAll(".nav__link");

    // sort the one NOT hovered over
    siblings.forEach((sib) => {
      if (sib !== event.target) {
        sib.style.opacity = 1;
      }
    });
    // Same for the image =
    document.querySelector(".nav__img__box").style.opacity = 1;
  }
});

// slider section 3 /////

let currentSlide = 0;
const maxSlide = selectorSlides.length;

// create the dot depending on slide number :

const dotBuilder = function () {
  selectorSlides.forEach(function (slide, index) {
    selectorDotDiv.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slideNumber="${index}"></button>`
    );
  });
};
dotBuilder();

const activeDot = function (slide) {
  // select all the new dot and remove active status to make sure only one is ever selected each click

  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  // get the active dot matching the current slide :

  document
    .querySelector(`.dots__dot[data-slideNumber="${slide}"]`)
    .classList.add("dots__dot--active");
};
activeDot(0);

// make the slide move left to right with translateX (it make current slide always be at 0%)

const goSlide = function (slide) {
  selectorSlides.forEach((s, index) => {
    s.style.transform = `translateX(${100 * (index - slide)}%)`;
  });
};
goSlide(0);

// call the function to actualise slide and dots for the event listener
const nextSlide = function () {
  // if you are at the last, comeback at the first
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goSlide(currentSlide);
  activeDot(currentSlide);
};

const previousSlide = function () {
  // if you go left while at the first, get at the back
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }
  goSlide(currentSlide);
  activeDot(currentSlide);
};

btnSlideLeft.addEventListener("click", previousSlide);
btnSlideRight.addEventListener("click", nextSlide);

// adding eventListener on the dots :

selectorDotDiv.addEventListener("click", function (event) {
  event.preventDefault();
  if (!event.target.classList.contains("dots__dot")) return;
  const dotClicked = event.target.getAttribute("data-slidenumber");
  goSlide(dotClicked);
  activeDot(dotClicked);
});

// NAVBAR FIXED POSITION WHEN SCROLLING

const stickyNavigation = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) selectorNav.classList.add("sticky");
  else selectorNav.classList.remove("sticky");
};
const headerObserver = new IntersectionObserver(stickyNavigation, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// REVEAL ELEMENTS AS WE SCROLL DOWN

const revealScroll = function (entries, observer) {
  const [entry] = entries;

  //   entry.target to see which section is concerned
  if (entry.isIntersecting) {
    entry.target.classList.remove("section--hidden");
    // then unobserve it to avoid having it jump all the time
    observer.unobserve(entry.target);
  } else {
    entry.target.classList.add("section--hidden");
  }
};

const sectionObserver = new IntersectionObserver(revealScroll, {
  root: null,
  threshold: 0.2,
  rootMargin: `100px`,
});

// make the observer work for all section individually
selectorAllSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

const revealImg = function (entries, observer) {
  const [entry] = entries;

  //   entry.target to see which section is concerned
  if (entry.isIntersecting) {
    entry.target.classList.remove("img__blur");
  } else {
    entry.target.classList.add("img__blur");
  }
};

const imgObserver = new IntersectionObserver(revealImg, {
  root: null,
  threshold: 0.2,
});

// make the observer work for all img individually
imgTarget.forEach((section) => {
  imgObserver.observe(section);
});
