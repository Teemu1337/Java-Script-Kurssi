// tehtävä 1

function parseData() {
    const quotes = document.getElementsByTagName("quotes");
    let output = "";

    for (let i = 0; i < quotes.length; i++) {
        let quote = quotes[i].getElementsByTagName("quote")[0].textContent;
        let author = quotes[i].getElementsByTagName("author")[0].textContent;
        output += `<p><strong>"${quote}"</strong><br>- ${author}</p>`;
    }

    document.getElementById("quotes").innerHTML = output;
}



//Tehtävä 2 
function loadXMLFile() {
    const xhttp = new XMLHttpRequest();
   
    xhttp.open("GET", "famous-quotes.xml", true);
    xhttp.send();

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            document.getElementById("quotes").innerText = xhttp.responseText;
        } else if (xhttp.readyState === 4) {
            document.getElementById("quotes").innerText = "Tiedostoa ei löytynyt (404).";
        }
    };
}



// Tehtävä 3

function loadAndParseXML() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "famous-quotes.xml", true);
    xhttp.send();

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            const xmlDoc = xhttp.responseXML;
            const quotes = xmlDoc.getElementsByTagName("quote");
            const authors = xmlDoc.getElementsByTagName("author");

            let table = "<table border='1' style='border-collapse:collapse; width:100%;'>";
            table += "<tr><th>Quote</th><th>Author</th></tr>";

            for (let i = 0; i < quotes.length; i++) {
                const quoteText = quotes[i].textContent;
                const authorText = authors[i] ? authors[i].textContent : "";
                table += `<tr><td>${quoteText}</td><td>${authorText}</td></tr>`;
            }

            table += "</table>";
            document.getElementById("tabledata").innerHTML = table;
        } else if (xhttp.readyState === 4) {
            document.getElementById("tabledata").innerText = "Tiedostoa ei löytynyt (404).";
        }
    };
}



// Tehtävä 4 

function loadAndParseNews(feedUrl) {
   
    const proxyUrl = "https://api.allorigins.win/get?url=" + encodeURIComponent(feedUrl);

    fetch(proxyUrl)
        .then(response => response.json())
        .then(data => {
       
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data.contents, "application/xml");
            const items = xmlDoc.getElementsByTagName("item");

            let output = "<ul>";

            for (let i = 0; i < items.length; i++) {
                const title = items[i].getElementsByTagName("title")[0].textContent;
                const link = items[i].getElementsByTagName("link")[0].textContent;
                output += `<li><a href="${link}" target="_blank">${title}</a></li>`;
            }

            output += "</ul>";
            document.getElementById("newsfeed").innerHTML = output;
        })
        .catch(err => {
            console.error("News fetch error:", err);
            document.getElementById("newsfeed").innerHTML = "Error loading news feed.";
        });
}