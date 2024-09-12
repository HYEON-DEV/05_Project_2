const clr_light_grey = '#fbfbfb';

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
    const curPageId = params.id;

    if ( !curPageId ) {
        alert("제품이 없습니다");
        history.back();
        return;
    }

    let response = null;

    try {
        response = await axios.get(`http://localhost:3001/camera/${curPageId}`);
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


    /* -- -- 함께 구매하시면 좋은 추천 제품 -- -- */

    let response_2 = null;

    try {
        response_2 = await axios.get(`http://localhost:3001/camera`);
        //console.log(response_2.data);
    } catch (e) {
        console.error(e);
        alert("요청 실패");
        return;
    }    

    let dataArr;
    response_2.data.some( (v,i) => {
        if ( v.id == curPageId ) {
            dataArr = arrayHyeon.removeElementAtIndex(response_2.data,i);
            return true;
        }
    } );
    //  some 메서드   탐색을 중단하는 기능 제공
    //  콜백함수가 true 리턴하는 순간 전체 반복 중단 
    //  console.log(dataArr);

    const randomData = arrayHyeon.shuffleArray(dataArr);
    console.log(randomData);
        
    const swiperWrapper = document.querySelector('.swiper-wrapper-rcmd');

    randomData.forEach( (v,i) => {
        const li = document.createElement('li');
        swiperWrapper.appendChild(li);

        const a = document.createElement('a');
        a.setAttribute('href',`view.html?id=${v.id}`);

        const div = document.createElement('div');      // swiper slide 클래스이름 추가~~~~~~
        div.classList.add('img-wrapper');
        div.style.backgroundColor = clr_light_grey;
        
        const img = document.createElement('img');
        img.setAttribute('src',`assets/img/camera${v.id}.png`);
        
        div.appendChild(img);

        const p1 = document.createElement('p');
        p1.classList.add('prd-name');
        p1.classList.add('tit');
        p1.innerHTML = v.title;
        
        const p2 = document.createElement('p');
        p2.classList.add('prd-text');
        p2.innerHTML = v.info;

        a.appendChild(div);
        a.appendChild(p1);
        a.appendChild(p2);

        const p3 = document.createElement('p');
        p3.classList.add('price');
        p3.classList.add('tit');
        p3.innerHTML = v.price.toLocaleString();

        li.appendChild(a);
        li.appendChild(p3);
    } );    
    
    
} )();
    
( async() => {
    
} )();
    
 


const heart = document.querySelector(".heart");
