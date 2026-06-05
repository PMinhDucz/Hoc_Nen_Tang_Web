function createCart() {
    let items = [];
    let currentDiscount = 0;
    let currentFixedDiscount = 0;

    return {
        addItem(product, quantity = 1) {
            const existing = items.find(i => i.id === product.id);
            if (existing) {
                existing.quantity += quantity;
            } else {
                items.push({ ...product, quantity });
            }
        },
        removeItem(productId) {
            items = items.filter(i => i.id !== productId);
        },
        updateQuantity(productId, newQuantity) {
            const existing = items.find(i => i.id === productId);
            if (existing) {
                if (newQuantity <= 0) {
                    this.removeItem(productId);
                } else {
                    existing.quantity = newQuantity;
                }
            }
        },
        getTotal() {
            let total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            if (currentDiscount > 0) {
                total -= total * currentDiscount;
            }
            if (currentFixedDiscount > 0) {
                total -= currentFixedDiscount;
            }
            return total > 0 ? total : 0;
        },
        applyDiscount(code) {
            currentDiscount = 0;
            currentFixedDiscount = 0;
            if (code === "SALE10") {
                currentDiscount = 0.10;
            } else if (code === "SALE20") {
                currentDiscount = 0.20;
            } else if (code === "FREESHIP") {
                currentFixedDiscount = 30000;
            }
        },
        printCart() {
            console.log("┌──────────────────────────────────────────────┐");
            console.log("│ # │ Sản phẩm      │ SL │ Đơn giá     │ Tổng        │");
            let sumBeforeDiscount = 0;
            items.forEach((item, index) => {
                const totalItem = item.price * item.quantity;
                sumBeforeDiscount += totalItem;
                const nameStr = item.name.padEnd(13);
                const qtyStr = item.quantity.toString().padStart(2);
                const priceStr = item.price.toLocaleString("vi-VN").padStart(10);
                const totalStr = totalItem.toLocaleString("vi-VN").padStart(10);
                console.log(`│ ${index + 1} │ ${nameStr} │ ${qtyStr} │ ${priceStr}  │ ${totalStr}  │`);
            });
            console.log("├──────────────────────────────────────────────┤");
            const finalTotal = this.getTotal();
            const totalStr = finalTotal.toLocaleString("vi-VN") + "đ";
            console.log(`│ Tổng cộng:                       ${totalStr.padStart(11)} │`);
            console.log("└──────────────────────────────────────────────┘");
        },
        getItemCount() {
            return items.reduce((sum, item) => sum + item.quantity, 0);
        },
        clearCart() {
            items = [];
            currentDiscount = 0;
            currentFixedDiscount = 0;
        }
    };
}

const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);

cart.printCart();

cart.applyDiscount("SALE10");
cart.printCart();

console.log("Số SP:", cart.getItemCount());
cart.removeItem(3);
console.log("Sau xóa:", cart.getItemCount());
