document.getElementById("contact-btn").addEventListener("click", function(event) {
    event.preventDefault();
    document.querySelector('#contact').scrollIntoView({
      behavior: 'smooth'
    });
  });
  

  document.getElementById("back-to-top").addEventListener("click", function(event) {
    event.preventDefault();
    document.querySelector('header').scrollIntoView({
      behavior: 'smooth'
    });
  });

  // Get the back to top arrow element
var backToTop = document.getElementById("back-to-top");

// Add scroll event listener to window
window.addEventListener("scroll", function() {
  // If user has scrolled down 200px or more from the top
  if (window.pageYOffset > 200) {
    // Show the back to top arrow
    backToTop.style.display = "block";
  } else {
    // Hide the back to top arrow
    backToTop.style.display = "none";
  }
});

// Smooth scroll to top when "Back to Top" link is clicked
backToTop.addEventListener("click", function(event) {
  event.preventDefault();
  document.querySelector('header').scrollIntoView({
    behavior: 'smooth'
  });
});
