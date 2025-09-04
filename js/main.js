const loveBtnList = document.getElementsByClassName('love-btn');
const loveAmount = document.getElementById('love-react-amount');
const copyAmount = document.getElementById('copy-amount');
const coinAmount = document.getElementById('coin-amount');
const helplineTitle = document.getElementsByClassName('helpline-title');
const copyBtnList = document.getElementsByClassName('copy-btn');
const callBtnList = document.getElementsByClassName('call-btn');

for(const i of loveBtnList){
    i.addEventListener('click', function(event){
        event.preventDefault();
        loveAmount.innerText = parseInt(loveAmount.innerText) + 1;
    });
}

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
}

function addOnHistory(item){
    const noHistoryElement = document.getElementById('noHistory');
    if (noHistoryElement) {
        noHistoryElement.remove();
    }
    
    const element = document.createElement('div');
    element.innerHTML = `
    <div class="flex justify-between items-center bg-[#FAFAFA] rounded-lg py-3 px-3">
                    <div class="">
                        <h2 class="font-bold">${item.title}</h2>
                        <p class="text-[#5C5C5C]">${item.helpline}</p>
                    </div>
                    <p>${item.time}</p>
                </div>
    `;

    document.getElementById('history-list-section').appendChild(element);

}

function changeState(id){
    document.getElementById('helplineBtn').classList.remove('bg-green-700', 'text-white', 'py-1.5', 'rounded-full');
    document.getElementById('allBtn').classList.remove('bg-green-700', 'text-white', 'py-1.5', 'rounded-full');
    document.getElementById('historyBtn').classList.remove('bg-green-700', 'text-white', 'py-1.5', 'rounded-full'); 
    document.getElementById(id).classList.add('bg-green-700', 'text-white', 'py-1.5', 'rounded-full');
}


for(const i of copyBtnList){
    i.addEventListener('click', function(event){
        event.preventDefault();
        const parent = event.currentTarget.closest('.contact-card');
        const text = parent.querySelector(".helpline-number").innerText;
       
        if (navigator.clipboard?.writeText) {
            navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
        } else {
            fallbackCopy(text);
        }

        copyAmount.innerText = parseInt(copyAmount.innerText)+1;
    });
}


for(const i of callBtnList){
    i.addEventListener('click', function(event){
        event.preventDefault();
        let coin = parseInt(coinAmount.innerText);
        if(coin>0){
            const parent = event.currentTarget.closest('.contact-card');
            const title = parent.querySelector(".helpline-title").innerText;
            const number = parent.querySelector(".helpline-number").innerText;
            const text = `📞 Calling ${title} ${number}...`;
            const time = new Date().toLocaleTimeString();
            addOnHistory({"title": title,"helpline" : number,"time" : time});
            alert(text);
            coinAmount.innerText = coin - 20;
        } else {
            alert('❌ You don\'t have enough coins! Making this call requires 20 coins.');
        }
    });
}

document.getElementById('clear-btn').addEventListener('click', function(event){
    event.preventDefault();
    document.getElementById('history-list-section').innerHTML = `<p id="noHistory" class="text-center text-[#5C5C5C]">No History</p>`;
});

document.getElementById('historyBtn').addEventListener('click', function(event){
    event.preventDefault();
    changeState('historyBtn');
    document.getElementById('contact-containerId').classList.add('hidden');
    document.getElementById('call-history-section').classList.remove('hidden');
});
document.getElementById('helplineBtn').addEventListener('click', function(event){
    event.preventDefault();
    changeState('helplineBtn');
    document.getElementById('call-history-section').classList.add('hidden');
    document.getElementById('contact-containerId').classList.remove('hidden');
});

document.getElementById('allBtn').addEventListener('click', function(event){
    event.preventDefault();
    changeState('allBtn');
    document.getElementById('contact-containerId').classList.remove('hidden');
    document.getElementById('call-history-section').classList.remove('hidden');
});



