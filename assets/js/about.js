$(function () {
    let scrollSection = document.getElementById("scroll-section");
  
    window.onscroll = function () {
      scrollFunction();
    };
  
    function scrollFunction() {
      if (
        document.body.scrollTop > 195 ||
        document.documentElement.scrollTop > 195
      ) {
        scrollSection.style.top = "0";
      } else {
        scrollSection.style.top = "-62px";
        $("div").removeClass("inActive");
      }
    }
  
    $("input").focus(function () {
      $(this).parents(".form-group").addClass("focused");
    });
  
    $("input").blur(function () {
      var inputValue = $(this).val();
      if (inputValue == "") {
        $(this).removeClass("filled");
        $(this).parents(".form-group").removeClass("focused");
      } else {
        $(this).addClass("filled");
      }
    });
    
  });
  var swiper = new Swiper(".mySwiper2", {
      slidesPerView:4,
      loop:true,
      spaceBetween:20,
      autoplay:{
          delay:3000,
          disableOnInteraction:false,
      },
      breakpoints:{
          0:{
              slidesPerView:1,
          },
      },
      pagination:{
          el:".swiper-pagination",
          clickable:true,
      }
    });
  