// Harjoitus 1 scriptit
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const nameInput = form.elements.name;
  const emailInput = form.elements.email;
  const commentInput = form.elements.comment;

  const nameError = document.getElementById("name");
  const emailError = document.getElementById("email");
  const commentError = document.getElementById("comment");

  function clearErrors() {
    [nameError, emailError, commentError].forEach(e => e.textContent = "");
    [nameInput, emailInput, commentInput].forEach(i => i.classList.remove("invalid"));
  }

  function validate() {
    clearErrors();
    let valid = true;


    if (nameInput.value.trim() === "") {
      nameError.textContent = "Nimi ei saa olla tyhjä";
      nameInput.classList.add("invalid");
      valid = false;
    }


    const emailVal = emailInput.value.trim();
    if (emailVal.length < 6 || emailVal.length > 15 || !emailVal.includes("@")) {
      emailError.textContent = "Sähköposti 6–15 merkkiä ja sis. @";
      emailInput.classList.add("invalid");
      valid = false;
    }

  
    const commentVal = commentInput.value.trim();
    if (commentVal === "" || commentVal.length > 150) {
      commentError.textContent = "Kommentti 1–150 merkkiä";
      commentInput.classList.add("invalid");
      valid = false;
    }

    return valid;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validate()) {
      alert("Korjaa virheet ennen lähettämistä!");
      return;
    }

    const userData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      comment: commentInput.value.trim()
    };

 
    localStorage.setItem("contactData", JSON.stringify(userData));

    alert("Tiedot tallennettu localStorageen!");
    console.log("Tallennettu:", userData);
  });

// Harjoitus 2
  const savedData = localStorage.getItem("contactData");
  if (savedData) {
    const data = JSON.parse(savedData);
    nameInput.value = data.name || "";
    emailInput.value = data.email || "";
    commentInput.value = data.comment || "";
  }


  const sessionDiv = document.getElementById("sessiondata");
  if (sessionDiv) {
    const btn = document.createElement("button");
    btn.textContent = "Näytä tallennetut tiedot";
    sessionDiv.insertAdjacentElement("beforebegin", btn);

    btn.addEventListener("click", () => {
      const data = JSON.parse(localStorage.getItem("contactData") || "{}");
      sessionDiv.textContent = `Nimi: ${data.name || "-"}, Sähköposti: ${data.email || "-"}, Kommentti: ${data.comment || "-"}`;
    });
  }
document.getElementById("theForm").addEventListener("submit", function (e) {
  e.preventDefault(); 

  const type = document.getElementById("type").value;
  const years = document.getElementById("years").value.trim(); 
  const costField = document.getElementById("cost");


  if (years === "" || isNaN(years) || years <= 0) {
    alert("Anna kelvollinen vuosien määrä.");
    return;
  }


  let total = Number(type) * Number(years);
  let message = "";


  if (years > 2 && years < 5) {
    total *= 0.8; 
    message = "Saat 20 % alennuksen!";
  } else if (years >= 5) {
    total = total * 0.8 - 5; 
    message = "Saat 20 % alennuksen ja 5 € lisäalennuksen!";
  }


  costField.value = total.toFixed(2) + " €";

 
  if (message) {
    alert(message);
  }

  console.log(`Jäsenyys: ${type} €, Vuosia: ${years}, Hinta: ${total.toFixed(2)} €`);
});
//Harjoitus 3
const form = document.querySelector('form');

form.addEventListener('submit', function(e) {
    e.preventDefault(); 

  
    const name = form.elements['name'].value;
    const email = form.elements['email'].value;
    const comment = form.elements['comment'].value;

 
    const formData = {
        name: name,
        email: email,
        comment: comment
    };

  
    localStorage.setItem('contactForm', JSON.stringify(formData));

   
    alert('Tiedot tallennettu localStorageen!');
});
/// Harjoitus 4
document.addEventListener("DOMContentLoaded", () => {
  const sessionDiv = document.getElementById("sessiondata");


  function loadData() {
    const data = JSON.parse(localStorage.getItem("contactData") || "{}");
    if (!data.name && !data.email && !data.comment) {
      sessionDiv.textContent = "Ei tallennettuja tietoja.";
    } else {
      sessionDiv.innerHTML = `
        <strong>Tallennetut tiedot:</strong><br>
        Nimi: ${data.name || "-"}<br>
        Sähköposti: ${data.email || "-"}<br>
        Kommentti: ${data.comment || "-"}
      `;
    }
  }


  const button = document.createElement("button");
  button.textContent = "Näytä tallennetut tiedot";
  sessionDiv.insertAdjacentElement("beforebegin", button);

  button.addEventListener("click", loadData);


  loadData();
});
});
