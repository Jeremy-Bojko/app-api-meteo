const NOM_VILLE = document.getElementById('nomVille');
const DATE = document.getElementById('date');
const TEMP = document.getElementById('temp');
const PREVISION = document.getElementById('prevision');
const ICON_PREV = document.getElementById('iconPrevision');
const PROCHAIN_JOUR = document.getElementById('prochainJour');
const INPUT_VILLE = document.getElementById('ville');
const BUTTON_DATA = document.getElementById('buttonData');

const API_URL = "https://www.prevision-meteo.ch/services/json";

BUTTON_DATA.addEventListener('click', ()=> {
    console.log(INPUT_VILLE.value);
    const NEW_API_URL = `${API_URL}/${INPUT_VILLE.value}`;
    getData(NEW_API_URL);
})

const getData = (api) => {
    fetch(api).then(resp => {
        return resp.json()
    }).then(dataMeteo => {
        console.log(dataMeteo);
    
        NOM_VILLE.innerText = dataMeteo.city_info.name;
        DATE.innerText = dataMeteo.current_condition.date;
        TEMP.innerText = dataMeteo.current_condition.tmp;
        PREVISION.innerText = dataMeteo.current_condition.condition;
        ICON_PREV.src = dataMeteo.current_condition.icon;
        PROCHAIN_JOUR.innerHTML = '';
        for (let index = 0; index < 5; index++) {
            console.log(`fcst_day_${index}`);
            const PREVISION = dataMeteo[`fcst_day_${index}`];
            console.log(PREVISION);
    
            PROCHAIN_JOUR.innerHTML += `
            <div>
                <p>Jour : ${PREVISION.day_long}</p>
                <p>Température max : ${PREVISION.tmax}</p>
                <p>Température min : ${PREVISION.tmin}</p>
                <p>Prévision : ${PREVISION.condition}</p>
                <img src="${PREVISION.icon}" alt="">
            </div>
            `
        }
    })
}

getData(`${API_URL}/Bagnolet`);

/* TEMPLATE 
`
<div>
    <p>Jour : </p>
    <p>Température max : </p>
    <p>Température min : </p>
    <p>Prévision : </p>
    <img src="" alt="">
</div>
`
*/