const loveBtnList = document.getElementsByClassName('love-btn');
const loveAmount = document.getElementById('love-react-amount');

for(const i of loveBtnList){
    i.addEventListener('click', function(event){
        event.preventDefault();
        loveAmount.innerText = parseInt(loveAmount.innerText) + 1;
    });
}


