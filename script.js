const countryList = {
    AUD: "AU",
    BGN: "BG",    
    BRL: "BR",
    NOK: "BV", 
    CAD: "CA", 
    CHF: "CH",
    CNY: "CN",   
    CZK: "CZ",
    DKK: "DK",  
    EUR: "FR",
    GBP: "GB",
    HKD: "HK", 
    HRK: "HR",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN", 
    ISK: "IS",  
    JPY: "JP", 
    KRW: "KR",
    MXN: "MX",
    MYR: "MY",  
    NZD: "NZ", 
    PHP: "PH",  
    PLN: "PL", 
    RON: "RO",
    RUB: "RU",
    SEK: "SE",
    SGD: "SG", 
    THB: "TH",
    TRY: "TR", 
    USD: "US",

  };




//   main code


const url = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_BU3v9YkvdzJ8W2LWfYsu6Zb27QZ7MtbjqQ9RLY0y";

let containers = document.querySelectorAll('.container select');
const btn = document.getElementById('btn');

let fromCurr = document.querySelector('.container-above select');
let toCurr = document.querySelector('.container-below select');
const masg = document.querySelector('.msg');


for(let select of containers){
    for(code in countryList){
        let newoption = document.createElement("option");
        newoption.innerText = code;
        newoption.value = code;
        select.append(newoption);

        if(select.name == "from" && code === "USD"){
            newoption.selected = "select";
        }

        if(select.name == "to" && code === "INR"){
            newoption.selected = "select";
        }

    }

   select.addEventListener('change', (eve)=>{
    updateflag(eve.target);
   })
}

const updateflag = (element)=>{
    let code = element.value;  
    let countryCode = countryList[code];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newsrc;   
}



btn.addEventListener('click', async(eve)=>{
    eve.preventDefault();
    let amount = document.querySelector('form input');
    let amt = amount.value;
    console.log(amt);
    if(amt === "" || amt<1){
        amt = 1;
        amount.value = "1";
    }
    const BaseURL = `${url}&currencies=${fromCurr.value}%2C${toCurr.value}%2CCAD`;
    let response = await fetch(BaseURL);
    let data = await response.json();
    // console.log(data);
    let rate = data.data[toCurr.value];
    let finalAmount = amount.value*rate;
    masg.innerText = ` ${amount.value} of ${fromCurr.value} to ${finalAmount} in ${toCurr.value}`;
   
});





