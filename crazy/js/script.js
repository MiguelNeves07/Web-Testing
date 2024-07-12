document.addEventListener('DOMContentLoaded', () => {
    const messagesDiv = document.getElementById('messages');
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');

    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = messageInput.value.trim();
        if (message !== '') {
            sendMessage(message);
            messageInput.value = '';
        }
    });

    function sendMessage(message) {
        fetch('chat.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `message=${encodeURIComponent(message)}`,
        })
        .then(response => response.text())
        .then(loadMessages);
    }

    function loadMessages() {
        fetch('messages/messages.txt')
        .then(response => response.text())
        .then(data => {
            messagesDiv.innerHTML = data.split('\n').map(line => `<p>${line}</p>`).join('');
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        });
    }

    setInterval(loadMessages, 1000); // Carregar novas mensagens a cada segundo
});
