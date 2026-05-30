const items = [
    { name: "Phở bò", quantity: 2, price: 65000 },
    { name: "Trà đá", quantity: 3, price: 5000 },
    { name: "Bún chả", quantity: 1, price: 55000 }
];
const isWednesday = true; 

let subtotal = 0;
for (let i = 0; i < items.length; i++) {
    subtotal += items[i].price * items[i].quantity;
}

let discountPercent = 0;
if (subtotal > 1000000) {
    discountPercent = 15;
} else if (subtotal > 500000) {
    discountPercent = 10;
}

if (isWednesday) {
    discountPercent += 5;
}

let discountValue = (subtotal * discountPercent) / 100;
let afterDiscount = subtotal - discountValue;

let vatValue = (afterDiscount * 8) / 100;
let tipValue = (subtotal * 5) / 100;

let total = afterDiscount + vatValue + tipValue;

console.log("╔══════════════════════════════════════╗");
console.log("║        HÓA ĐƠN NHÀ HÀNG              ║");
console.log("╠══════════════════════════════════════╣");

for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let itemTotal = item.price * item.quantity;
    let nameStr = `${i + 1}. ${item.name}`.padEnd(16);
    let qtyStr = `x${item.quantity}`.padEnd(5);
    let priceStr = `@${item.price / 1000}k`.padEnd(5);
    let itemTotalStr = `= ${itemTotal / 1000}k`.padEnd(7);
    console.log(`║ ${nameStr} ${qtyStr} ${priceStr} ${itemTotalStr} ║`);
}

console.log("╠══════════════════════════════════════╣");
console.log(`║ Tổng cộng:              ${subtotal.toLocaleString("vi-VN")}đ     ║`);
console.log(`║ Giảm giá (${discountPercent}%):           ${discountValue.toLocaleString("vi-VN")}đ     ║`);
console.log(`║ VAT (8%):                ${vatValue.toLocaleString("vi-VN")}đ     ║`);
console.log(`║ Tip (5%):                ${tipValue.toLocaleString("vi-VN")}đ     ║`);
console.log("╠══════════════════════════════════════╣");
console.log(`║ THANH TOÁN:              ${total.toLocaleString("vi-VN")}đ    ║`);
console.log("╚══════════════════════════════════════╝");
