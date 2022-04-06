// Test via a getter in the options object to see if the passive property is accessed
var supportsPassive = false;
try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function() {
      supportsPassive = true;
    }
  });
  window.addEventListener("testPassive", null, opts);
  window.removeEventListener("testPassive", null, opts);
} catch (e) {}

$(function () {

  var xDirectionDifference, touchDown, touchUp;
  
  document.getElementById('myCarouselMain').addEventListener('touchstart', slideStart, supportsPassive ? { passive: true } : false);
  document.getElementById('myCarouselMain').addEventListener('touchend', slideEnd, supportsPassive ? { passive: true } : false);

  function slideStart(event) {
    touchDown = event.touches[0].clientX;
  }

  /** When user release pointer finish slide moving.*/
  function slideEnd(event) {
    touchUp = event.changedTouches[0].clientX;
    xDirectionDifference = touchDown - touchUp;
    if (xDirectionDifference < 0)
      $('#myCarouselMain').carousel('prev');
    else
      $('#myCarouselMain').carousel('next');
  }

});


/*Required for the css animation function below*/
$.fn.isInViewport = function () {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();

  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
};

$(window).on('resize scroll load', function () {
  /*Gets all the elements with the class .card*/
  $('.card').each(function () {
    /*active color is the array with ids of all the element with the class*/
    var activeCard = $(this).attr('id');
    /*Triggered when element is in viewport*/
    if ($(this).isInViewport())
      /*adding class .cardInView to the respective element via its id*/
      $('#' + activeCard).addClass('cardInView');
  });
});

/*Start of menu button function*/
var menuVisibility = false;

document.getElementById("mobileMenu").addEventListener("click", menuToggle);
function menuToggle() {
  $('#mobileMenuPopUpList').slideToggle();
  if (menuVisibility == false) {
    document.getElementById("mobileMenu").style.color = "black";
    $('#menuIcon').removeClass( "glyphicon-menu-hamburger" ).addClass( "glyphicon-remove" );
    menuVisibility = true;
  }
  else {
    document.getElementById("mobileMenu").style.color = "white";
    $('#menuIcon').removeClass( "glyphicon-remove" ).addClass( "glyphicon-menu-hamburger" );
    menuVisibility = false;
  }
}
/*End of menu button function*/