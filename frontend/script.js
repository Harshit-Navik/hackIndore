const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const menuLinks = document.querySelectorAll(".mobile-menu a");

// Toggle Menu
menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    
    // Toggle icon between bars and X
    const icon = menuToggle.querySelector("i");
    if(mobileMenu.classList.contains("open")){
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }
});

// Close menu when a link is clicked
menuLinks.forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        // Reset icon
        const icon = menuToggle.querySelector("i");
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    });
});