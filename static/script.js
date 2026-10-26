// Lagrer samtalehistorikken
let history = [];

async function send() {

    let input = document.getElementById("input");
    let text = input.value;

    if (!text) return;

    // Viser brukerens melding
    document.getElementById("chat").innerHTML +=
        "<div class='message'>You: " + text + "</div>";

    history.push({role: "user", content: text});
    input.value = "";

    // Sender meldingen til backend
    let r = await fetch("/chat", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({messages: history})
    });

    let data = await r.json();

    // Viser AI-svaret
    document.getElementById("chat").innerHTML +=
        "<div class='message'>AI: " + data.response + "</div>";

    history.push({role: "assistant", content: data.response});
}