console.log('linked')

async function deleteMeals(id){
    if (id){
        const deleteRequest = await fetch(`http://localhost:3001/api/recipes/${id}`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
        });

        if (deleteRequest.ok){
            const rePopulate = await fetch('/mymeals', {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
            })
        }
        document.location.assign('/mymeals');
    }
}