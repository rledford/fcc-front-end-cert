//*****************************************************************************************************
//BEGINNER

//PALENDROME
function palindrome(str) {
	//ignore case and spaces and punctuation
	var re = /\s|_|-|\W/g;
	var s = str.replace(re, '').toLowerCase();
	console.log("replaced: " + s);
	var iters = s.length / 2;
	if (s.length % 2 !== 0) {
		iters++;
	}
	for (var i = 0; i < iters; i++) {
		if (s[i] != s[s.length - (1 + i)]) {
			console.log("not a palendrome");
			return false;
		}
	}
	console.log("this is a palendrome");
	return true;
}
palindrome("A man, a plan, a canal. Panama");

//LONGEST WORD
function findLongestWord(str) {
	//number return value required (not the string)
	var s = str.split(' ');
	s.sort(function (a, b) {
		return b.length - a.length;
	});
	console.log(s[0]);
	return s[0].length;
}
var inString = "this is a test of the lake charles public emergency warning system";
findLongestWord(inString);

//TITLE CASE SENTENCE
function titleCase(str) {
	var s = str.toLowerCase().split(' ');
	var re = /^\S/;
	for (var i = 0; i < s.length; i++) {
		console.log(s[i][0].toUpperCase());
		s[i] = s[i].replace(re, s[i][0].toUpperCase());
	}
	return s.join(' ');
}
titleCase("I'm a little tea pot");

//LARGEST OF FOUR
function largestOfFour(arr) {
	var retArr = [];
	var n;
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].length > 0) {
			for (var j = 0; j < arr[i].length; j++) {
				if (j === 0) {
					n = arr[i][j];
					continue;
				}
				if (arr[i][j] > n) {
					n = arr[i][j];
				}
			}
			console.log("larget of group: " + n);
			retArr.push(n);
		}
	}
	return retArr;
}
largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);

//CONFIRM ENDING
function confirmEnding(str, target) {
	var s = str.split(' ');
	var re = RegExp(target + "$");
	var clean = s[s.length - 1].replace(/\W/g, '').match(re);
	console.log(clean);
	return clean !== null;
}
confirmEnding("He has to give me a new name", "na");

//REPEAT STRING A NUMBER OF TIMES
function repeatStringNumTimes(str, num) {
	if (num <= 0)
		return "";
	var retArr = [];
	for (var i = 0; i < num; i++) {
		retArr.push(str);
	}
	return retArr.join('');
}
repeatStringNumTimes("abc", 3);

//TRUNCTATE A STRING
function truncateString(str, num) {
	var len = str.length;
	if (len <= num)
		return str;
	if (len > num) {
		if (num <= 3) {
			return str.slice(0, num) + "...";
		} else {
			if (len - 3 <= num) {
				return str.slice(0, len - 3) + "...";
			} else {
				return str.slice(0, num - 3) + "...";
			}
		}
	}
}
truncateString("A-tisket a-tasket A green and yellow basket", 11);

//CHUNCK ARRAY IN GROUPS
function chunkArrayInGroups(arr, size) {
	var chuncks = [];
	for (var i = 0; i < arr.length; i += size) {
		var set = [];
		for (var j = 0; j < size; j++) {
			if (i + j < arr.length) {
				set.push(arr[i + j]);
			} else {
				break;
			}
		}
		chuncks.push(set);
	}
	return chuncks;
}
chunkArrayInGroups(["a", "b", "c", "d"], 2);

//CUT HEAD OFF ARRAY
function slasher(arr, howMany) {
	var ret = [];
	for (var i = howMany; i < arr.length; i++) {
		ret.push(arr[i]);
	}
	return ret;
}

//CHECK IF ALL ITEMS OF SECOND ELEMENT ARE IN FIRST
function mutation(arr) {
	var left = arr[0].toLowerCase();
	var right = arr[1].toLowerCase();
	for (var i = 0; i < right.length; i++) {
		var re = RegExp(right[i]);
		if (left.match(re) === null) {
			return false;
		}
	}
	return true;
}

//FILTER FALSE
function filterFalse(value) {
	return Boolean(value);
}
function bouncer(arr) {
	return arr.filter(filterFalse);
}

//FILTER MULTIPLE ARGS
function f(value) {
	return !this.includes(value);
}
function destroyer(arr) {
	var args = [];
	for (var i = 1; i < arguments.length; i++) {
		args.push(arguments[i]);
	}
	return arr.filter(f, args);
}
destroyer([1, 2, 3, 1, 2, 3], 2, 3);

