
let mydata = [];
//取得資料
function getData() {
  
  const veggieURL = "https://raw.githubusercontent.com/JoyceeeC/side_work/main/veggie.json";

  axios.get(veggieURL)
    .then(r => {

      mydata = r.data;
      DataCheck(mydata);

    })
}

getData();
const showList = document.querySelector('.showList');

//確認有無資料
function DataCheck(mydata) {
  for (let i = mydata.length - 1; i >= 0; i--) {
    if (mydata[i]["作物名稱"] == null) {
      mydata.splice(i, 1);
    }
  }
  // console.log(mydata);

  let str = '';
  if (mydata.length) {
    const activeItem = document.querySelector(".active");
   
    mydata.forEach( el => {
        if (el["種類代碼"] == activeItem.getAttribute("data-type")) {
            str += renderData(el);
        } 
    });
  } else if (mydata.length == 0) {
    str = "<h3>查詢結果並無符合條件，請重新搜尋。<h3> <br > <h3>No Data Found,Pleasw Search Again. </h3>"
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
const tabFilter = document.querySelector(".tabFilter")

tabFilter.addEventListener("click", function (e) {
    if (e.target.getAttribute("data-type" == undefined)) {
        return;
    }

    const activeItem = document.querySelector(".active");
    activeItem.classList.remove("active");
    e.target.classList.add("active");

    let str = "";
    let targetValue = e.target.getAttribute("data-type")
    mydata.forEach( el => {
       
        if (el["種類代碼"] == targetValue) {
            str += renderData(el);
        } 
    });
    showList.innerHTML = str;

});




