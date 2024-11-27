// Печатает число в консоль
function print(value) {
    console.log(value);
}

// Выводит большие числа в консоль
function printBig(value) {
    console.log(value.toPrecision(100).split('.')[0]);
}

// Возвращает случайное число в промежутке от min до max включительно
function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
    
// Возвращает простое число, в заданном диапазоне
function GenPrimeNum(min, max) {    
    // let min = a
    // let max = b

    // Функция для проверки, является ли число простым
    function isPrime(num) {
        for(let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++)
            if(num % i === 0) return false; 
        return num > 1;
    }
    
    // Функция для генерации всех простых чисел в заданном диапазоне
    function getPrimes(start, end) {
        let primes = [];
        for(let i = start; i <= end; i++) {
            if(isPrime(i)) {
                primes.push(i);
            }
        }
        return primes;
    }
    
    // Функция для генерации случайного числа в заданном диапазоне
    function getRandNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    // Функция для выбора случайного простого числа из массива
    function getRandPrime(start=min, end=max) {
        let primes = getPrimes(start, end);
        return primes[getRandNum(0, primes.length - 1)];
    }

    return(getRandPrime())
}

/*
Как связаны между собой открытый и закрытый ключ:

Открытый ключ состоит из двух частей: числа e (открытый экспонент) и n (модуль). 
Число e выбирается таким образом, чтобы оно было взаимно простым с функцией Эйлера φ(n), которая равна (p-1)*(q-1). 
Число n вычисляется как произведение двух простых чисел p и q.

Закрытый ключ также состоит из двух частей: числа d (закрытый экспонент) и того же n (модуль). 
Число d вычисляется как мультипликативное обратное к e по модулю φ(n). 
Это означает, что d удовлетворяет уравнению (d * e) % φ(n) = 1.
*/

// Функция для вычисления наибольшего общего делителя (НОД) двух чисел
function gcd(a, b) {
    // Если второе число равно 0, возвращаем первое число
    if (b == 0) {
        return a;
    }

    let rem = a % b
    // Иначе рекурсивно вызываем функцию gcd с параметрами b и остатком от деления a на b
    return gcd(b, rem);
}

// Функция для вычисления обратного элемента по модулю
function modInverse(e, phi) {
    let m0 = phi, t, q;
    let x0 = 0, x1 = 1;

    // Если phi равно 1, возвращаем 0
    if (phi == 1)
        return 0;

    // Пока e больше 1
    while (e > 1) {
        // q - это частное
        q = Math.floor(e / phi);

        t = phi;

        // phi теперь становится остатком от деления e на phi, процесс продолжается до тех пор, пока phi не станет равным 1
        phi = e % phi;
        e = t;

        t = x0;
        x0 = x1 - q * x0;
        x1 = t;
    }

    // Возвращаем положительное значение x1
    if (x1 < 0)
        x1 += m0;

    return x1;
}

// Функция для генерации ключей RSA
function generateRSAKeys(p, q) {
    // Вычисляем n как произведение p и q
    let n = p * q;

    // Вычисляем функцию Эйлера
    let phi = (p - 1) * (q - 1);

    // Выбираем e так, чтобы 1 < e < phi(n), и e и phi(n) взаимно просты
    let e = 3;
    while (gcd(e, phi) != 1) {
        e += 2;
    }

    // Вычисляем d как мультипликативное обратное к e по модулю phi
    let d = modInverse(e, phi);

    // Возвращаем пару ключей
    return {
        publicKey: {e: e, n: n},
        privateKey: {d: d, n: n}
    };
}

let p = 61
let q = 53

print("")
print("Простые числа p и q:")

console.log("p = " + p)
console.log("q = " + q)

// Пример использования функции generateRSAKeys
//let keys = generateRSAKeys(p, q);
let keys = generateRSAKeys(61, 53);

let n = keys.privateKey.n
let e = keys.publicKey.e
let d = keys.privateKey.d

//print(keys);

print("")
print("Открытый и закрытый ключ:")

console.log("n = " + n.toPrecision(100).split('.')[0])
console.log("e = " + e.toPrecision(100).split('.')[0])
console.log("d = " + d.toPrecision(100).split('.')[0])

/*
Немного объяснений:

n: Это модуль для обоих открытого и закрытого ключей. 
Он вычисляется как произведение двух простых чисел p и q, 
которые были выбраны в начале процесса генерации ключей.

e: Это открытый экспонент. Он является частью открытого ключа и 
используется для шифрования сообщений. e выбирается таким образом, 
чтобы он был взаимно простым с функцией Эйлера φ(n), которая равна (p-1)*(q-1).

d: Это закрытый экспонент. Он является частью закрытого ключа и 
используется для расшифровки сообщений. d вычисляется как мультипликативное 
обратное к e по модулю φ(n). Это означает, что d удовлетворяет 
уравнению (d * e) % φ(n) = 1.

Таким образом, открытый ключ RSA состоит из пары (e, n), а закрытый ключ - из пары (d, n). 

Открытый ключ используется для шифрования сообщений, а закрытый ключ - для их расшифровки.
*/

// Функция для возведения числа в степень по модулю
function powerMod(base, exponent, modulus) {
    if (modulus === 1) return 0;
    let result = 1;
    base = base % modulus;
    while (exponent > 0) {
        if (exponent % 2 === 1)  // Если степень нечетная, умножаем результат на основание по модулю
            result = (result * base) % modulus;
        // Делим степень на 2 и округляем вниз, при помощи сдвига битов числа
        exponent = exponent >> 1;
        // Умножаем основание на само себя по модулю
        base = (base * base) % modulus;
    }
    return result;
}

// Функция для шифрования текста с использованием открытого ключа
function encrypt(text, publicKey) {
    let {e, n} = publicKey;
    let encrypted = [];
    for (let i = 0; i < text.length; i++) {
        // Шифруем каждый символ текста путем возведения его кода в степень e по модулю n
        encrypted.push(powerMod(text.charCodeAt(i), e, n));
    }
    return encrypted;
}

// Функция для расшифровки текста с использованием закрытого ключа
function decrypt(encrypted, privateKey) {
    let {d, n} = privateKey;
    //print("d = " + d + ", n = " + n)
    let decrypted = "";
    for (let i = 0; i < encrypted.length; i++) {
        // Расшифровываем каждый символ текста путем возведения его кода в степень d по модулю n и преобразования обратно в символ
        let symbCode = powerMod(encrypted[i], d, n)
        //print(symbCode)
        decrypted += String.fromCharCode(symbCode);
    }
    return decrypted;
}

// Выводит коды символов текста
function TextToSymbol(text) {
    text.split('').forEach(element => {
        print(element + " : " + element.charCodeAt())
    });
}

/*
Как работает такое шифрование:

Сообщение посимвольно зашифровывается открытым ключом: Возводим код символа в степень e по модулю n

Сообщение расшифровывается так: Возведим его код в степень d по модулю n и преобразования обратно в символ
*/

// Пример использования функций encrypt и decrypt

print("")
print("Шифруем сообщение:")

// Сообщение
let text = "Hello World!";
print("Сообщение: " + text)

//TextToSymbol(text)

// Шифрование сообщения
let encrypted = encrypt(text, keys.publicKey);
print("Зашифрованное сообщение: " + encrypted)

// Расшифровка сообщения
let decrypted = decrypt(encrypted, keys.privateKey);
print("Расшифрованное сообщение: " + decrypted)

//TextToSymbol(decrypted)
