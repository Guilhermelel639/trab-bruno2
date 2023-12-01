document.querySelector("#btnLogin").addEventListener("click", () => {
    const email = document.querySelector("#emailInput").value;
    const senha = document.querySelector("#senhaInput").value;

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, senha })
    })
    .then((response) => {
        if (response.ok) {
            response.json().then((data) => {
                console.log(data.message); // Mensagem do servidor em caso de sucesso


                window.location.href = "./page_.html";
            });
        } else {
            response.json().then((data) => {
                console.error(data.message); // Mensagem do servidor em caso de erro
            });
        }
    });
});
