var swiper = new Swiper('.sw-products02', {
  slidesPerView: 4,
  spaceBetween: 10,
  slidesPerGroup: 4,
  navigation: {
    nextEl: '.next-service',
    prevEl: '.prev-service',
  },
  breakpoints: {
    480: {
      slidesPerView: 1,
      spaceBetween: 10,
      slidesPerGroup: 1,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 10,
      slidesPerGroup: 2,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 10,
      slidesPerGroup: 4,
    },
  }
});

var galleryThumbs = new Swiper('.gallery-thumbs', {
    spaceBetween: 15,
    slidesPerView: 4,
    loop: true,
    freeMode: true,
    loopedSlides: 5, //looped slides should be the same
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    breakpoints: {
        480: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 10,
        },
    }
});
var galleryTop = new Swiper('.gallery-top', {
    effect: 'fade',
    autoplay: 2500,
    spaceBetween: 10,
    loop: true,
    loopedSlides: 5, //looped slides should be the same
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    thumbs: {
        swiper: galleryThumbs,
    },
});