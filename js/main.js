// options implementation
let appOptions = document.querySelector(".app-options");
let optionsIcon = document.querySelector(".options-icon");
// open and close the options menu
optionsIcon.onclick = function () {
  appOptions.classList.toggle("open");
  optionsIcon.querySelector(".fa-gear").classList.toggle("rotate");
};
// check if the option saved on localStorage
let colors = document.querySelectorAll(
  ".options-container .option-box.color ul li"
);
if (localStorage.getItem("color_option")) {
  selectedColor = localStorage.getItem("color_option");
  colors.forEach((ele) => ele.classList.remove("active"));
  document
    .querySelector(`li[data-color="${selectedColor}"]`)
    .classList.add("active");
  document.documentElement.style.setProperty("--main-color", selectedColor);
}

// color option toggling
colors.forEach((color) => {
  color.style.backgroundColor = color.dataset.color;
  // method 1
  // color.onclick = function () {
  //   colors.forEach((color) => {
  //     color.classList.remove("active");
  //   });
  //   this.classList.add("active");
  //   document.documentElement.style.setProperty(
  //     "--main-color",
  //     this.dataset.color
  //   );
  // };
  // method 2
  color.onclick = function (e) {
    e.target.parentElement.querySelectorAll("li.active").forEach((ele) => {
      ele.classList.remove("active");
    });
    e.target.classList.add("active");
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    //add to localStorage
    localStorage.setItem("color_option", e.target.dataset.color);
  };
});
// random background implementaion
let landingPage = document.querySelector(".landing-page");
let randomBackInterval;
let staticBack;
function randomBackFunc() {
  if (randomBack) {
    randomBackInterval = setInterval(() => {
      landingPage.style.backgroundImage = `url("./imgs/${Math.ceil(
        Math.random() * 5
      )}.webp")`;
    }, 4000);
  } else {
    clearInterval(randomBackInterval);
  }
}
let randomBack = true;
// case we have data in local storage
if (localStorage.getItem("random_back_option")) {
  let option = JSON.parse(localStorage.getItem("random_back_option"));
  if (option.randomBack) {
    randomBack = true;
    randomBackFunc();
  } else {
    randomBack = false;
    randomBackFunc();
    landingPage.style.backgroundImage = option.staticBack;
  }
  // randomBackFunc();
  // case we dont have data in local storage
} else {
  randomBack = true;
  randomBackFunc();
}

// random background toggling

let backgroundToggler = document.querySelector(
  ".options-container .option-box.background .options .toggler"
);
// removing class active if random back is false
if (!randomBack) {
  backgroundToggler.classList.remove("active");
}

backgroundToggler.onclick = function () {
  backgroundToggler.classList.toggle("active");
  randomBack = !randomBack;
  randomBackFunc();
  if (!randomBack) {
    staticBack = landingPage.style.backgroundImage;
  }
  localStorage.setItem(
    "random_back_option",
    JSON.stringify({ randomBack: randomBack, staticBack: staticBack })
  );
};
// removing or keeping bullets
let bulletsContainer = document.querySelector(".bullets");
let bulletsToggler = document.querySelector(
  ".options-container .option-box.bulletss .options .toggler"
);
let localBullets = JSON.parse(localStorage.getItem("bullets_option"));

