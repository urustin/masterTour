const a = document.querySelectorAll(".nextBtn img");
const b = document.querySelectorAll(".backBtn img");

a.forEach((item)=>{item.src = "/images/icons/right-arrow2.png"});
b.forEach((item)=>{item.src = "/images/icons/right-arrow2.png"});


function showNextBox(currentBox) {
    // 현재 박스를 숨기고
    document.getElementById(`box${currentBox}`).style.opacity = '0';

    // 다음 박스를 보여줌
    const nextBox = currentBox + 1;
    document.getElementById(`box${nextBox}`).style.display= 'block';
    
    if(nextBox===5){
        document.querySelectorAll(".nextBtn")[4].style.display="none";
    }

    setTimeout(()=>{
        document.getElementById(`box${currentBox}`).style.display = 'none';
        document.getElementById(`box${nextBox}`).style.opacity = '1';
    },250)


  }
  

function showPreviousBox(currentBox) {

    // 현재 박스를 숨기고
    document.getElementById(`box${currentBox}`).style.opacity = '0';

    // 다음 박스를 보여줌
    const nextBox = currentBox -1;
    document.getElementById(`box${nextBox}`).style.display= 'block';
    
    //for animation it was broken
    setTimeout(()=>{
        document.getElementById(`box${currentBox}`).style.display = 'none';
        document.getElementById(`box${nextBox}`).style.opacity = '1';
    },250)
    if(nextBox===0){
        document.querySelectorAll(".backBtn")[0].style.display="none";
    }
  }
  

window.showNextBox = showNextBox;
window.showPreviousBox = showPreviousBox;