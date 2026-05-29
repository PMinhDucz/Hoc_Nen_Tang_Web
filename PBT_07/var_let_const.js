console.log("=== Kiem chung cau A1 ===");

console.log("Doan 1: var hoisting");
console.log(x); 
var x = 5;

console.log("\nDoan 2: let trong TDZ");
try {
    console.log(y); 
} catch (e) {
    console.log("Loi xay ra: " + e.message);
}
let y = 10;


console.log("\nDoan 3: const gan lai");
const z = 15;
try {
    z = 20; 
} catch (e) {
    console.log("Loi xay ra: " + e.message);
}
console.log(z); 


console.log("\nDoan 4: const mang");
const arr = [1, 2, 3];
arr.push(4);
console.log(arr); 


console.log("\nDoan 5: Block scope");
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a); 
}
console.log("Ngoai block:", a); 