//FIND PLACE FOR NUMBER
function getIndexToIns(arr, num) {
	var sorted = arr.sort(function (a, b) {
			return a - b;
		});
	for (var i = 0; i < sorted.length; i++) {
		if (num <= sorted[i]) {
			return i;
		}
	}
	return sorted.length;
}

//CAESAR CYPHER
var minCode = "A".charCodeAt(0);
var maxCode = "Z".charCodeAt(0);
var shift = 13;
function getNewCode(code) {
	var c = (code + shift) % maxCode;
	if (c === 0) {
		c = maxCode;
	} else if (c < minCode) {
		c += minCode - 1;
	}
	return c;
}
function rot13(str) {
	var out = [];
	for (var i = 0; i < str.length; i++) {
		var code = str.charCodeAt(i);
		if (code >= minCode && code <= maxCode) {
			code = getNewCode(code);
			out.push(String.fromCharCode(code));
		} else {
			out.push(str[i]);
		}
	}
	return out.join('');
}

//***********************************************************************************************************************************
//ITERMEDIATE

//SUM NUMBERS IN RANGE
function sumAll(arr) {
	var min = function (a, b) {
		return Math.min(a, b);
	};
	var max = function (a, b) {
		return Math.max(a, b);
	};
	var start = arr.reduce(min);
	var end = arr.reduce(max);
	console.log(start + ":" + end);
	var result = 0;
	for (var i = 0; i <= end - start; i++) {
		result += start + i
	}
	return result;
}

//DIFFERENCES BETWEEN TWO ARRAYS
function diffArray(arr1, arr2) {
	var newArr = [];

	if (arr1.length === 0 || arr2.legth === 0) {
		return arr1.length !== 0 ? arr1 : arr2;
	}

	newArr = (arr1.filter(function (value) {
			return arr2.indexOf(value) < 0;
		}));

	newArr = newArr.concat(arr2.filter(function (value) {
				return arr1.indexOf(value) < 0;
			}));

	return newArr;
}

//TO ROMAN NUMERAL
function convertToRoman(num) {
	var str = [];
	var n = num;
	while (n >= 1000) {
		str.push("M");
		n -= 1000;
	}
	if (n >= 900) {
		str.push("CM");
		n -= 900;
	}
	if (n >= 500) {
		str.push("D");
		n -= 500;
		while (n > 500) {
			str.push("C");
			n -= 100;
		}
	}
	if (n >= 400) {
		str.push("CD");
		n -= 400;
	}
	while (n >= 100) {
		str.push("C");
		n -= 100;
	}
	if (n >= 90) {
		str.push("XC");
		n -= 90;
	}
	if (n >= 50) {
		str.push("L");
		n -= 50;
	}
	if (n >= 40) {
		str.push("XL");
		n -= 40;
	}
	while (n >= 10) {
		str.push("X");
		n -= 10;
	}
	if (n >= 9) {
		str.push("IX");
		n -= 9;
	}
	if (n >= 5) {
		str.push("V");
		n -= 5;
		while (n > 5) {
			str.push("I");
			n--;
		}
	}
	if (n >= 4) {
		str.push("IV");
		n -= 4;
	}
	while (n >= 1) {
		str.push("I");
		n--;
	}
	return str.join('');
}

//COLLECTION ITEM NEEDS TO MATCH WHAT SOURCE HAS
function whatIsInAName(collection, source) {
	var arr = [];
	var props = Object.getOwnPropertyNames(source);
	var needs = props.length;
	collection.forEach(function (obj) {
		var has = 0;
		props.forEach(function (p) {
			if (obj.hasOwnProperty(p) && obj[p] === source[p]) {
				has++;
			}
		});
		if (has === needs) {
			arr.push(obj);
		}
	});
	return arr;
}

//REPLACE WORDS IN SENTENCE AND KEEP PREVIOUS WORDS CASE
function myReplace(str, before, after) {
	s = str.split(' ');
	i = str.indexOf(before);
	for (var i in s) {
		if (s[i] !== before)
			continue;
		if (s[i][0].toLowerCase() !== s[i][0]) {
			s[i] = after;
			s[i] = s[i][0].toUpperCase() + after.slice(1);
		} else {
			s[i] = after;
		}
	}
	return s.join(' ');
}

//PIG LATIN
var vowels = ['a', 'e', 'i', 'o', 'u']; //sometimes... 'y'

function translatePigLatin(str) {
	if (vowels.indexOf(str[0]) >= 0) {
		return str + "way";
	} else {
		var index = 0;
		for (var i in str) {
			if (vowels.indexOf(str[i]) < 0) {
				index++;
			} else {
				break;
			}
		}
		return str.substr(i) + str.substr(0, i) + "ay";
	}
}

