
let data = [
    // {
    //     content: "work 1",
    //     state: "undo"
    // },
    // {
    //     content: "work 2",
    //     state: "undo"
    // },
    // {
    //     content: "work 3",
    //     state: "undo"
    // },
];

const cardList = document.querySelector(".card_list");
const list = document.querySelector(".list");
const countData = document.querySelector(".countData");



function renderData() {
    let str = " ";
    const activeItem = document.querySelector(".active");

    data.forEach((el, i) => {
        if (el.state == activeItem.getAttribute("data-value")) {
            console.log("el.state",el.state);
            console.log("data-value",activeItem.getAttribute("data-value"));
            const isChecked = el.state == "finished" ? "checked" : " ";
            str += `<li>
            <label class="checkbox" >
                 <input type="checkbox" data-num=${i} ${isChecked}>
                 <span>${el.content}</span>
            </label>
            <a href="#" class="delete" data-num=${i}></a>
            </li>`
        }
        else {
            const isChecked = el.state == "finished" ? "checked" : " ";
            str += `<li>
            <label class="checkbox" >
                 <input type="checkbox" data-num=${i} ${isChecked}>
                 <span>${el.content}</span>
            </label>
            <a href="#" class="delete" data-num=${i}></a>
            </li>`

        }

    })

    list.innerHTML = str;
    countUndo();

    if (data.length == 0) {
        console.log("make myself hide");
        cardList.classList.add("hide")
    }


    console.log(data);
}

renderData();

//count undo items
function countUndo() {
    const newData = data.filter(el => {
        return el.state == "undo"
    })
    countData.innerHTML = `${newData.length} 個待完成項目`;

}

//add New Data
const txt = document.querySelector(".txt");
const addBtn = document.querySelector(".btn_add");

addBtn.addEventListener("click", function (e) {
    e.preventDefault();
    cardList.classList.remove("hide")

    if (txt.value == "") {
        alert("請在待辦事項框內輸入內容。");
        return;
    }

    let obj = {};
    obj.content = txt.value;
    obj.state = "undo"
    data.push(obj);

    renderData();
    txt.value = ""

    const activeItem = document.querySelector(".active");
    const undoTab = document.querySelector("li[data-value=undo]");
    activeItem.classList.remove("active");
    undoTab.classList.add("active");


});
console.log(data);

//Delete Data
list.addEventListener("click", function (e) {
    if (e.target.getAttribute("class") !== "delete") {
        return;
    };

    e.preventDefault();

    let num = e.target.getAttribute("data-num");
    console.log(num);
    data.splice(num, 1);
    renderData();
})

//clean finished items
const cleanfini = document.querySelector(".cleanfini")

cleanfini.addEventListener("click", function (e) {
    e.preventDefault();

    for (let i = data.length - 1; i >= 0; i--) {
        if (data[i].state === "finished") {
            data.splice(i, 1);
        }
    }

    const activeItem = document.querySelector(".active");

    if (activeItem.getAttribute("data-value") == "finished") {
        
        str = ""
        list.innerHTML = str;
        console.log("data.length",data.length);

        if (data.length == 0) {
            alert("Good job! Todo things are all finished!")

            setTimeout(() => {
                cardList.classList.add("hide")         
            }, 1000);
        }

    } else {
        if (data.length == 0) {
            alert("Good job! Todo things are all finished!")

            setTimeout(() => {
                cardList.classList.add("hide")         
            }, 1000);
        }else{
             renderData();
        }
       
    }
})


//set state:finished
list.addEventListener("click", function (e) {
    //TODO: 判斷是否點擊到checkbox 

    let num = e.target.getAttribute("data-num")

    data[num].state = "finished"
    countUndo();

});


//filter 
const tabFilter = document.querySelector(".filter")

tabFilter.addEventListener("click", function (e) {
    if (e.target.getAttribute("data-value" == undefined)) {
        return;
    }
    const activeItem = document.querySelector(".active");
    activeItem.classList.remove("active");
    e.target.classList.add("active");

    let str = "";
    let targetValue = e.target.getAttribute("data-value")
    data.forEach((el, i) => {
        if (el.state == targetValue) {
            const isChecked = el.state == "finished" ? "checked" : " ";

            str += `<li>
            <label class="checkbox" >
                 <input type="checkbox" data-num=${i} ${isChecked} >
                 <span>${el.content}</span>
            </label>
            <a href="#" class="delete" data-num=${i}></a>
            </li>`

        } else if (targetValue == "all") {
            const isChecked = el.state == "finished" ? "checked" : " ";

            str += `<li>
            <label class="checkbox" >
                 <input type="checkbox" data-num=${i} ${isChecked}>
                 <span>${el.content}</span>
            </label>
            <a href="#" class="delete" data-num=${i}></a>
            </li>`
        }
    });
    list.innerHTML = str;

});

