// tourDetailLoad.js

const params = new URLSearchParams(window.location.search);
const queryString = params.toString().slice(0,-1); // 쿼리 스트링 전체를 가져옵니다.

if(window.location.href.includes("tourList")){
    
// 쿼리

document.addEventListener('DOMContentLoaded', function() {
    // 모든 tg-populartour elements에 이벤트 리스너를 추가합니다.
    const tours = document.querySelectorAll('.tg-populartour');
    tours.forEach(tour => {
        // console.log(tour.querySelector('a'));

        tour.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', function(e) {
                // data-id 값을 가져와서 URL을 구성합니다.
                e.preventDefault();
                const id = tour.dataset.id;
                window.location.href = `./tourDetail.html?${id}`;
            })
            
        });
        tour.querySelector(".tg-pricearea del").innerHTML = tourTitle[tour.dataset.id].price.length>=4 ?  "$"+String(tourTitle[tour.dataset.id].price *1.5).slice(0,1)+","+String(tourTitle[tour.dataset.id].price *1.5).slice(1)+"~"  :  "$"+tourTitle[tour.dataset.id].price *1.5 +"~";
        tour.querySelector(".tg-pricearea h4").innerHTML = tourTitle[tour.dataset.id].price.length>=4 ?  "$"+String(tourTitle[tour.dataset.id].price *1).slice(0,1)+","+String(tourTitle[tour.dataset.id].price *1).slice(1)+"~"  :  "$"+tourTitle[tour.dataset.id].price *1 +"~";
        // tour.querySelector(`[data-id=${query}]`)
    });
});


}else 
if(window.location.href.includes("tourDetail")){




// 여행소개




// title


// JavaScript 코드를 사용해 HTML의 내용을 채우기
document.addEventListener('DOMContentLoaded', function () {
    // tourTitle에서 필요한 tour 정보 가져오기
    const tourKey = queryString; // 예를 들어, 여기서는 'great' 키에 해당하는 tour 정보를 가져오는 것으로 가정합니다.
    console.log(tourTitle);
    const tour = tourTitle[tourKey];

    if (tour) {
        // title 채우기
        document.getElementById('tg-tourname').textContent = tour.title;

        // 별점 채우기
        const starsElement = document.querySelector('.tg-durationrating .tg-stars span');
        if (starsElement) starsElement.style.width = `${parseFloat(tour.star) * 20}%`; // 별점이 5점 만점이라 가정

        // 리뷰 채우기
        const reviewElement = document.querySelector('.tg-durationrating em');
        if (reviewElement) reviewElement.textContent = `(${tour.review} Review)`;

        // 가격 채우기
        const priceElement = document.querySelector('.tg-pricearea h4');
        const priceElement2 = document.querySelector('.tg-pricearea del');
        if (priceElement) priceElement.innerHTML = `${tour.price.length>=4?String(tour.price).slice(0,1)+","+String(tour.price).slice(1):tour.price}~<sub>/ 정확한 가격은 문의바랍니다</sub>`;
        if (priceElement2) priceElement2.innerHTML = `$${tour.price.length>=4?String(tour.price*1.5).slice(0,1)+","+String(tour.price*1.5).slice(1):tour.price*1.5}`;
        // Create <p> element and set tour description
        const descriptionElement = document.createElement('p');
        descriptionElement.id = "tg-tourdescription2";
        descriptionElement.textContent = tour.description;
        document.getElementById('tg-tourdescription').appendChild(descriptionElement);

        // 걸리는 시간과 최소 인원 채우기 (아래 예시에서는 HTML의 id가 tg-tourduration인 요소가 두 개라 가정합니다.)
        const timePeopleElements = document.querySelectorAll('.tg-tourduration');
        if (timePeopleElements[0]) timePeopleElements[0].textContent = `예상 소요시간 : ${tour.time}시간`; // 걸리는 시간
        if (timePeopleElements[1]) timePeopleElements[1].textContent = `${tour.people}인부터 가능`; // 최소 인원



        // 사진 채우기
        const photoBox = document.querySelector('.tourDetail_photoBox');
        if (photoBox) {
            photoBox.innerHTML = ''; // 기존의 이미지를 제거
            for(let i=1;i<tour.photo.length+1;i++){
                const img = document.createElement('img');
                img.src = `images/add7/tourPhotos/${queryString}/main/main${i}_edit.jpg`;
                img.alt = '';
                photoBox.appendChild(img);
            }
        }
        // map
        const tour_googleMap = document.querySelector("#tour_googleMap");
        tour_googleMap.src = tour.mapUrl;
        

        // if(imageBanner){

        //     imageBanner.setAttribute('data-image-src', `images/add7/tourPhotos/${queryString}/main/main1_edit.jpg`);
        // }
        // window.imageBanner = `images/add7/tourPhotos/${queryString}/main/main1_edit.jpg`;
        // console.log(imageBanner);
        //  > div:nth-child(1) > div
        // 갤러리 채우기
        const slider = document.querySelector('#tg-populartoursslider');
        for (let i = 0; i < parseInt(tour.gallery); i++) {
            const imageUrl = `images/add7/tourPhotos/${queryString}/gallery/${i}.jpg`;

            const div = document.createElement('div');
            div.className = 'item tg-populartour';

            const figure = document.createElement('figure');
            
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = 'image destinations';
            figure.appendChild(img);

            const a = document.createElement('a');
            a.href = 'javascript:void(0);';
            a.appendChild(figure);

            div.appendChild(a);
            slider.appendChild(div);
        }

        // Initialize the Owl Carousel after adding the images
        var _tg_populartoursslider = jQuery('#tg-populartoursslider');
        _tg_populartoursslider.owlCarousel({
            loop: true,
            dots: false,
            nav: true,
            margin:30,
            autoplay: false,
            responsiveClass:true,
            responsive:{
                320:{ items:1, },
                639:{ items:2, },
                768:{ items:2, },
                992:{ items:3, },
                1200:{ items:3, }
            },
            navText: [
                '<i class="icon-chevron-left"></i>',
                '<i class="icon-chevron-right"></i>',
            ],
            navClass: [
                'tg-btnroundprev',
                'tg-btnroundnext'
            ],
        });

    }
});







document.addEventListener('DOMContentLoaded', (event) => {
    const tgBookingdetail2 = document.querySelector('.tg-bookingdetail2');
    
    for(const [key, value] of Object.entries(tour[queryString])) {
        const tgBox = document.createElement('div');
        tgBox.className = 'tg-box ' + key; // e.g. 'tg-box meetTime'
        
        const h2 = document.createElement('h2');
        h2.textContent = value.t
        tgBox.appendChild(h2);
        
        const tgDescription = document.createElement('div');
        tgDescription.className = 'tg-description';
        
        // For properties which contain array of paragraphs
        if(Array.isArray(value.p)) {
            value.p.forEach((paragraph) => {
                const p = document.createElement('p');
                // Split paragraph by newline characters and create text nodes with <br> elements
                paragraph.split('\n').forEach((line, index, array) => {
                    p.appendChild(document.createTextNode(line));
                    if (index !== array.length - 1) p.appendChild(document.createElement('br'));
                });
                tgDescription.appendChild(p);
            });
        } else { // For single paragraph properties
            const p = document.createElement('p');
            value.p.split('\n').forEach((line, index, array) => {
                p.appendChild(document.createTextNode(line));
                if (index !== array.length - 1) p.appendChild(document.createElement('br'));
            });
            tgDescription.appendChild(p);
        }
        
        tgBox.appendChild(tgDescription);
        tgBookingdetail2.appendChild(tgBox);
    }
});



// course


// 컨테이너 요소를 선택합니다.
const container = document.querySelector('.tourDetail_box.tourBox');


console.log(queryString);
console.log(course)
// itemId와 매칭되는 아이템을 불러옵니다.
const matchedCourse = course[queryString];



// 메인 타이틀을 설정합니다.
if (matchedCourse) {
    const mainTitle = document.createElement('h2');
    mainTitle.textContent = matchedCourse.title;
    container.appendChild(mainTitle);


    // 각 course를 반복하여 HTML 구조를 생성합니다.
    for (let i = 1; i <= Object.keys(matchedCourse).length - 1; i++) {
        const courseItem = matchedCourse[i];

        // textBox를 생성합니다.
        const textBox = document.createElement('div');
        textBox.className = 'textBox';
        textBox.textContent = `${i}. ${courseItem.title}`;
        container.appendChild(textBox);
        
        // imageBox와 imageCaption은 항상 생성합니다.
        const imageBox = document.createElement('div');
        imageBox.className = 'imageBox';
        
        const imageCaption = document.createElement('div');
        imageCaption.className = 'imageCaption';
        imageCaption.innerHTML = courseItem.caption.replace(/\n/g, '<br>');
        
        imageBox.appendChild(imageCaption);
        container.appendChild(imageBox);

        // 이미지가 있을 경우에만 img 태그를 생성합니다.
        if (courseItem.img && courseItem.img.trim() !== "") {
            const image = document.createElement('img');
            image.src = courseItem.img;
            image.alt = '';
            imageBox.insertBefore(image, imageCaption); // image를 imageCaption 앞에 삽입합니다.
        }
    }
    
    }else{
        alert('No matching item found for:', queryString);
    }

}
