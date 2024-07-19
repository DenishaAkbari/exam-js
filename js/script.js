const storage = [
    { 
        id: 1,
        name: "jumbo burger", 
        price: 150,
        Image: "img/1.avif"
    },
    {   id: 2,
        name: "mini burger", 
        price: 100 ,
        Image: "img/2.avif"
    },
    { 
        id: 3, 
        name: "small burger", 
        price: 75 ,
        Image: "img/3.avif"
    },
    { 
        id: 4, 
        name: "medium burger",
        price: 120 ,
        Image: "img/4.avif"
    },
];

const displayData = document.getElementById("displaydata");
const tbody = document.getElementById("tbody");
let cardStorage = JSON.parse(localStorage.getItem("card")) || [];

const addToCart = (id) => {
    const selectedItem = storage.find(item => item.id === id);
    if (selectedItem) {
        const existingItem = cardStorage.find(item => item.id === id);
        if (existingItem) {
            existingItem.qty += 1;
        } else {
            selectedItem.qty = 1;
            cardStorage.push(selectedItem);
        }
        remove();
        localStorage.setItem("card", JSON.stringify(cardStorage));
    }
};

const removeFromCart = (id) => {
    const existingItem = cardStorage.find(item => item.id === id);
    if (existingItem) {
        if (existingItem.qty > 1) {
            existingItem.qty -= 1;
        } else {
            cardStorage = cardStorage.filter(item => item.id !== id);
        }
        remove();
        localStorage.setItem("card", JSON.stringify(cardStorage));
    }
};

const remove = () => {
    tbody.innerHTML = '';
    cardStorage.forEach(item => {
        tbody.innerHTML += `<tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.qty}</td>
           
            <td><button onclick="removeFromCart(${item.id})">Remove</button></td>
        </tr>`;
    });
};

const display = () => {
    storage.forEach(element => {
        displayData.innerHTML += `
            <div class="col-3">
                <div class="card" style="width: 18rem;">
                    <img src="img/1.avif" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${element.name}</h5>
                        <p class="card-text">Delicious burgers for every craving.</p>
                        <button onclick="addToCart(${element.id})">Add to cart</button>
                        <button>${element.price}$</button>
                    </div>
                </div>
            </div>`;
    });
};
display();
remove();
