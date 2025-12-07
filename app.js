let baseUrl = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/'; // Replace with your API base URL

let dropdowns = document.querySelectorAll('.dropdown-cont select');
let cont_img = document.querySelector('img');
let select = document.querySelectorAll("select");


for(let select of dropdowns) {
    for(currcode in countryList) {
        let newOpt = document.createElement('option');
        newOpt.innerText = currcode;
        newOpt.value = currcode;
        select.appendChild(newOpt);

        if(select.name === "from" && currcode === "USD") {
            newOpt.selected = "selected";
        }else if(select.name === "to" && currcode === "INR") {
            newOpt.selected = "selected";
        }
    }
}

select.forEach((sel) => {
    sel.addEventListener("change", (evt) => {
        updatFlag(evt.target);
    });
});
const updatFlag = (element) => {
    console.log(element)
    let currCode = element.value; 
    let countryCode = countryList[currCode];
    new_src = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = new_src;
}

let btn = document.querySelector("#btn");
let result = document.querySelector(".result");
let amount = document.querySelector(".amount input");

    
btn.addEventListener("click" , async (evt) => {
    evt.preventDefault();
    let amoVal = amount.value;
    console.log(amoVal);

    // these Are values from dropDowns
    let fromCurr = document.querySelector(".from select").value;
    let toCurr = document.querySelector(".to select").value;
    
    // here we use API
    const URL_from = `${baseUrl}${fromCurr.toLowerCase()}.json`;
    
    // Here we Fetch Data
    let response = await fetch(URL_from);
    let data = await response.json();

    // Get the exchange rate for the target currency (toCurr)
    let rate = data[fromCurr.toLowerCase()][toCurr.toLowerCase()];
    console.log(rate);

    let finalRate = rate * amoVal ; 

    // result
    result.innerText = `${amoVal} ${fromCurr} = ${finalRate} ${toCurr}`;
});