if (localBullets !== null) {
  if (localBullets === true) {
    bulletsContainer.style.display = "flex";
  } else {
    bulletsContainer.style.display = "none";
    bulletsToggler.classList.remove("active");
  }
}
bulletsToggler.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("active");
  if (this.classList.contains("active")) {
    bulletsContainer.style.display = "flex";
    localStorage.setItem("bullets_option", JSON.stringify(true));
  } else {
    bulletsContainer.style.display = "none";
    localStorage.setItem("bullets_option", JSON.stringify(false));
  }
};
// reset otions
document.querySelector(".reset-options").onclick = function () {
  localStorage.clear();
  window.location.reload();
};
let contentEle = document.querySelector(".content");
// fill skills progress bars on scroll
let skills = document.querySelector(".skills");
let skillsProgresses = document.querySelectorAll(
  ".skills .skill-progress-container .skill-progress"
);
let allIncreased = false;
let active = false;
function fillSkills() {
  // console.log("scrolling");
  // let skillsOffsetTop = skills.offsetTop;
  // // console.log("skillsOffsetTop :", skillsOffsetTop);
  // //
  // let skillsHeight = skills.offsetHeight;
  // // console.log("skillsHeight :", skillsHeight);
  // //
  // let windowHeight = this.innerHeight;
  // // console.log("windowHeight :", windowHeight);
  // //
  // let windowScrollY = this.scrollY;
  // // console.log("windowScrollY :", windowScrollY);
  // //
  // // console.log(skillsOffsetTop + skillsHeight - windowHeight);
  // // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@");
  let skillsOffsetTop = skills.offsetTop;
  // console.log("skillsOffsetTop :", skillsOffsetTop);
  //
  let skillsHeight = skills.offsetHeight;
  // console.log("skillsHeight :", skillsHeight);
  //
  let contentEleheight = contentEle.offsetHeight;
  // console.log("windowHeight :", windowHeight);
  //
  let contentEleScrolly = contentEle.scrollTop;
  // console.log("windowScrollY :", windowScrollY);
  //
  // console.log(skillsOffsetTop + skillsHeight - windowHeight);
  // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@");

  if (
    contentEleScrolly >
    skillsOffsetTop + skillsHeight - contentEleheight - 100
  ) {
    if (!active) {
      active = true;
      skillsProgresses.forEach((progress, key) => {
        // console.log(key);
        setTimeout(() => {
          progress.style.width = progress.dataset.progress;
          if (key == skillsProgresses.length - 1) {
            allIncreased = true;
          }
        }, 80 * (key + 1));
        // progress.style.width = progress.dataset.progress;
      });
    }
    // console.log(allIncreased);
  } else {
    active = false;
    if (allIncreased) {
      skillsProgresses.forEach((progress, key) => {
        progress.style.width = 0;
        if (key == skillsProgresses.length - 1) {
          allIncreased = false;
        }
      });
      // allIncreased = false;
    }
  }
}
fillSkills();
// window.onscroll = fillSkills;

contentEle.addEventListener("scroll", fillSkills);
// window.onloadstart = fillSkills;
// image gallary
let images = document.querySelectorAll(".gallary .images .image img");

images.forEach((image) => {
  image.onclick = function () {
    // prevent scroll
    // document.body.style.overflow = "hidden";
    contentEle.style.overflow = "hidden";
    // create overlay for my popup
    let overlay = document.createElement("div");
    overlay.classList.add("popup-overlay");
    // create popup box
    let popupBox = document.createElement("div");
    popupBox.classList.add("popup-box");
    // add the image
    let popupImage = document.createElement("img");
    popupImage.src = image.src;
    popupImage.className = "popup-image";
    popupBox.append(popupImage);
    // add the title if exists
    if (image.alt) {
      let popupTitle = document.createElement("h2");
      popupTitle.innerText = image.alt;
      popupTitle.className = "popup-title";
      popupBox.prepend(popupTitle);
    }
    // adding close btn
    popupClose = document.createElement("div");
    popupClose.innerText = "X";
    popupClose.className = "popup-close";
    popupBox.append(popupClose);

    overlay.append(popupBox);
    contentEle.append(overlay);

    // adding close btn functionality
    // document.querySelector(".popup-close").onclick = function () {
    //   document.querySelector(".popup-overlay").remove();
    // };

    // closing
    // close when click outside the popup or the close btn
    document.querySelector(".popup-overlay").onclick = function (e) {
      if (
        e.target !== document.querySelector(".popup-box") &&
        e.target !== document.querySelector(".popup-image") &&
        e.target !== document.querySelector(".popup-title")
      ) {
        document.querySelector(".popup-overlay").remove();
        // return scroll
        contentEle.style.overflow = "auto";
      }
    };
  };
});

