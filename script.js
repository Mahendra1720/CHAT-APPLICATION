const socket = io();

let joined = false;

function sendMessage() {
    const usernameInput = document.getElementById("username");
    const messageInput = document.getElementById("message");

    if (!joined) {
        const username = usernameInput.value.trim();
        if (username === "") {
            alert("Enter username first");
            return;
        }
        socket.emit("join", username);
        joined = true;
        usernameInput.disabled = true;
    }

    const message = messageInput.value.trim();
    if (message !== "") {
        socket.emit("chatMessage", message);
        messageInput.value = "";
    }
}

socket.on("message", (msg) => {
    const chatBox = document.getElementById("chat-box");
    const div = document.createElement("div");
    div.textContent = msg;
    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;
});