//DNA PAIRING
function pairElement(str) {
	var base = str.split('');
	var pairs = [];
	var lower;
	for (var i in base) {
		lower = base[i].toLowerCase();
		if (lower === "g") {
			pairs.push(["G", "C"]);
		} else if (lower === "c") {
			pairs.push(["C", "G"]);
		} else if (lower === "t") {
			pairs.push(["T", "A"]);
		} else if (lower === "a") {
			pairs.push(["A", "T"]);
		}
	}
	return pairs;
}

//MISSING LETTER IN SEQUENCE
function fearNotLetter(str) {
	var start = str.charCodeAt(str[0]);
	for (var i = 0; i < str.length; i++) {
		if (str.charCodeAt(i) !== start + i) {
			return String.fromCharCode(start + i);
		}
	}
	return undefined;
}

//CHECK IF REAL BOOLEAN TYPE
function booWho(bool) {
	return (bool === true || bool === false);
}

//UNIQUE UNION
function uniteUnique(arr) {
	var union = [];
	for (var i = 0; i < arguments.length; i++) {
		arguments[i].forEach(function (val) {
			if (union.indexOf(val) < 0) {
				union.push(val);
			}
		});
	}
	return union;
}

//CONVERT SOME SPECTIAL CHARACTERS TO HTML
var dict = {
	"&" : "amp",
	"<" : "lt",
	">" : "gt",
	"\"" : "quot",
	"\'" : "apos"
}

function convertHTML(str) {
	// &colon;&rpar;
	return str.replace(/&|<|>|\"|\'/g, function (s) {
		return ("&" + dict[s] + ";");
	});
};

//CONVERT STRING TO SPINAL CASE
function spinalCase(str) {
	var chars = str.replace(/\s|_/g, '-').split('');
	var ret = [];
	chars.forEach(function (c, i) {
		if (c.toLowerCase() !== c) {
			if (i > 0 && ret[i - 1] !== "-") {
				ret.push("-" + c);
			} else {
				ret.push(c);
			}
		} else {
			ret.push(c);
		}
	});
	return ret.join('').toLowerCase();
}

//SUM ALL ODD FIBONOCCI NUMBERS
function sumFibs(num) {
	var fib = 1;
	var last = 0;
	var result = 0;
	var sum = 1;
	while (fib < num) {
		result = last + fib;
		last = fib;
		fib = result;
		if (fib <= num && fib % 2 !== 0) {
			sum += fib;
		}
	}
	return sum;
}

//SUM ALL PRIMES
function sumPrimes(num) {
	if (num <= 1)
		return 0;
	var sum = 0;
	for (var i = num; i > 1; i--) {
		var divs = 0;
		for (var j = 1; j <= num; j++) {
			if (i % j === 0) {
				//it's divisible
				divs++;
				if (divs > 2) {
					break;
				}
			}
		}
		if (divs === 2) {
			sum += i;
		}
	}
	return sum;
}

//FIND COMMON MULTIPLE IN RANGE
function smallestCommons(arr) {
	start = arr[0] < arr[1] ? arr[0] : arr[1];
	end = arr[1] > arr[0] ? arr[1] : arr[0];
	var mult = 1;
	var needs = (end - start) + 1;
	while (true) {
		has = 0;
		for (var i = start; i <= end; i++) {
			if (mult % i === 0) {
				has++;
			}
		}
		if (has === needs) {
			return mult;
		}
		mult++;
	}
}

//FIND FIRST ELEMENT THAT SATISFIES THE FUNCTION
function findElement(arr, func) {
	for (var i in arr) {
		if (func(arr[i])) {
			return arr[i];
		}
	}
	return undefined;
}

//DROP ELEMENTS UNTIL PROVIDED FUNCTION RETURNS TRUE
function dropElements(arr, func) {
	for (var i in arr) {
		if (func(arr[i])) {
			return arr.slice(i);
		}
	}
	return [];
}

//GET ALL ITEMS INTO ONE ARRAY (INCLUDING ONES IN A SUBARRAY)
function extract(arr, out) {
	for (var i in arr) {
		if (Array.isArray(arr[i])) {
			extract(arr[i], out);
		} else {
			out.push(arr[i]);
		}
	}
	return out;
}

function steamrollArray(arr) {
	return extract(arr, []);
}

//CONVERT BINARY TO LETTERS
function binaryAgent(str) {
	var bytes = str.split(' ');
	var words = [];
	bytes.forEach(function (byte) {
		var value = 0;
		for (var i = 0; i < byte.length; i++) {
			value += Number(byte[i]) * Math.pow(2, 7 - i);
		}
		words.push(String.fromCharCode(value));
	});
	return words.join('');

	//CHECK VALID PROPERTY AND VALUE
	function truthCheck(collection, pre) {
		for (var i = 0; i < collection.length; i++) {
			if (!collection[i].hasOwnProperty(pre)) {
				return false;
			} else {
				if (!collection[i][pre]) {
					return false;
				}
			}
		}
		return true;
	}
}

