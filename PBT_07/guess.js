const targetNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
const maxAttempts = 7;
let guessedNumbers = [];

while (attempts < maxAttempts) {
    let input = prompt(`Đoán số từ 1 đến 100 (Lượt ${attempts + 1}/${maxAttempts}):`);
    
    if (input === null) {
        alert("Bạn đã thoát game!");
        break;
    }
    
    let guess = parseInt(input);
    
    if (isNaN(guess) || guess < 1 || guess > 100) {
        alert("Vui lòng nhập một số hợp lệ từ 1 đến 100!");
        continue;
    }
    
    if (guessedNumbers.includes(guess)) {
        alert("Bạn đã đoán số này rồi! Vui lòng chọn số khác.");
        continue;
    }
    
    guessedNumbers.push(guess);
    attempts++;
    
    if (guess === targetNumber) {
        alert(`Đúng rồi! Bạn đoán đúng sau ${attempts} lần!`);
        break;
    } else if (guess < targetNumber) {
        alert("Cao hơn!");
    } else {
        alert("Thấp hơn!");
    }
    
    if (attempts === maxAttempts) {
        alert(`Bạn đã hết lượt! Đáp án đúng là ${targetNumber}.`);
    }
}
