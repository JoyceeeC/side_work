
let mydata = [];
//取得資料
function getData() {

    const veggieURL = "https://raw.githubusercontent.com/JoyceeeC/side_work/main/veggie.json";

    axios.get(veggieURL)
        .then(r => {
            mydata = r.data;

            for (let i = mydata.length - 1; i >= 0; i--) {
                if (mydata[i]["作物名稱"] == null) {
                    mydata.splice(i, 1);
                }
            };

            DataCheck(mydata);
        });
};

getData();
const showList = document.querySelector('.showList');

//確認有無資料
function DataCheck(mydata) {

    let str = '';
    if (mydata.length) {

        mydata.forEach(el => {
            str += renderData(el);
        });
        console.log("mydata", mydata);

    } else {
        // str = "<h3>查詢結果並無符合條件，請重新搜尋。<h3> <br > <h3>No Data Found,Pleasw Search Again. </h3>"
    }
    showList.innerHTML = str;
}


//畫面渲染
function renderData(obj) {
    //   console.log(obj);
    return ` <tr>
        <td> ${obj["作物名稱"]} </td>
        <td> ${obj["市場名稱"]} </td>
        <td> ${obj["上價"]} </td>
        <td> ${obj["中價"]} </td>
        <td> ${obj["下價"]} </td>
        <td> ${obj["平均價"]} </td>
        <td> ${obj["交易量"]} </td>
      </tr>`
}

//tabFilter
const tabFilter = document.querySelector(".tabFilter");
const searchTxt = document.querySelector(".searchTxt");

let activeItem = document.querySelector(".active");

tabFilter.addEventListener("click", function (e) {
    if (e.target.getAttribute("data-type" == undefined)) {
        return;
    }

    if (activeItem) {
        activeItem.classList.remove("active");
    }

    e.target.classList.add("active");
    activeItem = document.querySelector(".active");
    let str = " "

    mydata.forEach(el => {
        if (el["種類代碼"] == activeItem.getAttribute("data-type")) {
            str += renderData(el);
        }
    });

    showList.innerHTML = str;


    // const searchValue = searchTxt.value

    // if (searchValue !== 0) {
    //     const searchItems = mydata.filter(el => {
    //         return el["作物名稱"].includes(searchValue)
    //     });
    //     DataCheck(searchItems);
    // } else {
    //     DataCheck(mydata);
    // }



});

//關鍵字搜尋
function searchChanged(event) {
    const searchValue = event.currentTarget.value;

    const searchItems = mydata.filter(el => {
        return el["作物名稱"].includes(searchValue)
    });
    DataCheck(searchItems);

    const activeItem = document.querySelector(".active");
    if (activeItem) {
        activeItem.classList.remove("active");
    }
    if (searchItems) {
        const tabType = searchItems[0]["種類代碼"]

        const activeNew = document.querySelector(`button[data-type=${tabType}]`);
        activeNew.classList.add("active");
    } else {
        activeItem.classList.remove("active");

    }


}

// const searchBtn = document.querySelector(".search")

// searchBtn.addEventListener('click' , function () {

//     const searchValue = searchTxt.value;

//     const searchItems = mydata.filter(el => {
//         return el["作物名稱"].includes(searchValue)
//     });
//     DataCheck(searchItems);

//     console.log("searchItems", searchItems);

// });


//Filter Option
const select = document.querySelector('.sort-select');


function selectFilter() {
    console.log(select.value);
    const switchValue = select.value;

    switch (switchValue) {
        case '上價':
            sortTable('上價');
            break;
        case '中價':
            sortTable('中價');
            break;
        case '下價':
            sortTable('下價');
            break;
        case '平均價':
            sortTable('平均價');
            break;
        case '交易量':
            sortTable('交易量');
            break;
        default:
            return;
    }
}

function sortTable(columnName){

    const newData = mydata.sort( (a,b) =>

        a[columnName] < b[columnName]? 1 : -1 

    )
    DataCheck(newData)
}





