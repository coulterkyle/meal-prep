console.log('linked')

async function deleteMeals(id){
    if (id){
        deleteRequest = await fetch(`http://localhost:3001/api/recipes/${id}`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
        });
    }

}