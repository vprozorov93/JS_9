const chat = document.querySelector('.chat-widget')
const messages = document.querySelector('.chat-widget__messages' );
const inputArea = document.querySelector('.chat-widget__input')

chat.addEventListener('click', ()=>{
    if (!chat.classList.contains('chat-widget_active')){
        chat.classList.add('chat-widget_active')
    }
})

function getDate() {
    const date = new Date()
    const hours = date.getHours()
    let minutes = date.getMinutes()
    minutes = minutes<10 ? `0${minutes}` : minutes
    const secondsfrom1970 = Date.now()

    return {hours, minutes, secondsfrom1970}
}

function getAnswerText(){
    text = ['Добрый день!', 'Нам не интересны ваши сообщения.', 'Чао', 'Проваливай по добру по здоровью!']
    return text[Math.floor(Math.random() * ((text.length-1) - 0 + 1)) + 0]
}

function sendAnswer(checkUser = false){
    const date = getDate()
        const text = getAnswerText()
    if (!checkUser) {
        messages.innerHTML += `
        <div class="message">
        <div class="message__time" data-seconds="${date.secondsfrom1970}">${date.hours}:${date.minutes}</div>
        <div class="message__text">${text}</div>
        </div>`
    } else {
        messages.innerHTML += `
        <div class="message">
        <div class="message__time" data-seconds="${date.secondsfrom1970}">${date.hours}:${date.minutes}</div>
        <div class="message__text">Ну че каво?</div>
        </div>`
    }
}

inputArea.addEventListener('keydown', (event)=>{
    if (event.code=='Enter' && inputArea.value.trim() != '') {
        const date = getDate()
        messages.innerHTML += `
            <div class="message">
            <div class="message__time">${date.hours}:${date.minutes}</div>
            <div class="message__text">${inputArea.value}</div>
            </div>`
        inputArea.value = ''
        sendAnswer()
        document.querySelector('.chat-widget__messages-container').scrollTo(messages.scrollWidth, messages.scrollHeight)
    }
})

function sendCheckText(){
    const allMessages = Array.from(document.querySelectorAll('.message'))
    if (allMessages.length > 0) {
        const lastMessageSeconds = Number(allMessages[allMessages.length-1].querySelector('.message__time').dataset.seconds)
        console.log(lastMessageSeconds)
        if(Number(getDate().secondsfrom1970) - lastMessageSeconds >= 29999) {
            sendAnswer(true)
        }
    }
}

setInterval(sendCheckText, 30000)