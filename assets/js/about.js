var swiper = new Swiper(".mySwiper2", {
    slidesPerView:5,
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
        550:{
            slidesPerView:2,
        },
        800:{
            slidesPerView:4,
        },
        1000:{
            slidesPerView:5,
        },
    },
    pagination:{
        el:".swiper-pagination",
        clickable:true,
    }
  });