/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
let navBar = document.getElementsByClassName("navbar__menu");
let sections = document.querySelectorAll("[data-nav]");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav

function getSections() {
  let sectionsArray = [].slice.call(sections);
  return sectionsArray;
}

function createNavBarItems() {
  let navSections = getSections();
  let navBarList = document.getElementById("navbar__list");

  for (var i = 0; i < navSections.length; i++) {
    let navItem = navSections[i];
    var node = document.createElement("a");
    // node.href = `#${navItem.getAttribute('id')}`;
    let textnode = document.createTextNode(navItem.getAttribute("data-nav"));
    node.appendChild(textnode);
    node.style.color = "white";
    node.style.padding = "20px 10px 10px 10px";
    addListener(navItem, node);
    navBarList.appendChild(node);
  }
}

function setupNavigationBar() {
  navBar[0].style.background = "rgb(0, 15, 64)";
  createNavBarItems();
}

// Add class 'active' to section when near top of viewport
function clearActiveClass() {
  let navSections = getSections();

  for (var i = 0; i < navSections.length; i++) {
    let navItem = navSections[i];
    navItem.classList.remove("your-active-class");
  }
}

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

setupNavigationBar();

// Scroll to section on link click
function addListener(navItem, node) {
  node.addEventListener("click", function (event) {
    navItem.scrollIntoView({ behavior: "smooth" });
    clearActiveClass();
    navItem.classList.add("your-active-class");
  });
}

// Set sections as active
document.onscroll = function () {
  windowScrolling();
};

function windowScrolling() {
  let allSections = getSections();
  let currentActive = document.getElementsByClassName("your-active-class")[0];

  if (currentActive != null) {
    let distance = currentActive.offsetTop - window.scrollY;
    console.log(
      `${currentActive.getAttribute("id")} is ${distance} from the top.`
    );

    for (var i = 0; i < allSections.length; i++) {
      let sectionTop = allSections[i].offsetTop - window.scrollY;

      if (sectionTop > 300 || sectionTop > -200) {
        console.log(`reseting current active to: ${i}`);
        currentActive.classList.remove("your-active-class");
        allSections[i].classList.add("your-active-class");
        break;
      }
    }
  }
}
