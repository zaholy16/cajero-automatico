let accountsList = [
    { name: "Mali", credit: 200, password: "mali" },
    { name: "Gera", credit: 290, password: "gera" },
    { name: "Maui", credit: 67,  password: "maui" },
];

let elementInputName = document.getElementById("name");
let elementInputPass = document.getElementById("password");
let welcomeData = document.getElementById("data");
let msgError = document.getElementById("messageError");
let msgRule = document.getElementById("rule");
let elementBtnLogIn = document.getElementById("logIn");
let elementBtnLogOut = document.getElementById("logOut");
let elementBtnConsult = document.getElementById("btnConsult");
let elementBtnDeposit = document.getElementById("btnDeposit");
let elementBtnWithdrawals = document.getElementById("btnWithdrawals");
let elementDeposit = document.getElementById("deposit");
let elementWithdrawals = document.getElementById("withdrawals");
let elementResult = document.getElementById("results");
let elementNewResult = document.getElementById("newResults");
let divLogIn = document.getElementById("divLogIn");
let divOptions = document.getElementById("options");
let divDeposit = document.getElementById("amountDeposit");
let divWithdrawal = document.getElementById("amountWithdrawal");

let credit = 0;
let creditInput = 0;
let indexAccount = -1;
let newCredit = 0;

/* Evita que cada refresque la página y oculta divs */
window.addEventListener("DOMContentLoaded", (evento) =>{
    evento.preventDefault();
    hidden(divDeposit);
    hidden(divWithdrawal);
    hidden(divOptions);
    hidden(elementBtnLogOut);
})
  
/* Función que valida si no hay campos vacios y compara el usuario con su contraseña */
const logIn = () => {
    if(elementInputPass == "" || elementInputName.value == ""){
        msgError.innerHTML = `Campos Vacios. Ingresa todos los campos`;
        msgError.style.color = "red";
        elementInputPass.style.border = "1px solid red"
        elementInputName.style.border = "1px solid red"
        hidden(divOptions);
    }else{
       indexAccount = accountsList.findIndex((account) => account.name == elementInputName.value && account.password == elementInputPass.value);
          
        if(indexAccount != -1){
            show(elementBtnLogOut);
            welcomeData.innerHTML =  `Bievenid@ ${accountsList[indexAccount].name}`;
            show(divOptions);
            hidden(divLogIn);
        }else{
            welcomeData.innerHTML =  ``;
            msgError.innerHTML = `Error. Datos invalidos`;
            msgError.style.color = "red";
            elementInputPass.style.border = "1px solid red";
            elementInputName.style.border = "1px solid red";
            hidden(divOptions);
        }
    }
}

/* Función para consultar el saldo disopnible del usuario seleccionado */
const consult = () => {
    credit = accountsList[indexAccount].credit; 
    elementResult.innerHTML = `<b>Saldo:</b> ${credit}`;
    elementNewResult.innerHTML = ``;
    msgRule.innerHTML = ``;
}

/* Función para depositar a la cuenta seleccionada */
const deposit = () => {
    creditInput = parseInt(elementDeposit.value);
    credit = accountsList[indexAccount].credit;
    newCredit = credit + creditInput;

    if(newCredit > 990){
        elementResult.innerHTML = `<b>Saldo:</b> ${credit}`;
        elementNewResult.innerHTML = `<b>Saldo esperado:</b>${newCredit}`;
        msgRule.style.color = "red";
        msgRule.innerHTML = `Error. No se puede tener más de $990 en la cuenta`;
    }else{
        msgRule.innerHTML = ``;
        accountsList[indexAccount].credit = newCredit;   
        elementResult.innerHTML = `<b>Saldo depositado:</b> ${creditInput}<br>`;
        elementNewResult.innerHTML = `<b>Nuevo Saldo:</b> ${accountsList[indexAccount].credit}`;
    }
}

/* Función para retirar de la cuenta seleccionada */
const withdrawals = () => {
    creditInput = parseInt(elementWithdrawals.value);
    credit = accountsList[indexAccount].credit;
    newCredit = credit - creditInput;

    if(newCredit < 10){
        elementResult.innerHTML = `<b>Saldo:</b>${credit}`;
        elementNewResult.innerHTML = `<b>Saldo esperado:</b>${newCredit}`;
        msgRule.style.color = "red";
        msgRule.innerHTML = `Error. No se puede tener menos de $10 en la cuenta`;
    }else{
        msgRule.innerHTML = ``;
        accountsList[indexAccount].credit = newCredit;   
        elementResult.innerHTML = `<b>Saldo retirado:</b> ${creditInput}<br>`;
        elementNewResult.innerHTML = `<b>Nuevo Saldo:</b> ${accountsList[indexAccount].credit}`;
    }
}

/* Función para mostrar el div */
const show = (elemento) => {
    elemento.style.display = 'block';
}

/* Función para ocultar el div */
const hidden = (elemento) => {
    elemento.style.display = 'none';
}

/* Evento para iniciar sesión */
elementBtnLogIn.addEventListener("click", () => {
    logIn();
});

/* Evento para cerrar sesión */
elementBtnLogOut.addEventListener("click", () => {
    show(divLogIn);
    hidden(divOptions);
    hidden(divDeposit);
    hidden(divWithdrawal);
    hidden(elementBtnLogOut);
    elementInputName.value = "";
    elementInputPass.value = "";
    msgError.innerHTML = ``;
    welcomeData.innerHTML =  ``;
    elementResult.innerHTML = ``;
    elementNewResult.innerHTML = ``;
    msgRule.innerHTML = ``;
    elementInputPass.style.border = "1px solid black";
    elementInputName.style.border = "1px solid black";
})

/* Evento para consultar el saldo */
elementBtnConsult.addEventListener("click", () => {
    consult();
    hidden(divDeposit);
    hidden(divWithdrawal);
});

/* Evento para realizar un deposito. Validando campos vacios e información invalida */
elementBtnDeposit.addEventListener("click", () => {
    if(indexAccount != -1){
            show(divDeposit);
            elementDeposit.value = "";
            hidden(divWithdrawal);
    }else{
        hidden(divWithdrawal);
        hidden(divDeposit);
    }
});

/* Evento para realizar un retiro. Validando campos vacios e información invalida. */
btnWithdrawals.addEventListener("click", () => {
    if(indexAccount != -1){
            show(divWithdrawal);
            elementWithdrawals.value = "";
            hidden(divDeposit);
    }else{
        hidden(divWithdrawal);
        hidden(divDeposit);
    } 
});

/* Evento para depositar */
btnSendDeposit.addEventListener("click", () => {
    creditInput = elementDeposit.value;
    if(creditInput == ""){
        alert("Porfavor, ingresa un monto");
    }else{
        deposit();
    }
});

/* Evento para retirar */
btnSendWithdrawals.addEventListener("click", () => {
    creditInput = elementWithdrawals.value;
    if(creditInput == ""){
        alert("Porfavor, ingresa un monto");
    }else{
        withdrawals();
    }
});