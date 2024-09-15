const clr_light_grey = '#fbfbfb';
/* 
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
 */
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
    const params = {id:4};

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
      
    document.querySelector(".main-img").setAttribute( "src", `assets/img/${response.data.thumbnail}` );
    

    /* -- -- -- 메인 우측 - 구매관련 -- -- -- */

    document.querySelector(".prd-name").innerHTML = response.data.title;
    
    document.querySelector(".prd-text").innerHTML = response.data.info;
    
    const camPrice = response.data.price;
    document.querySelector(".cam-price").innerHTML = camPrice.toLocaleString();

    document.querySelector(".vip-mlg").innerHTML = (camPrice*0.04).toLocaleString();

    document.querySelector(".family-mlg").innerHTML = (camPrice*0.02).toLocaleString();

        /* -- -- 색상 -- -- */
    if ( response.data.color ) {
        /* 
        const clr1 = response.data.color[0];    //console.log(clr1);
        const clr2 = response.data.color[1];
         */
        const clr_name = clr => {
            switch ( clr ) {
                case "black":
                    return "블랙";
                    break;
                case "white":
                    return "화이트";
                    break;
                case "silver":
                    return "실버";
                    break;
            }
        };  //console.log(clr_name(clr1));
        
        const div = document.createElement('div');
        div.classList.add('color-select');
        document.querySelector('.product-cont-color-select').appendChild(div);

        const p = document.createElement('p');
        p.classList.add('tit');
        p.innerHTML = "색상";

        const ul = document.createElement('ul');
        ul.classList.add('circle-color-box');

        for ( let i=0; i<2; i++ ) {
            let clr = response.data.color[i];

            const li = document.createElement('li');

            const a = document.createElement('a');
            a.classList.add('color-btn');
            a.classList.add(clr);

            const span1 = document.createElement('span');
            span1.classList.add('circle-color');
            span1.classList.add('active');

            const span2 = document.createElement('span');
            span2.classList.add('c-bg');

            span1.appendChild(span2);

            const span3 = document.createElement('span');
            span3.classList.add('circle-name');
            span3.classList.add('active');
            span3.innerHTML = clr_name(clr);

            a.appendChild(span1);
            a.appendChild(span3);
            
            li.appendChild(a);

            ul.appendChild(li);
        }        

        div.appendChild(p);
        div.appendChild(ul);
        
        
        document.querySelectorAll('.color-btn').forEach( (v,i) => {
            v.addEventListener( 'click', e => {
                const clickIdx = i;
    
                document.querySelectorAll('.circle-color').forEach( (v1,i1) => {
                    if ( clickIdx == i1 ) {
                        v1.classList.add('active');
                    } else {
                        v1.classList.remove('active');
                    }
                } );
                document.querySelectorAll('.color-name').forEach( (v2,i2) => {
                    if ( clickIdx == i2 ) {
                        v2.classList.add('active');
                    } else {
                        v2.classList.remove('active');
                    }
                } );
                
            } );
        } );
        
    }
    


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

 
/* -- -- 색상 선택 -- -- */
/* document.querySelectorAll('.color-btn').forEach( (v,i) => {
    v.addEventListener( 'click', e => {
        const clickIdx = i;

        document.querySelectorAll('.circle-color').forEach( (v1,i1) => {
            if ( clickIdx == i1 ) {
                v1.classList.add('active');
            } else {
                v1.classList.remove('active');
            }
        } );
        document.querySelectorAll('.color-name').forEach( (v2,i2) => {
            if ( clickIdx == i2 ) {
                v2.classList.add('active');
            } else {
                v2.classList.remove('active');
            }
        } );
        
    } );
} ); */


//const heart = document.querySelector(".heart");
