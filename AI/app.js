const chatContainer = document.getElementById('chat-container');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

// Send button or Enter key
sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') sendMessage();
});

// Add a message bubble to the chat
function addMessage(text, sender = 'user') {
  const bubble = document.createElement('div');
  bubble.className = `flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`;

  bubble.innerHTML = `
    <div class="max-w-[75%] px-4 py-2 rounded-2xl shadow
         ${sender === 'user'
          ? 'bg-indigo-600 text-white rounded-br-none'
          : 'bg-gray-700 text-gray-100 rounded-bl-none'}">
      ${text}
    </div>
  `;
  chatContainer.appendChild(bubble);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Simulate a streaming bot reply
function fakeBotReply(userText) {
  const reply = "Hello everyone" ;
  let index = 0;

  const bubble = document.createElement('div');
  bubble.className = 'flex justify-space-between';
  const inner = document.createElement('div');
  inner.className = 'max-w-[75%] px-4 py-2 rounded-2xl shadow bg-gray-700 text-gray-100 rounded-bl-none whitespace-pre-wrap';
  bubble.appendChild(inner);
  chatContainer.appendChild(bubble);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  const interval = setInterval(() => {
    inner.textContent += reply[index];
    index++;
    chatContainer.scrollTop = chatContainer.scrollHeight;
    if (index >= reply.length) clearInterval(interval);
  }, 30);
}

function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  chatInput.value = '';

  // Here you would call your backend API instead of fakeBotReply:
  // fetch('/api/chat', {method:'POST', body: JSON.stringify({message:text})})
  //   .then(res => res.json()).then(data => fakeBotReply(data.reply));
  fakeBotReply(text);
}