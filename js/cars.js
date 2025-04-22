async function get_cars() {
    let response = await fetch("http://localhost:8000/api/car/all")

    if (response.ok) {
        let json = await response.json()
        return json
    } else {
        alert("Ошибка HTTP: " + response.status)
    }
}

async function render_cars() {
    let template = '<div class="card" style="max-width: 350px;">'
    +'<img src="{КАРТИНКА}" class="card-img-top" alt="...">'
    +'<div class="card-body">'
    +'<h5 class="card-title">{МАРКА}</h5>'
    +'<p class="card-text">{ХАРАКТЕРИСТИКИ АВТОМОБИЛЯ}</p>'
    +'<p class="card-text">{ЦЕНА}</p>'
    +'<a class="btn btn-warning">Купить(но у тебя нет денег, а у нас нет машин.)</a>'
    +'</div>'
    +'</div>'
    let cars = await get_cars()
    let container = document.getElementById("cars")
    cars.forEach(element => {
        car = template
        car = car.replace("{МАРКА}", element.name)
        car = car.replace("{ХАРАКТЕРИСТИКИ АВТОМОБИЛЯ}", element.description)
        car = car.replace("{ЦЕНА}", element.price)
        car = car.replace("{КАРТИНКА}", element.photo)
        container.innerHTML += car
    })
}
render_cars()
