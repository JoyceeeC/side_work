
let mydata = [];
const veggieURL = "https://raw.githubusercontent.com/JoyceeeC/side_work/main/veggie.json";

//取得資料

function getData() {
    axios.get(veggieURL)
        .then(r => {
            mydata = r.data.filter(el => {
                return el.作物名稱;
                // return (el.作物名稱 && el.作物名稱.match(crop.value.trim()))
            });
            DataCheck(mydata);
        });
}
//資料裡面有個別資料的 "作物名稱" 是 null 型別。 我們使用 axios 獲取到的資料，不一定每筆資料都是有完整填寫的。有可能因為原始資料的缺漏，造成我們收集到不符合預期的資料，而產生錯誤。
//因此我們需要對 get 到的資料，進行數據處理。
//解決方法：
//第一種方法是在 get 資料時，就篩選出 "作物名稱" 確實有值的資料 (過濾掉空值、null、undefined)
// 使用 filter，先過濾作物名稱為 null 的資料
// data = response.data.filter(item => item.作物名稱)
// 增加條件判斷。第二種方法是在進行搜尋時，確保資料的 "作物名稱" 有值，讓 match 方法能夠正常運作。
// return (item.作物名稱 && item.作物名稱.match(crop.value.trim()))


getData();
const showList = document.querySelector('.showList');

//確認有無資料
function DataCheck(mydata) {

    let str = '';
    if (mydata.length) {

        mydata.forEach(el => {
            str += renderData(el);
        });

    } else {
        str = ` <h4 class="mt-2 ms-auto">請輸入欲查詢項目。<h4>`
    }
    showList.innerHTML = str;
}


//畫面渲染
function renderData(obj) {
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
let activeItem = document.querySelector(".active");

tabFilter.addEventListener("click", function (e) {
    if (e.target.getAttribute("data-type" == undefined)) {
        return;
    }

    activeItem = document.querySelector(".active");
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

});

//關鍵字搜尋
let searchItems = []
const searchTxt = document.querySelector(".searchTxt")

function searchChanged(event) {
    const searchValue = event.currentTarget.value;

    if (searchValue) {
        searchItems = mydata.filter(el => {
            return el["作物名稱"].includes(searchValue)
        })

    };

    DataCheck(searchItems);

    if (activeItem) {
        activeItem.classList.remove("active");
    }
    if (searchItems.length) {
        const tabType = searchItems[0]["種類代碼"]

        const activeNew = document.querySelector(`button[data-type=${tabType}]`);
        activeNew.classList.add("active");
    }

}

// Enter搜尋
searchTxt.addEventListener('keyup', function (event) {
    const searchValue = searchTxt.value

    if (searchValue && event.keyCode === 13) {
        searchItems = mydata.filter(el => {
            return el["作物名稱"].includes(searchValue)
        })
    }
    DataCheck(searchItems);


    if (activeItem) {
        activeItem.classList.remove("active");
    }
    if (searchItems.length) {
        const tabType = searchItems[0]["種類代碼"]

        const activeNew = document.querySelector(`button[data-type=${tabType}]`);
        activeNew.classList.add("active");
    }
});


//Sort Option
const select = document.querySelector('.sort-select');

function selectFilter() {
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

function sortTable(columnName, sort = "desc") {
    let newData = []

    if (searchItems.length) {
        newData = searchItems.sort((a, b) =>
            sort === 'desc'
                ? b[columnName] - a[columnName]
                : a[columnName] - b[columnName]
        )
    } else {
        newData = mydata.sort((a, b) =>
            sort === 'desc'
                ? b[columnName] - a[columnName]
                : a[columnName] - b[columnName]
        )
    }
    DataCheck(newData)

}

//advanced sort
const jsSortAdvanced = document.querySelector(".js-sort-advanced");

jsSortAdvanced.addEventListener("click", function (e) {

    const dataPrice = e.target.getAttribute("data-price");
    let dataSort = e.target.getAttribute("data-sort");
    dataSort = (dataSort == "up") ? "desc" : "asc"

    sortTable(`${dataPrice}`, `${dataSort}`);

})







