

const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    //   type: 'custom',
    },

    // And if we need scrollbar
    scrollbar: {
      enabled: false,
    }, 
});
/* 
const swiperRcmd = new Swiper('.swiper-rcmd', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,

    slidesPerView: 4,
    
    on: {
        init: function() {
            updateNavigationButtons();
        },
        slideChange: function() {
            updateNavigationButtons();
        },
        resize: function() {
            updateNavigationButtons();
        }
    },

    // If we need pagination
    pagination: {
        el: '.swiper-pagination-rcmd',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next-rcmd',
        prevEl: '.swiper-button-prev-rcmd',
    },
    
    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar-rcmd',
    },
}); */

/* 
function updateNavigationButtons() {
    var swiper = document.querySelector('.swiper-rcmd').swiper;
    var lastSlideIndex = swiper.slides.length - swiper.params.slidesPerGroup;

    if (swiper.isEnd) {
        document.querySelector('.swiper-button-next-rcmd').style.display = 'none';
    } else {
        document.querySelector('.swiper-button-next-rcmd').style.display = '';
    }
    
    if (swiper.isBeginning) {
        document.querySelector('.swiper-button-prev-rcmd').style.display = 'none';
    } else {
        document.querySelector('.swiper-button-prev-rcmd').style.display = '';
    }
}

 */

( async () => {
    //const params = utilHelper.getQuery();
    const params = {"id":1};
    const id = params.id;

    if ( !id ) {
        alert("제품이 없습니다");
        history.back();
        return;
    }

    let response = null;

    try {
        response = await axios.get(`http://localhost:3001/camera/${id}`);
        console.log(response.data);
    } catch (e) {
        console.error(e);
        alert("요청 실패");
        return;
    }
/* 
    document.querySelector(".main-img").setAttribute( "src", `assets/img/${response.data.thumbnail}` );
     */
    document.querySelector(".prd-name").innerHTML = response.data.title;
    
    document.querySelector(".prd-text").innerHTML = response.data.info;
    
    const camPrice = response.data.price;
    document.querySelector(".cam-price").innerHTML = camPrice.toLocaleString();

    document.querySelector(".vip-mlg").innerHTML = (camPrice*0.04).toLocaleString();

    document.querySelector(".family-mlg").innerHTML = (camPrice*0.02).toLocaleString();

    

} )();

const heart = document.querySelector(".heart");
