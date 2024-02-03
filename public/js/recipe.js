const searchParam = document.getElementById('searchInput');
const submitBtn = document.getElementById('search-button')
const addToButton = document.querySelectorAll('#add-recipe')

for (let i = 0; i < addToButton.length; i++){
    addToButton[i].addEventListener('click', addToMeals);
}


async function addToMeals(event) {
    event.preventDefault();
    const recipeIdentifier = document.querySelector("#classIdentifier").className;
    const search = recipeIdentifier;
    let getRequest;
    if (search) {
        getRequest = await fetch('http://localhost:3001/api/recipes', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({search})

        });
            console.log(getRequest)
        }
        if (getRequest) {
            // const receivedData = await getRequest.json()
            console.log(getRequest)
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
    const search = searchParam.value;
    if (search) {
        window.location.href = `/recipes/${search}`
    }
};
