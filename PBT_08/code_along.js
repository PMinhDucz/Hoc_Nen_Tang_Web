function createCart(){
    let items = [];
    return{
        addItem(name, price){
            items.push({name, price});
            console.log(`🛒 Đã thêm: ${name}`);
        },
        getTotal(){
            return items.reduce((sum, item) => sum + item.price, 0);
        },
        printCart(){
            console.table(items);
            console.log(`Tổng tiền: ${this.getTotal()} đ`);

        },
        removeItem(name){
            items = items.filter(item => item.name !== name);
            console.log(`❌ Đã xóa: ${name}`);
        }
    };
}

const myCart = createCart();
myCart.addItem("iPhone 16", 25000);
myCart.addItem("AirPods", 5000);
myCart.addItem("Ốp lưng", 200);
myCart.printCart();
myCart.removeItem("Ốp lưng");
myCart.printCart();
console.log("Truy cập trộm:", myCart.items);