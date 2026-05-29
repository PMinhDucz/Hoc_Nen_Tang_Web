const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

let rankCount = {
    Gioi: 0,
    Kha: 0,
    TrungBinh: 0,
    Yeu: 0
};

let highestStudent = null;
let lowestStudent = null;
let highestAvg = -1;
let lowestAvg = 11;

let sumMath = 0;
let sumPhysics = 0;
let sumCs = 0;

let sumMale = 0;
let countMale = 0;
let sumFemale = 0;
let countFemale = 0;

console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("|-----|--------|------|-------------|");

for (let i = 0; i < students.length; i++) {
    let s = students[i];
    let avg = s.math * 0.4 + s.physics * 0.3 + s.cs * 0.3;
    let rank = "";

    if (avg >= 8.0) {
        rank = "Giỏi";
        rankCount.Gioi++;
    } else if (avg >= 6.5) {
        rank = "Khá";
        rankCount.Kha++;
    } else if (avg >= 5.0) {
        rank = "Trung bình";
        rankCount.TrungBinh++;
    } else {
        rank = "Yếu";
        rankCount.Yeu++;
    }

    console.log(`| ${i + 1}   | ${s.name.padEnd(6)} | ${avg.toFixed(1)}  | ${rank.padEnd(11)} |`);

    if (avg > highestAvg) {
        highestAvg = avg;
        highestStudent = s.name;
    }

    if (avg < lowestAvg) {
        lowestAvg = avg;
        lowestStudent = s.name;
    }

    sumMath += s.math;
    sumPhysics += s.physics;
    sumCs += s.cs;

    if (s.gender === "M") {
        sumMale += avg;
        countMale++;
    } else {
        sumFemale += avg;
        countFemale++;
    }
}

console.log("\n--- THONG KE ---");
console.log(`Giỏi: ${rankCount.Gioi}, Khá: ${rankCount.Kha}, Trung bình: ${rankCount.TrungBinh}, Yếu: ${rankCount.Yeu}`);
console.log(`Cao nhất: ${highestStudent} (${highestAvg.toFixed(1)}), Thấp nhất: ${lowestStudent} (${lowestAvg.toFixed(1)})`);

let totalStudents = students.length;
console.log(`TB Toán: ${(sumMath / totalStudents).toFixed(1)}, TB Lý: ${(sumPhysics / totalStudents).toFixed(1)}, TB CS: ${(sumCs / totalStudents).toFixed(1)}`);
console.log(`TB Nam: ${(sumMale / countMale).toFixed(1)}, TB Nữ: ${(sumFemale / countFemale).toFixed(1)}`);
