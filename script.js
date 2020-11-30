fs = require('fs');
var fileName = process.argv[2];
var patternName = process.argv[3];
try {
    fs.statSync(fileName);
} catch (err) {
    if (err.code === 'ENOENT') {
        console.log('file does not exists')
        process.exit();
    }
}
var pattern = fs.readFileSync(patternName);
var inputText = fs.readFileSync(fileName);
inputText = inputText.toString();
pattern = pattern.toString();
console.log("Pattern: " + pattern);
function IsMatched(substring, pattern) {
    for (var i = 0; i < pattern.length; i++) {
        if (pattern[i] != substring[i])
            return false;
    }
    return true;
}

function FindSubstring_BruteForce(pattern, text) {
    var indexArray = new Array();
    var patternLength = pattern.length;
    var textLength = text.length;
    for (var i = 0; i <= textLength - patternLength; i++) {
        var flag = false;
        if (IsMatched(text.substring(i, i + patternLength), pattern))
            indexArray.push(i + 1);
    }
    return indexArray;
}

function FindSubstring_SumCharCodes(pattern, text) {
    var indexArray = new Array();
    var patternLength = pattern.length;
    var textLength = text.length;
    var patternHash = 0;
    var substringHash = 0;
    for (var i = 0; i < patternLength; i++) {
        patternHash += pattern.charCodeAt(i);
        substringHash += text.charCodeAt(i);
    }
    for (var i = 0; i <= textLength - patternLength; i++) {
        if (patternHash == substringHash)
            if (IsMatched(text.substring(i, i + patternLength), pattern))
                indexArray.push(i + 1);
        substringHash -= text.charCodeAt(i);
        substringHash += text.charCodeAt(i + patternLength);
    }
    return indexArray;
}

function FindSubstring_RabinKarpsAlgorithm(pattern, text) {
    var indexArray = new Array();
    var patternLength = pattern.length;
    var textLength = text.length;
    var patternHash = 0;
    var substringHash = 0;
    for (var i = 0; i < patternLength; i++) {
        patternHash += pattern.charCodeAt(i) * Math.pow(2, patternLength - i - 1);
        substringHash += text.charCodeAt(i) * Math.pow(2, patternLength - i - 1);
    }
    for (var i = 0; i <= textLength - patternLength; i++) {
        if (patternHash == substringHash) {
            if (IsMatched(text.substring(i, i + patternLength), pattern)) {
                indexArray.push(i + 1);
            }
        }
        substringHash = (substringHash - text.charCodeAt(i) * Math.pow(2, patternLength - 1)) * 2 + text.charCodeAt(i + patternLength);
    }
    return indexArray;
}

function FindSubstring_QuadraticHash(pattern, text) {
    var indexArray = new Array();
    var patternLength = pattern.length;
    var textLength = text.length;
    var patternHash = 0;
    var substringHash = 0;
    for (var i = 0; i < patternLength; i++) {
        patternHash += pattern.charCodeAt(i) * pattern.charCodeAt(i);
        substringHash += text.charCodeAt(i) * text.charCodeAt(i);
    }
    for (var i = 0; i <= textLength - patternLength; i++) {
        if (patternHash == substringHash) {
            if (IsMatched(text.substring(i, i + patternLength), pattern)) {
                indexArray.push(i + 1);
            }
        }
        substringHash = substringHash - text.charCodeAt(i) * text.charCodeAt(i) + text.charCodeAt(i + patternLength) * text.charCodeAt(i + patternLength);
    }
    return indexArray;
}

function CalcAverageExecTime(func, args, countOfIteration) {
    var start = (new Date()).getTime();
    for (var i = 0; i < countOfIteration; i++) {
        func(args[0], args[1]);
    }
    var end = (new Date()).getTime();
    return (end - start) / countOfIteration;
}

console.log("Brute-force:")
console.log(FindSubstring_BruteForce(pattern, inputText));
console.log("Average execution time: " + CalcAverageExecTime(FindSubstring_BruteForce, new Array(pattern, inputText), 50) + " ms");

console.log();
console.log("Хэш - функция: Сумма кодов символов")
console.log(FindSubstring_SumCharCodes(pattern, inputText));
console.log("Average execution time: " + CalcAverageExecTime(FindSubstring_SumCharCodes, new Array(pattern, inputText), 50) + " ms");

console.log();
console.log("Алгоритм Рабина-Карпа:")
console.log(FindSubstring_RabinKarpsAlgorithm(pattern, inputText));
console.log("Average execution time: " + CalcAverageExecTime(FindSubstring_RabinKarpsAlgorithm, new Array(pattern, inputText), 50) + " ms");

console.log();
console.log("Квадратичный хэш:")
console.log(FindSubstring_QuadraticHash(pattern,inputText));
console.log("Average execution time: " + CalcAverageExecTime(FindSubstring_QuadraticHash, new Array(pattern, inputText), 50) + " ms");
