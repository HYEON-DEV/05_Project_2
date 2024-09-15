
const product = 
{
    "camera": { 
        "lens_change": {
            "full_frame": [
                {
                    "id": 3,
                    "thumbnail": "camera3.png",
                    "title": "ILCE-9M3",
                    "info": "The Power of One Frame",
                    "price": 7980000,
                    "type": "ILC",
                    "frame": "full-frame",
                    "date": 202401
                },
                {
                    "id": 4,
                    "thumbnail": "camera4.png",
                    "title": "ILCE-7CM2",
                    "info": "원핸드 컴팩트 풀프레임",
                    "price": 2690000,
                    "type": "ILC",
                    "frame": "full-frame",
                    "date": 202309
                }
            ],
            "APS-C": [
                {
                    "id": 1,
                    "thumbnail": "camera1.png",
                    "title": "ZV-E10M2",
                    "info": "기록의완성",
                    "price": 1340000,
                    "type": "ILC",
                    "frame": "APS-C",
                    "date": 202407
                },
                {
                    "id": 2,
                    "thumbnail": "camera2.png",
                    "title": "ZV-E10M2K",
                    "info": "기록의완성",
                    "price": 1490000,
                    "type": "ILC",
                    "frame": "APS-C",
                    "date": 202407
                }
            ]
        },
        "compact": [
            {
                "id": 5,
                "thumbnail": "camera5.png",
                "title": "ZV-1F",
                "info": "나를 담는 브이로그 카메라 ZV-1F",
                "price": 759000,
                "type": "compact",
                "date": 202208
            }
        ]
    },
    "video": {
        "cinema": [ {}, {}, {}, ],
        "camcorder": { 
            "4k_handy": [ {}, {}, {}, ], 
            "4k_handheld": [ {}, {}, {}, ] }
    }
};


console.log(Object.keys(product)); //  -->  [ 'camera', 'video' ]

console.log(Object.keys(product.camera));//  -->  [ 'lens_change', 'compact' ]

console.log(Object.keys(product.camera.lens_change));//  -->  [ 'full_frame', 'APS-C' ]

console.log(Object.keys(product.camera.lens_change).length);//  --> 2
console.log(Object.keys(product.camera.compact).length);//  --> 1
