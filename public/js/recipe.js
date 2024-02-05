const searchParam = document.getElementById('searchInput');
const submitBtn = document.getElementById('search-button')
const addToButton = document.querySelectorAll('#add-recipe')

// for (let i = 0; i < addToButton.length; i++){
//     addToButton[i].addEventListener('click', addToMeals(this.className));
// }

function changeBtn(uri){
    const btnToChange = document.getElementById(uri);
    btnToChange.setAttribute("disabled", "disabled;");
    btnToChange.textContent = "Recipe Added! ✅";
    
}

async function addToMeals(uri) {
    const search = uri;
    let getRequest;
    if (search) {
        getRequest = await fetch('/api/recipes', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({search})

        });
            console.log(getRequest)
        }
        if (getRequest) {
            // const receivedData = await getRequest.json()
            console.log(getRequest)
            changeBtn(uri);
        //     alert("ok")
        //     saveRequest = await fetch(`/api/recipe/${search}`, {
        //         method: "POST",
        //         body: getRequest,
        //         headers: { 'Content-Type': 'application/json' }
        //     })
        }
        // alert(saveRequest)
    // }
}


const result = submitBtn.addEventListener('click', searchEvent);

async function searchEvent(event) {
    event.preventDefault();
    healthSpec = []
    const checkboxes = document.getElementsByName('health')
    for(let i = 0; i < checkboxes.length; i++){
        if(checkboxes[i].checked == true){
            healthSpec.push(checkboxes[i].value)
        }
    }

    let stringWithCommas = healthSpec.toString()
    let stringWithoutCommas = stringWithCommas.split(',').map(s => s.trim()).join('');

    const selectElement = document.querySelector('#meal-select');
    let mealSelect = selectElement.value

    const search = searchParam.value+=mealSelect+=stringWithoutCommas;
    if (search) {
        window.location.href = `/recipes/${search}`
    }
};
