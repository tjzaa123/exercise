var change = 0;
var monnyInser = 0;
var totalPaid = 0;
var msg = "";
var messageEl = document.getElementById("message");
var menus = ["Pepsi Max", "Pepsi Diet", "Coke", "Coke Vanilla (S)", "Coke Vanilla (L)", "Mountain Dew"];
const price = 15;

var prices = [15, 20, 15, 20, 25, 13]

const currency_ten = 10;
const currency_five = 5;
const currency_two = 2;
const currency_one = 1;

// ฟังก์ชั่นการคำนวณเงินเข้ามา
function getTotal() {
    var currency_tens = Number(document.getElementById("ten").value);
    var currency_fives = Number(document.getElementById("five").value);
    var currency_twos = Number(document.getElementById("two").value);
    var currency_ones = Number(document.getElementById("one").value);

    if (currency_tens > 0) {
        currency_tens = currency_tens * currency_ten;
    }
    if (currency_fives > 0) {
        currency_fives = currency_fives * currency_five;
    }
    if (currency_twos > 0) {
        currency_twos = currency_twos * currency_two;
    }
    if (currency_ones > 0) {
        currency_ones = currency_ones * currency_one;
    }

    totalPaid = currency_tens + currency_fives + currency_twos + currency_ones;

    return totalPaid.toFixed(2);

}

function tally() {
    monnyInser = getTotal();
    document.getElementById("paid").innerHTML = monnyInser;

}
// ฟังก์ชั่นการเครียร์รายการเพื่อทำรายการใหม่
function clearMoney() {
    monnyInser = 0;
    document.getElementById("paid").innerHTML = monnyInser;

}

function clearCoin() {
    document.getElementById("ten").value = null;
    document.getElementById("five").value = null;
    document.getElementById("two").value = null;
    document.getElementById("one").value = null;
}

function clearRefune() {
    getTotal();
    if (totalPaid > 0) {
        msg = "Transaction cancelled. " + totalPaid.toFixed(2) + " Bath has return";
        clearMoney();
        clearCoin();
        messageEl.innerHTML = msg;
    } else if (totalPaid == 0) {
        msg = "";
        messageEl.innerHTML = msg;
    }

}
// ฟักง์ชั่นคำนวณการคิดเงินลูกค้า
function calculateChange(PM) {
    var tempChange = 0;
    if (getTotal() != 0) {
        return (tempChange = (getTotal() - prices[PM]).toFixed(2));
    }
    return tempChange.toFixed(2);

}
// ฟังก์ชั่นการจ่ายสินค่าและเงินทอน
function dispenseMenu(menu) {
    messageEl.innerHTML = "";
    change = 0;
    var selectedMenu = menus[menu];
    change = calculateChange(menu);
    if (change < 0) {
        // msg = "You did not pay enough" + totalPaid.toFixed(2) + "B has been returned.";
        msg = `You did not pay enough money ${totalPaid.toFixed(2)} B has been returned`;
        totalPaid = 0;
        change = 0;
        clearMoney();
        clearCoin();
        messageEl.innerHTML = msg;
    } else if (change > 0) {
        // msg = selectedMenu + "has been dispensed." + change + "B has been returned.";
        msg = `${selectedMenu} has been dispensed ${change} B has been returned.`;
        totalPaid = 0;
        change = 0;
        clearMoney();
        clearCoin();
        messageEl.innerHTML = msg;
    } else if (totalPaid == 0) {
        msg = "Please pay before seletion";
        messageEl.innerHTML = msg;
    } else if (change == 0) {
        msg = `${selectedMenu} has been dispensed.`;
        messageEl.innerHTML = msg;
    }
}

const userList = document.querySelector('.user-list'); //ตัวแปรเก็บเอาไว้ใช้กับการเรียกใช้ API
// ทำการเรียก API 
fetch('https://www.mocky.io/v2/5c77c5b330000051009d64c9')
    .then(res => {
        return res.json()
    })
    .then(json => {
        const user = json.data;
        user.forEach((user) => {

            const userItem = document.createElement('div');
            userItem.classList.add('user-item');

            // const idText = document.createElement('span');
            // idText.classList.add('idP');
            // idText.innerHTML = user.id;

            const namePText = document.createElement('h1');
            namePText.classList.add('nameP');
            namePText.innerHTML = user.name;

            const AvatarImg = document.createElement('img');
            AvatarImg.classList.add('Avatar');
            AvatarImg.src = user.image;

            const pricePNum = document.createElement('div');
            pricePNum.classList.add('priceP');
            pricePNum.innerHTML = `Price : ${user.price} Bath`;

            const in_stockText = document.createElement('div');
            in_stockText.classList.add('in_stockP');
            in_stockText.innerHTML = user.in_stock;
            if (user.in_stock == 1) {
                in_stockText.innerHTML = "In stock";
            } else {
                in_stockText.innerHTML = "Out of stock";
            }

            userItem.append(namePText, AvatarImg, in_stockText, pricePNum);
            userList.append(userItem);
        })
    })
    .catch((error) => {
        console.log(error.message);
    })