//ADD TOGETHER
function addTogether(){
	var sum = 0;
	for(var i in arguments){
		if(typeof(arguments[i])!=="number"){
			console.log("not a number");
			return undefined;
		}
		else{
			if(arguments.lent === 1){
				console.log("only arg: "+arguments[i]);
				sum = arguments[i];
				return function(num=0){
					console.log("returned sum: "+(sum+num));
				}
			}
			else{
				sum += arguments[i];
			}
		}
	}
	console.log(sum);
	return sum;
}

//VALIDATE US PHONE NUMBER
function telephoneCheck(str) {
    if (!parseInt(str[0],10)){
        if (str[0] !== '('){
            return false;
        }
    }
    var n= /\d/g;
    var p= /\d|\(|\)/g;
    var base = str.match(n).join('');
    var par = str.match(p).join('');
    var p1 = -1;
    var p2 = -1;
    console.log(base);
    if (base.length === 10){
        console.log("added 1 to beginning");
        base = "1"+base;
        par = "1"+par;
    }
    else if(base.length === 11){
        if (base[0] !== "1"){
            console.log("invalid country code");
            return false;
        }
    }
    else{
        console.log("invalid number of digits");
        return false;
    }
    p1 = par.indexOf('(');
    p2 = par.lastIndexOf(')');
    if (p1 >= 0 || p2 >= 0){
        console.log("contains parenthases");
        console.log(par);
        if (p1 >= 0 && p2 >= 0){
            if(p1 !== 1){
                return false;
            }
            else{
                if (p2 !== 5){
                    return false;
                }
            }
        }
        else{
            return false;
        }
    }
    return true;
}

//SYMETRIC DIFFERENCE
function sym(){
    if (arguments.length < 2){
        return [];
    }
    var arr = [];
    var i;
    if (arguments.length === 2){
        var val;
        for (i = 0; i < arguments[0].length; i++){
            val = arguments[0][i];
            if (arguments[1].indexOf(val) === -1){
                if (arr.indexOf(val) === -1){
                    arr.push(arguments[0][i]);
                }
            }
        }
        for (i = 0; i < arguments[1].length; i++){
            val = arguments[1][i];
            if (arguments[0].indexOf(val) === -1){
                if (arr.indexOf(val) === -1){
                    arr.push(arguments[1][i]);
                }
            }
        }
    }
    else{
        arr = arguments[0];
        for (i = 1; i < arguments.length; i++){
            arr = sym(arr, arguments[i]);
        }
    }
    return arr.sort(function(a,b){
        return a-b;
    });
}

