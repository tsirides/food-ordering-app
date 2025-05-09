import menuArray from "./data.js";

const menu = document.getElementById("menu");
const order = document.getElementById("your-order");
const orderTotal = document.getElementById("order-total");
const priceTotal = document.getElementById("total");
const modal = document.querySelector(".modal-container");
const orderList = [];

function getItems() {
  return menuArray.map((item) => {
    const { emoji, name, ingredients, price, id } = item;

    return `<div id='item' class="item" data-item-id=${id}>
                <div class='item-details'>
                    <div class="photo">${emoji}</div>
                    <div class="description">
                        <div class="product-name">${name}</div>
                        <div class="ingredients">${ingredients}</div>
                        <div class="product-price">$${price}</div>
                    </div>
                </div>
                <div>
                    <button class="add-product" data-btn-id=${item.id}>&plus;</button>
                </div>
        </div>
    `;
  });
}

menu.innerHTML = getItems().join("");

function getOrder() {
  return orderList.map((item) => {
    const { name, price, id } = item;

    return `
            <div class=order-item>
                <div class="order-name">
                    <div class='order-item-name'>${name}</div>
                    <button data-remove-btn=${id}>REMOVE</button>
                </div>
                <div class="order-price">
                    $${price}
                </div>
            </div>
        `;
  });
}

function render() {
  order.innerHTML = getOrder().join("");
  const totalPrice = orderList?.reduce((acc, curr) => acc + curr.price, 0);
  console.log(totalPrice);
  priceTotal.innerHTML = `
    <div class="price-total">
        <h3>Total Price:</h3>
        <div>$${totalPrice}</div>
    </div>
    <div class="complete-order"><button class="complete-button">Complete order</button></div>
    `;
}

function handleAddItem(itemId) {
  const targetItem = menuArray.filter((item) => {
    return itemId == item.id;
  })[0];

  orderList.push(targetItem);
  render();
  return targetItem;
}

function handleRemoveItem(itemId) {
  const targetItem = orderList.filter((item) => {
    return itemId == item.id;
  })[0];

  orderList.splice(orderList.indexOf(targetItem), 1);
  render();
}

document.addEventListener("click", (e) => {
  if (e.target.dataset.btnId) {
    handleAddItem(e.target.dataset.btnId);
  } else if (e.target.dataset.removeBtn) {
    handleRemoveItem(e.target.dataset.removeBtn);
  } else if (e.target.className === "complete-button") {
    modal.classList.toggle("hidden");
  }
  //Check if the orderList length is greater that 0 and toggle the hidden class
  orderTotal.classList.toggle("hidden", orderList.length === 0);
});
