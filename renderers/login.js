const electron = require("electron");
const { ipcRenderer, remote } = electron;


const btnLogin = document.getElementById("btnLogin");
btnLogin.addEventListener("click", (event) => {    
    ipcRenderer.send("login:request", "index")
});

ipcRenderer.on("login:response", (event, data) =>{
    if(data ==="OK"){

        ipcRenderer.send("home:window", "index")
        const window = remote.getCurrentWindow();
		window.close();

    }
})