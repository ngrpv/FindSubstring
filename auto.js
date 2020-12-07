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

function GetTable(t){
    m = t.length;
    alph = new Array()
    for (i = 0; i < m; i++)
        alph[t.charAt(i)] = 0
    del = new Array(m + 1)
    for (j = 0; j <= m; j++)
        del[j] = new Array()
    for (i in alph)
        del[0][i] = 0
    for (j = 0; j < m; j++) {
        prev = del[j][t.charAt(j)]
        del[j][t.charAt(j)] = j + 1
        for (i in alph)
            del[j + 1][i] = del[prev][i]
    }
    return del;
}

//console.log(GetTable(pattern));
function FindSubstring(pattern,text){
    var table = GetTable(pattern);
    var position = 0;
    var indexArray = new Array();
    textLength = text.length;
    for(var i = 0;i<textLength;i++) {
        if(table[position][text[i]] != null){
            position = table[position][text[i]];
        }else{
            position = 0;
        }
        //console.log(position);
        if(position == pattern.length)
            indexArray.push(i-pattern.length+1);
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
console.log("Automata:")
console.log(FindSubstring(pattern,inputText));
console.log("Average execution time: " + CalcAverageExecTime(FindSubstring, new Array(pattern, inputText), 50) + " ms");
