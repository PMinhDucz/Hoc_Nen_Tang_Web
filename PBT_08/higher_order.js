function pipe(...fns) {
    return function(initialValue) {
        return fns.reduce((value, currentFunction) => currentFunction(value), initialValue);
    };
}

const processPipe = pipe(
    x => x * 2,
    x => x + 10,
    x => x.toString(),
    x => "Kết quả: " + x
);
console.log(processPipe(5));

function memoize(fn) {
    const cache = {};
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache[key] !== undefined) {
            return cache[key];
        }
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});

console.log(expensiveCalc(1000000));
console.log(expensiveCalc(1000000));

function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);

search("apple");
search("apple mac");
search("apple macbook");

async function retry(fn, maxAttempts = 3) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            if (attempt === maxAttempts) {
                throw error;
            }
            console.log(`Lỗi ở lần ${attempt}, đang thử lại...`);
        }
    }
}

const unstableApiCall = async () => {
    const rand = Math.random();
    if (rand < 0.7) {
        throw new Error("API sập");
    }
    return "Lấy data thành công!";
};

retry(unstableApiCall, 3)
    .then(res => console.log(res))
    .catch(err => console.log("Thất bại hoàn toàn:", err.message));