// scroll to section functionality

function scrollToSection(links) {
  links.forEach((link) => {
    link.onclick = function (e) {
      e.preventDefault();
      // console.log(document.querySelector(this.dataset.view).offsetTop);
      document.querySelector(this.dataset.view).scrollIntoView({
        behavior: "smooth",
        padding: 70,
      });
    };
  });
}
// bullets functionality
let bullets = document.querySelectorAll(".bullets .bullet");
scrollToSection(bullets);
// navlinks mobile menu functionality
let navLinks = document.querySelectorAll("ul li a");

scrollToSection(navLinks);
// making header colored onscrolling
// and show header onscrolling up
let currentScroll;
let showHeader;
let header = document.querySelector(".landing-page .overlay header");
function colorTheHeader() {
  if (contentEle.scrollTop > 70.25) {
    if (!header.classList.contains("colored-back")) {
      header.classList.add("colored-back");
    }
    if (currentScroll < contentEle.scrollTop) {
      header.classList.add("go-up");
      // console.log("down");
    } else {
      header.classList.remove("go-up");
      // console.log("up");
    }
    currentScroll = contentEle.scrollTop;
  } else {
    header.classList.remove("colored-back");
    header.classList.remove("go-up");
  }
}
colorTheHeader();
contentEle.addEventListener("scroll", colorTheHeader);

let allSections = document.querySelectorAll("section:not(.contact-us)");
function detectWhichsection() {
  let res = Array.from(allSections).filter(
    (ele) => ele.offsetTop < contentEle.scrollTop + 165
  );
  if (res.length) {
    let currentEle = res[res.length - 1];
    currentEle.parentElement.querySelectorAll("section").forEach((ele) => {
      document
        .querySelectorAll(`[data-view=".${ele.classList[0]}"]`)
        .forEach((ele) => ele.classList.remove("active"));
    });
    document
      .querySelectorAll(`[data-view=".${currentEle.classList[0]}"]`)
      .forEach((ele) => ele.classList.add("active"));
  } else {
    document
      .querySelectorAll(`[data-view]`)
      .forEach((ele) => ele.classList.remove("active"));
  }
}
detectWhichsection();
contentEle.addEventListener("scroll", detectWhichsection);
// toggling mobile menu
let mobileMenuIcon = document.querySelector(".mobile-menu-icon");
mobileMenuIcon.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("active");
  document.body.classList.toggle("mobile-menu-active");
  if (this.classList.contains("active")) {
    header.classList.add("colored-back");
    // dont wanna lose the header which x icon to close the menu
    contentEle.removeEventListener("scroll", colorTheHeader);
    // because now the overflow hidden no scroll it will be zero width
    editHeaderWidthAndBullets();
  } else {
    contentEle.addEventListener("scroll", colorTheHeader);
    editHeaderWidthAndBullets();
  }
};

function closeTheMenu() {
  if (document.body.classList.contains("mobile-menu-active")) {
    mobileMenuIcon.classList.remove("active");
    document.body.classList.remove("mobile-menu-active");
    contentEle.addEventListener("scroll", colorTheHeader);
    editHeaderWidthAndBullets();
  }
}
document.querySelector(".mobile-menu").onclick = closeTheMenu;
contentEle.addEventListener("click", closeTheMenu);
// the difference between the content width and the landing page (the scrollbar width)
// and edit distance between bullets and scroll
function editHeaderWidthAndBullets() {
  let theDiff = contentEle.offsetWidth - landingPage.offsetWidth;
  header.style.width = `calc(100% - ${theDiff}px)`;
  document.querySelector(".bullets").style.right = `${theDiff + 2}px`;
}
editHeaderWidthAndBullets();
window.addEventListener("resize", editHeaderWidthAndBullets);
