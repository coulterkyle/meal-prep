const searchParam = document.getElementById('searchInput');
const submitBtn = document.getElementById('search-button')


const result = submitBtn.addEventListener('click', searchEvent);



async function searchEvent(event) {
    event.preventDefault();
    const search = searchParam.value;
    if (search) {
        window.location.href = `/recipes/${search}`
        console.log("hello world", result)
    }
};
