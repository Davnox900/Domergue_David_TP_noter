class MYMeteo extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        let div = document.createElement("div");
        let attente = document.createElement("div");
        attente.innerHTML = "En cours de chargement";
        this.appendChild(attente);
        let villeinfo = document.createElement("h4"); 
        let heureinfo = document.createElement("p");
        let heure;
        let vent = document.createElement("p");
        let humidite = document.createElement("p");
        let image = document.createElement("img");
        let infoville;
        if (this.getAttribute('ville')) {
            infoville = this.getAttribute('ville');
        } else {
            infoville = "Paris"
        }
        let req = new XMLHttpRequest();
        req.open("GET","https://www.prevision-meteo.ch/services/json/"+infoville);
        req.onload=()=>{
            let json = JSON.parse(req.response);
            if (json["city_info"]) {
                this.removeChild(attente);
                villeinfo.innerHTML = json["city_info"]["name"]+" ("+json["city_info"]["country"]+")";
                heure = json["current_condition"]["hour"];
                heure = heure.replace(":","h");
                heureinfo.innerHTML = heure;
                vent.innerHTML = json["current_condition"]["wnd_spd"]+" noeuds "+json["current_condition"]["wnd_dir"];
                humidite.innerHTML = json["current_condition"]["humidity"]+"%";
                console.log(json["current_condition"]["icon"]);
                image.src = json["current_condition"]["icon"];
                div.appendChild(villeinfo);
                div.appendChild(heureinfo);
                div.appendChild(vent);
                div.appendChild(humidite);
                div.appendChild(image);
                this.appendChild(div);
            }
            else{
                this.removeChild(attente);
                let erreur = document.createElement("p");
                erreur.innerHTML = "City or coordinate not found";
                this.appendChild(erreur);
            }
        }
        req.send();
    }
}

customElements.define('my-meteo',MYMeteo);