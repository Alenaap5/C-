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
    let template = 
    '<tr>'
        + '<th scope="row">{ИД}</th>'
        + '<td><img src="{КАРТИНКА}" width="50px" class="img-fluid rounded-start" alt="..."></td>'
        + '<td>{МАРКА}</td>'
        + '<td>{ХАРАКТЕРИСТИКИ АВТОМОБИЛЯ}</td>'
        + '<td>{ЦЕНА} Р</td>'
        + '<td>'
        +  '<button class="btn btn-danger" onclik = "delete_car({ИД})">🗑️</button>' 
        + '</td>'
    + '</tr>'
    let cars = await get_cars()
    let container = document.getElementById("cars")
    cars.forEach(element => {
        car = template
        car = car.replace("{ИД}", element.id)
        car = car.replace("{МАРКА}", element.name)
        car = car.replace("{ХАРАКТЕРИСТИКИ АВТОМОБИЛЯ}", element.description)
        car = car.replace("{ЦЕНА}", element.price)
        car = car.replace("{КАРТИНКА}", element.photo)
        container.innerHTML += car
    })
}
render_cars()