//EXACT CHANGE
function checkCashRegister(price, cash, cid) {
    var change = cash-price;
    var drawer = {};
    var ret = [];
    var val = 0;
    var sum = 0;
    if (change < 0){
        return("Amount paid is less than owed");
    }
    cid.forEach(function(val){
        drawer[val[0]] = val[1];
        sum += val[1];
    });

    while(change >= 100){
        if (drawer["ONE HUNDRED"] > 0){
            drawer["ONE HUNDRED"] -= 100;
            change -= 100;
            val += 100;
            if (change < 100){
                break;
            }
        }
        else{
            break;
        }
    }
    if (val > 0) ret.push(["ONE HUNDRED", val]);
    sum += val;
    val = 0;
    while(change >= 20){
        if (drawer["TWENTY"] > 0){
            drawer["TWENTY"] -= 20;
            change -= 20;
            val += 20;
            if (change < 20){
                break;
            }
        }
        else{
            break;
        }
    }
    if (val > 0) ret.push(["TWENTY", val]);
    sum += val;
    val = 0;
    while(change >= 10){
        if (drawer["TEN"] > 0){
            drawer["TEN"] -= 10;
            change -= 10;
            val += 10;
            if (change < 10){
                break;
            }
        }
        else{
            break;
        }
    }
    if (val > 0) ret.push(["TEN", val]);
    sum += val;
    val = 0;
    while(change >= 5){
        if (drawer["FIVE"] > 0){
            drawer["FIVE"] -= 5;
            change -= 5;
            val += 5;
            if (change < 5){
                break;
            }
        }
        else{
            break;
        }
    }
    if (val > 0) ret.push(["FIVE", val]);
    sum += val;
    val = 0;
    while(change >= 1){
        if (drawer["ONE"] > 0){
            drawer["ONE"] -= 1;
            change -= 1;
            val += 1;
            if (change < 1){
                break;
            }
        }
        else{
            break;
        }
    }
    if (val > 0) ret.push(["ONE", val]);
    sum += val;
    val = 0;
    while(change >= 0.25){
        if(drawer["QUARTER"] > 0){
            drawer["QUARTER"] -= 0.25;
            change -= 0.25;
            val += 0.25;
            if (change < 0.25){
                break;
            }
        }
        else{
            break;
        }
    }
    if (val > 0) ret.push(["QUARTER", val]);
    sum += val;
    val = 0;
    while(change >= 0.10){
        if (drawer["DIME"] > 0){
            drawer["DIME"] -= 0.10;
            change -= 0.10;
            val += 0.10;
            if (change < 0.10){
                break;
            }
        }
        else{
            break;
        }
    }
    if (val > 0) ret.push(["DIME", val]);
    sum += val;
    val = 0;
    while(change >= 0.05){
        if (drawer["NICKEL"] > 0){
            drawer["NICKEL"] -= 0.05;
            change -= 0.05;
            val += 0.05;
            if (change < 0.05){
                break;
            }
        }
        else{
            break;
        }
    }
    if (val > 0) ret.push(["NICKEL", val]);
    sum += val;
    val = 0;
    while(change.toFixed(2) >= 0.01){
        if(drawer["PENNY"] > 0){
            drawer["PENNY"] -= 0.01;
            change -= 0.01;
            val += 0.01;
            if (change.toFixed(2) < 0.01){
                break;
            }
        }
        else{
            break;
        }
    }
    if (val > 0) ret.push(["PENNY", val]);
    if (change.toFixed(2) > 0){
        return "Insufficient Funds";
    }
    else if(sum.toFixed(2) === val.toFixed(2)){
        return "Closed";
    }
    else{
        return ret;
    }
}

//UPDATE INVENTORY
function updateInventory(arr1, arr2) {
    // All inventory must be accounted for or you're fired!
    var inv = {};
    arr1.forEach(function(val){
        inv[val[1]] = val[0];
    });
    arr2.forEach(function(val){
        if (inv.hasOwnProperty(val[1])){
            inv[val[1]] += val[0];
        }
        else{
            inv[val[1]] = val[0];
        }
    });
    var ret = [];
    Object.keys(inv).forEach(function(val){
        ret.push([inv[val], val]);
    });

    return ret.sort(function(a, b){
        return a[1] > b[1];
    });
}

//MAP THE DEBRIS
function orbitalPeriod(arr) {
    var GM = 398600.4418;
    var earthRadius = 6367.4447;
    var ret = [];
    arr.forEach(function(item){
        var orb = 2*Math.PI*Math.sqrt(Math.pow(earthRadius+item.avgAlt,3)/GM);
        ret.push({"name":item.name, "orbitalPeriod":Math.round(orb)});
    });
    return ret;
};

//PAIR WISE
function pairwise(arr, arg) {
    var used = [];
    var sum = 0;
    for (var i=0; i <= arr.length-2; i++){
        for (var j=i+1; j <= arr.length-1; j++){
            if (used.some(function(val){
                    return val == i;
                })){
                continue;
            }
            if (used.some(function(val){
                    return val == j;
                })){
                continue;
            }
            if (arr[i]+arr[j] == arg){
                used.push(i);
                used.push(j);
                sum += i+j;
            }
        }
    }
    return sum;
};

//NO REPEATS
//the permutator(inputArr) fucntion is from
//http://stackoverflow.com/questions/9960908/permutations-in-javascript
function permutator(inputArr) {
    var results = [];

    function permute(arr, memo) {
    var cur, memo = memo || [];

    for (var i = 0; i < arr.length; i++) {
        cur = arr.splice(i, 1);
        if (arr.length === 0) {
            results.push(memo.concat(cur));
        }
        permute(arr.slice(), memo.concat(cur));
        arr.splice(i, 0, cur[0]);
    }

        return results;
    }

    return permute(inputArr);
}

function permAlone(str) {
    var noRepeats = 0;
    var perms = permutator(str.split(''));
    var letters = [];
    var regex = [];
    var i, tmp;
    for (i = 0; i < str.length; i++){
        if (!letters.some(function(val){
            return val == str[i];
        })){
            letters.push(str[i]);
            regex.push(str[i]+"\{2,\}");
        }
    }
    regex = regex.join('\|');
    perms.forEach(function(val){
        tmp = val.join('');
        if (!tmp.match(regex)){
            noRepeats++;
        };
    });
    return noRepeats;
}
