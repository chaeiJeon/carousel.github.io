const inputButton = document.querySelector(".inputButton");
const uploadButton = document.querySelector(".uploadButton");
const images = document.querySelector(".images");
const nextButton = document.querySelector(".nextButton");
const prevButton = document.querySelector(".prevButton");

let count=0;
// 처음 업로드 된 이미지는 무조건 3번 container에 놓고,
// 그다음 이미지가 업로드 되면 오른쪽으로 한칸씩 밀린다.
function addImage(image) {
    const list = images.children;
    for (let index = 0; index < list.length; index++) {
        console.log(list);
        if(list[index].className==='image1' || list[index].className==='image2'){
            continue;
        }
        else{
            moveRight(list[index]);
        }
    }
    image.className = `image3`;
    count++;
}
// 이미지 번호 가져오는 함수
function myNum(item) {
    return parseInt(item.className.replace("image", ""));
}
// 이미지를 오른쪽으로 한칸 이동하게 하는 함수
function moveRight(image) {
    image.className = `image${myNum(image) + 1 > 5 ? 1 : myNum(image) + 1}`;
}
function moveLeft(image) {
    image.className = `image${myNum(image) - 1 < 1 ? 5 : myNum(image) - 1}`;
}
// uploadButton을 누르면 inputButton이 눌리게, input은 디자인하기 힘들어서
uploadButton.addEventListener("click", () => { inputButton.click(); })
// 파일을 가져와서 캐러셀에 올린다
inputButton.addEventListener("change", (e) => {
    if(count>=5){
        alert("이미지는 최대 5장까지 가능합니다!");
        return;
    }
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
        let newImage = document.createElement("img");
        newImage.src = e.target.result;
        images.appendChild(newImage);
        addImage(newImage);
    }
})
// nextButton을 누르면 각 이미지는 다음 이미지 class로 넘어간다.
// 6번이 된다면 1번으로 돌아가게 한다
// next 눌렀는데 4번이 없으면 none
// prev 눌렀는데 번이 없으면 none
nextButton.addEventListener("click", event => {
    const list = images.children;
    for (let index = 0; index < list.length; index++) {
        if (list[index].className === 'image4') {
            for (let index = 0; index < list.length; index++) {
                moveLeft(list[index]);
            }
            break;
        }
    }
})
prevButton.addEventListener("click", event => {
    console.log("prevButton-----------");
    const list = images.children;
    for (let index = 0; index < list.length; index++) {
        console.log(list);
        if (list[index].className === 'image2') {
            console.log("moveRight");
            for (let index = 0; index < list.length; index++) {
                console.log("for");
                moveRight(list[index]);
            }
            break;
        }
    }
})