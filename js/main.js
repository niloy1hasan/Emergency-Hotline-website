const loveBtnList = document.getElementsByClassName('love-btn');
const loveAmount = document.getElementById('love-react-amount');
const copyAmount = document.getElementById('copy-amount');
const coinAmount = document.getElementById('coin-amount');
const helplineTitle = document.getElementsByClassName('helpline-title');
const copyBtnList = document.getElementsByClassName('copy-btn');
const callBtnList = document.getElementsByClassName('call-btn');
const callModal = document.getElementById('call_modal');
const volumeBtn = document.getElementById('volume-btn');
const microphoneBtn = document.getElementById('microphone-btn');

const invervalList  = [];
const dotInverval = [];

for(const i of loveBtnList){
    i.addEventListener('click', function(event){
        event.preventDefault();
        const likeState = this.innerHTML;
        if(likeState===`<i class="fa-regular fa-heart text-2xl"></i>`){
            this.innerHTML = `<i class="fa-solid fa-heart text-2xl text-red-600"></i>`;
            loveAmount.innerText = parseInt(loveAmount.innerText) + 1;
        } else {
            this.innerHTML = `<i class="fa-regular fa-heart text-2xl"></i>`;
            loveAmount.innerText = parseInt(loveAmount.innerText) - 1;
        }
        
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
    <div class="flex flex-col bg-[#FAFAFA] rounded-lg py-3 px-3">
                    <div class="">
                        <h2 class="font-bold">${item.title}</h2>
                        <p class="text-[#5C5C5C]">${item.helpline}</p>
                    </div>
                    
                    <div class="flex justify-between items-center mt-1">
                        <p><i class="fa-regular fa-clock"></i> ${item.time}</p>
                        <p class="text-[#5C5C5C]">today</p>
                    </div>
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

function showCallModal(helplineName, number){
    const container = document.getElementById('call-modal-container');
    container.innerHTML = `
    <img src="assets/person.png" alt="" class="h-16 m-3">
        <h2 class="font-bold text-lg">${helplineName}</h2>
        <h1 class="font-light text-2xl">${number}</h1>
        <p class="font-light text-[16px]">Calling<span id="dot-id" class="inline-block w-1 text-left">.</span></p>
        <audio src="assets/calling-sound.mp3" autoplay loop></audio>
    `;

    let count = 0;

    const dotState = setInterval(()=>{
        count = (count + 1) % 3;
        document.getElementById('dot-id').innerText = ".".repeat(count + 1);
    }, 1000);

    dotInverval.push(dotState);
    callModal.showModal();
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
        // alert(`The number has been copied: ${text}`);

        const toast = document.getElementById('copy-message-toast');
        toast.classList.remove('!hidden');
        setTimeout(() => {
            toast.classList.add('!hidden');
        }, 1200);
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
            
            const time = new Date().toLocaleTimeString();
            addOnHistory({"title": title,"helpline" : number,"time" : time});
            showCallModal(title, number);
            coinAmount.innerText = coin - 20;

        } else {
            no_coin_modal.showModal();
        }
    });
}


const earnCoin = () => {
ads_modal.showModal();
document.getElementById('reward-btn').classList.remove('!border-[#00A63E]', '!bg-[#00A63E]');
document.getElementById('reward-btn').disabled = true;
const seconds = document.getElementById('second-id');
seconds.innerText = 5;
let i = 4;
    const countdown = setInterval(() => {
    if(i>-1) seconds.innerText = i;
    i--;
    if (i < -1) {
        clearInterval(countdown);
        document.getElementById('reward-btn').classList.add('!border-[#00A63E]', '!bg-[#00A63E]');
        document.getElementById('reward-btn').disabled = false;
    }
}, 1000);
    invervalList.push(countdown);

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


volumeBtn.addEventListener('click', ()=>{
    if(volumeBtn.innerHTML===`<i class="fa-solid fa-volume-high"></i>`){
        volumeBtn.innerHTML = `<i class="fa-solid fa-volume-low"></i>`;
    } else {
        volumeBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
    }
});

microphoneBtn.addEventListener('click', ()=>{
    if(microphoneBtn.innerHTML === `<i class="fa-solid fa-microphone"></i>`){
        microphoneBtn.innerHTML = `<i class="fa-solid fa-microphone-slash"></i>`;
    } else {
        microphoneBtn.innerHTML = `<i class="fa-solid fa-microphone"></i>`;
    }
});

document.getElementById('call-cencel-btn').addEventListener('click', ()=>{
const container = document.getElementById('call-modal-container');
    container.innerHTML = ``;
    
    for(let i of dotInverval){
        clearInterval(i);
    }
    dotInverval.length = 0;
    document.getElementById('dot-id').innerText = ".";
});

document.getElementById('get-coin-btn').addEventListener('click', ()=>{
    const modal = document.getElementById('no_coin_modal');
    modal.close();
    earnCoin();
});

document.getElementById('more-coin-btn').addEventListener('click', ()=>{
    const modal = document.getElementById('coin_state_modal');
    modal.close();
    earnCoin();
});

document.getElementById('reward-btn').addEventListener('click', ()=> {
    document.getElementById('ads_modal').close();
    let coin = parseInt(coinAmount.innerText);
    coinAmount.innerText = coin + 20;
    document.getElementById('reward-btn').disabled = true;
    document.getElementById('reward-btn').classList.remove('!border-[#00A63E]', '!bg-[#00A63E]');
});

document.getElementById('skip-btn').addEventListener('click', ()=>{
 for(let i of invervalList){
    clearInterval(i);
 }

 invervalList.length= 0;
});

document.getElementById('coin-id').addEventListener('click', ()=> {
   coin_state_modal.showModal();
   let coin = parseInt(coinAmount.innerText);
   document.getElementById('coin-state-amount').innerText = coin;

   if(coin<20){
    document.getElementById('more-coin-btn').innerText = 'Get Coins';
    document.getElementById('coin-state-message').innerText = 'You don\'t have enough coins!';
   } else {
    document.getElementById('more-coin-btn').innerText = 'Get More Coins';
    document.getElementById('coin-state-message').innerText = 'You have enough coins!';
   }
});