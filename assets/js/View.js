


( async () => {
    //const params = utilHelper.getQuery();
    const params = {"id":1};

    if ( !params.id ) {
        alert("제품이 없습니다");
        history.back();
        return;
    }

    let response = null;

    try {
        response = await axios.get(`http://localhost:3001/camera/${params.id}`);
        console.log(response.data);
    } catch (e) {
        console.error(e);
        alert("요청 실패");
        return;
    }

    document.querySelector(".main-img").setAttribute( "src", `assets/img/${response.data.thumbnail}` );
    
    document.querySelector(".prd-name").innerHTML = response.data.title;
    
    document.querySelector(".prd-text").innerHTML = response.data.info;
    
    const camPrice = response.data.price;
    document.querySelector(".cam-price").innerHTML = camPrice.toLocaleString();

    document.querySelector(".vip-mlg").innerHTML = (camPrice*0.04).toLocaleString();

    document.querySelector(".family-mlg").innerHTML = (camPrice*0.02).toLocaleString();

    

} )();

const heart = document.querySelector(".heart");