document.addEventListener('DOMContentLoaded', function(){
    
    const addNote = document.getElementById("addNote");


    if(addNote) {
        addNote.addEventListener("click", function() {
            window.location.href = "newNote.html";
        });
    }

    var newNote = document.getElementById("newNote");

    if(newNote) {

        document.getElementById("checkmark").addEventListener("click", function() {
            let naslov = document.getElementById("noteTitle").value.trim();
            let vsebina = document.getElementById("content").value.trim();

            if (!naslov && !vsebina) {
                window.location.href = "index.html";
                return;
            }


            const datum = new Date();

            let zapiski = JSON.parse(localStorage.getItem("zapiski")) || [];

            zapiski.push({
                naslov: naslov,
                vsebina: vsebina,
                datum: datum.toLocaleDateString("sl-SI")
            });


            localStorage.setItem("zapiski", JSON.stringify(zapiski));
 
            // pojdi nazaj na glavno stran
            window.location.href = "index.html";

        });
    }

    const notesContainer = document.getElementById("notes");

    if (notesContainer) {
        prikaziZapiske();
    }

    function prikaziZapiske() {
        let zapiski = JSON.parse(localStorage.getItem("zapiski")) || [];

        notesContainer.innerHTML = "";

        zapiski.forEach(function (zapisek, index) {
            let li = document.createElement("li");
            li.className = "d-flex align-items-center justify-content-between mt-3";
            li.id = "notesList";
            li.innerHTML= `
                <div class="d-flex align-items-center p-3 w-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                    </svg>

                    <div class="ms-3" id="notesContent">
                        <h6 class="mb-2">${zapisek.naslov}</h6>
                        <small>${zapisek.vsebina}</small>
                    </div>

                    <p class="ms-auto mb-0" style="font-size: 13px;">${zapisek.datum}</p>
                    
                    <button class="btn ms-3 p-1 deleteBtn" data-index="${index}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="dark" class="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                    </button>

                </div>
            `;

            notesContainer.appendChild(li);

        });

        notesContainer.querySelectorAll(".deleteBtn").forEach(function(btn) {
            btn.addEventListener("click", function(e) {

                if(confirm("Ali želite izbrisati to opravilo?")){
                    e.stopPropagation();

                    const index = parseInt(this.getAttribute("data-index"));
                    izbrisiZapisek(index);
                }
            
                
            });


        });

        const noteCount = document.querySelector("#noteCount p");

        if (noteCount) {
            noteCount.textContent = zapiski.length;
        }
    }

    function izbrisiZapisek(index) {
        let zapiski = JSON.parse(localStorage.getItem("zapiski")) || [];

        zapiski.splice(index, 1);

        localStorage.setItem("zapiski", JSON.stringify(zapiski));

        prikaziZapiske();
    }


});

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js")
        .then(function() {
            console.log("Service Worker registriran!");
        })
        .catch(function(error) {
            console.log("Service Worker napaka:", error);
        });
}

    
    

