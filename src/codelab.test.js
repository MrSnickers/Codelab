/* eslint-disable no-unused-vars, max-len */

/*
 This is a TDD file of various code challenges I have found on the web and the solutions I coded up.
*/

// Write a function that takes an unsigned integer and returns the number of 1 bits it has.
function binaryConverter(integer) {
  let number = integer;
  if (typeof number !== 'number') { return new TypeError('Input must be an integer'); }
  let totalOnes = 0;
  for (let exponent = 1; exponent < 32; exponent += 1) {
    const remainder = number % (2 ** exponent);
    if (remainder) {
      number -= remainder;
      totalOnes += 1;
    }
  }
  return totalOnes;
}

test('A noninteger throws an error', () => {
  expect(binaryConverter('10')).toEqual(new TypeError('Input must be an integer'));
});
test('The integer 1 has 1 1-bits', () => {
  expect(binaryConverter(1)).toBe(1);
});
test('The integer 512 has 1 1-bits', () => {
  expect(binaryConverter(512)).toBe(1);
});
test('The integer 11 has 3 1-bits', () => {
  expect(binaryConverter(11)).toBe(3);
});

// Find out the maximum sub-array of non negative numbers from an array.
function maxset(array) {
  const inputArray = array;
  let biggestFound = '';
  let biggestSum = 0;
  let latestHead = 0;
  for (let i = 0; i <= inputArray.length; i += 1) {
    if (inputArray[i] < 0 || i === inputArray.length) {
      if (latestHead < i) {
        const subarray = inputArray.slice(latestHead, i);
        const sum = subarray.reduce((a, b) => a + b);
        if ((sum > biggestSum) ||
            (sum === biggestSum && subarray.length > biggestFound.length)) {
          biggestFound = subarray;
          biggestSum = sum;
        }
      }
      latestHead = i + 1;
    }
  }
  return biggestFound;
}

test('It will return the sub array with the greatest sum', () => {
  expect(maxset([25150, 1412, 82797, 48381, 7065, -47699, -55176, 27224, 80366, 60444, 70285, -93898, -41133, 96576, -58266, 21711, -20614, -95737, 20591, -48762, -76197, -38588, -54873, 37304, 61200, -68960, 93947])).toEqual([27224, 80366, 60444, 70285]);
});
test('It will choose the longest of two arrays', () => {
  expect(maxset([2, 3, -7, 1, 2, 5])).toEqual([1, 2, 5]);
});
test('It will choose the longest of sums of array', () => {
  expect(maxset([1, 5, -7, 2, 3, 1])).toEqual([2, 3, 1]);
});
test('It will choose the first of equally long arrays', () => {
  expect(maxset([1, 2, 5, -7, 2, 2, 4])).toEqual([1, 2, 5]);
});
test('It will find a single positive element', () => {
  expect(maxset([-846930886, -1714636915, 424238335, -1649760492])).toEqual([424238335]);
});
test('It will choose the largest isolated positive element', () => {
  expect(maxset([756898537, -1973594324, -184803526, 1424268980])).toEqual([1424268980]);
});
test('It will return null if there are no positive elements', () => {
  expect(maxset([-1, -1, -1, -1])).toEqual('');
});

// N light bulbs are connected by a wire. Each bulb has a switch associated with it that also changes the state of all the bulbs to the right of it.
// Given an initial state of all bulbs, find the minimum number of switches you have to press to turn on all the bulbs.
function lightsOn(array) {
  const lightArray = array;
  let pushes = 0;
  for (let i = 0; i < lightArray.length; i += 1) {
    if ((lightArray[i] + pushes) % 2 === 0) {
      pushes += 1;
    }
  }
  return pushes;
}

test('With all lights out, only one button needs pushing', () => {
  expect(lightsOn([0, 0, 0, 0])).toEqual(1);
});
test('If the lights alternate, they will need four pushes', () => {
  expect(lightsOn([0, 1, 0, 1])).toEqual(4);
});
test('If the lights alternate, they will need four pushes', () => {
  expect(lightsOn([1, 1, 0, 0, 1, 1, 0, 0, 1])).toEqual(4);
});

// A number is called as a stepping number if the adjacent digits have a difference of 1.
// e.g 123 is stepping number, but 358 is not a stepping number. Given a range find all stepping numbers in order
function findSteppingNumbers(beginning, end) {
  const steppingNumbers = [];
  const candidateArray = [];
  for (let i = beginning; i <= end; i += 1) {
    candidateArray.push(i);
  }
  for (let i = 0; i < candidateArray.length; i += 1) {
    const number = candidateArray[i];
    const digits = Array.from(candidateArray[i].toString(10), element => parseInt(element, 10));
    if (digits.length > 1) {
      let nonSteps = 0;
      for (let j = 1; j < digits.length; j += 1) {
        if (Math.abs(digits[j] - digits[j - 1]) !== 1) {
          nonSteps += 1;
        }
      }
      if (nonSteps === 0) { steppingNumbers.push(number); }
    }
  }
  return steppingNumbers;
}

test('It will find a stepping number if it goes up', () => {
  expect(findSteppingNumbers(11, 14)).toEqual([12]);
});
test('It will find a stepping number if it goes down', () => {
  expect(findSteppingNumbers(8, 11)).toEqual([10]);
});
test('It will find a multidigit stepping number if it goes up and down', () => {
  expect(findSteppingNumbers(119, 122)).toEqual([121]);
});
test('It will an empty array if there are no stepping numbers in range', () => {
  expect(findSteppingNumbers(7, 9)).toEqual([]);
});
test('Given a range with two numbers, it will return both', () => {
  expect(findSteppingNumbers(10, 12)).toEqual([10, 12]);
});

// implement flatten()
function makeFlat(array) {
  const multiArray = array;
  let flatArray = [];
  for (let i = 0; i < multiArray.length; i += 1) {
    if (Number.isInteger(multiArray[i])) {
      flatArray.push(multiArray[i]);
    } else {
      flatArray = flatArray.concat(makeFlat(multiArray[i]));
    }
  }
  return flatArray;
}

test('Given a two dimentional array, it will return a one dimentional array', () => {
  expect(makeFlat([1, 2, 3, [4, 5], [6, [7, 8]]])).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
});

// first duplicate
function firstDuplicate(array) {
  const haveSeen = {};
  let duplicate = -1;
  for (let i = 0; i < array.length && duplicate === -1; i += 1) {
    const item = array[i];
    if (haveSeen[item]) {
      duplicate = item;
    } else {
      haveSeen[item] = true;
    }
  }
  return duplicate;
}

test('Given an array with no duplicates, it will return -1', () => {
  expect(firstDuplicate([3, 5])).toEqual(-1);
});
test('Given an array with only one duplicate, it will return it', () => {
  expect(firstDuplicate([3, 5, 3])).toEqual(3);
});
test('Given an array with two duplicates, it will return the first', () => {
  expect(firstDuplicate([3, 3, 6, 6])).toEqual(3);
});

// find the first non-repeating character
function firstNotRepeatingCharacter(string) {
  const array = Array.from(string);
  const haveSeen = {};
  for (let i = 0; i < array.length; i += 1) {
    const item = array[i];
    if (haveSeen[item]) {
      haveSeen[item].seen += 1;
      haveSeen[item].index = i;
    } else {
      haveSeen[item] = { seen: 1, index: i };
    }
  }
  let nonRepeater = '_';
  const keys = Object.keys(haveSeen);
  let nonRepeatIndex = array.length + 1;
  for (let i = 0; i < keys.length; i += 1) {
    if (haveSeen[keys[i]].seen === 1) {
      if (haveSeen[keys[i]].index < nonRepeatIndex) {
        nonRepeater = keys[i];
        nonRepeatIndex = haveSeen[keys[i]].index;
      }
    }
  }
  return nonRepeater;
}

test('Given a string with all repeating characters, it returns _', () => {
  expect(firstNotRepeatingCharacter('abab')).toEqual('_');
});
test('Given a string with one nonrepeating character, it returns it', () => {
  expect(firstNotRepeatingCharacter('abacb')).toEqual('c');
});
test('Given a long string with one nonrepeating character, it returns it', () => {
  expect(firstNotRepeatingCharacter('bcccccccccccccyb')).toEqual('y');
});
test('Given a string with two nonrepeating characters, it returns the first', () => {
  expect(firstNotRepeatingCharacter('abacdb')).toEqual('c');
});


// Definition for singly-linked list:
class ListNode {
  constructor(x) {
    this.data = x;
    this.next = null;
  }
}

class LinkedList {
  constructor(array) {
    this.head = null;
    this.length = 0;

    array.forEach(data => this.addNode(data));
  }
  addNode(data) {
    const nodeToAdd = new ListNode(data);
    let nodeToCheck = this.head;
    if (nodeToCheck === null) {
      this.head = nodeToAdd;
    } else {
      while (nodeToCheck.next !== null) {
        nodeToCheck = nodeToCheck.next;
      }
      nodeToCheck.next = nodeToAdd;
    }
    this.length += 1;
  }
  removeNodeByData(data) {
    let previousNode = null;
    while (this.head.data === data) {
      this.head = this.head.next;
      this.length -= 1;
    }
    let nodeToCheck = this.head;
    let count = this.length;
    while (count >= 0) {
      if (nodeToCheck.data !== data) {
        previousNode = nodeToCheck;
      } else {
        previousNode.next = nodeToCheck.next;
        this.length -= 1;
      }
      nodeToCheck = nodeToCheck.next;
      count -= 1;
    }
  }
  returnArray() {
    const array = [];
    let nodeToCheck = this.head;
    while (this.head && nodeToCheck.next !== null) {
      array.push(nodeToCheck.data);
      nodeToCheck = nodeToCheck.next;
    }
    return array;
  }
}


function removeKFromList(l, k) {
  const list = new LinkedList(l);
  list.removeNodeByData(k);
  return list.returnArray();
}

test.skip('Given a list and a value, it returns the list with the value removed', () => {
  expect(removeKFromList([3, 1, 2, 3, 4, 5], 3)).toEqual([1, 2, 4, 5]);
});
test.skip('Given a list and a value that is not in it, it returns the original list', () => {
  expect(removeKFromList([1, 2, 3, 4, 5, 6, 7], 10)).toEqual([1, 2, 3, 4, 5, 6, 7]);
});

// Implement binary search
function findElement(array, element) {
  const midIndex = Math.floor(array.length / 2);
  let distanceToElement = midIndex;
  if (array[midIndex] !== element) {
    if (array[midIndex] > element) {
      distanceToElement = findElement(array.slice(0, midIndex), element);
    } else {
      distanceToElement = findElement(array.slice(midIndex, array.length), element) + midIndex;
    }
  }
  return distanceToElement;
}
test('Given a sorted list and a value, it returns the index of the value', () => {
  expect(findElement([4, 5, 6, 7, 8, 9, 10], 4)).toEqual(0);
});
test('Given a sorted list and a value, it returns the index of the value', () => {
  expect(findElement([4, 5, 6, 7, 8, 9, 10], 8)).toEqual(4);
});
test('Given a sorted list and a value, it returns the index of the value', () => {
  expect(findElement([4, 5, 6, 7, 8, 9, 10, 11], 11)).toEqual(7);
});

// Returns the best profit I could have made from 1 purchase and 1 sale of 1 Apple stock yesterday
function findProfit(givenArray) {
  const array = givenArray;
  let least = array[0];
  let profit = array[1] - least;
  for (let i = 1; i < array.length; i += 1) {
    const potential = array[i] - least;
    profit = Math.max(profit, potential);
    least = Math.min(least, array[i]);
  }
  return profit;
}

test('Given an array, it returns the greatest delta between numbers', () => {
  expect(findProfit([10, 7, 5, 8, 11, 9])).toEqual(6);
});
test('Given an array that declines, it returns the greatest delta between numbers', () => {
  expect(findProfit([10, 9, 8, 7, 6, 5])).toEqual(-1);
});

// returns the product of every integer except the integer at that index
function getProductsOfAllIntsExceptAtIndex(array) {
  const returnArray = [];
  for (let i = 0; i < array.length; i += 1) {
    const intArray = [];
    for (let j = 0; j < array.length; j += 1) {
      if (j !== i) {
        intArray.push(array[j]);
      }
    }
    returnArray.push(intArray.reduce((a, b) => a * b));
  }
  return returnArray;
}

test('Given an array, it returns product of all other integers not at that index', () => {
  expect(getProductsOfAllIntsExceptAtIndex([1, 7, 3, 4])).toEqual([84, 12, 28, 21]);
});

// Given tuple data describing relationships between parents and children write a function that returns true if individuals share a common ancestor.
const parentChildPairs = [[1, 3], [2, 3], [3, 6], [5, 6], [5, 7], [4, 5], [4, 8], [8, 9]];
/*
For example, in this diagram, 3 is a child of 1 and 2, and 5 is a child of 4:

1   2     4
 \ /     / \
  3     5   8
   \   / \   \
    \ /   \   \
     6     7   9


Sample input and output:
[5, 9] => true
[3, 8] => false
[4, 9] => false
*/

function findAncestors(set, p1) {
  let knownAncestors = {};
  for (let i = 0; i < set.length; i++) {
    if (set[i][1] === p1) {
      const ancestor = set[i][0];
      knownAncestors = findAncestors(set, ancestor);
      knownAncestors[ancestor] = true;
    }
  }
  return knownAncestors;
}

function hasCommonAncestor(set, p1, p2) {
  const p1Ancestors = Object.keys(findAncestors(set, p1));
  const p2Ancestors = findAncestors(set, p2);
  for (let i = 0; i < p1Ancestors.length; i++) {
    if (p2Ancestors[p1Ancestors[i]]) {
      return true;
    }
  }
  return false;
}

test('Given parent/ child pairs and two individuals with a common ancestor, it returns true', () => {
  expect(hasCommonAncestor(parentChildPairs, 5, 9)).toEqual(true);
});
test('Given parent/ child pairs and two individuals without a common ancestor, it returns false', () => {
  expect(hasCommonAncestor(parentChildPairs, 3, 8)).toEqual(false);
});

// Detect balanced parens
function balancedParens(hash, string) {
  const characters = string.split('');
  const parensSeen = [];
  const keys = Object.keys(hash);
  const closingParens = {};
  for (let i = 0; i < keys.length; i++) {
    closingParens[hash[keys[i]]] = true;
  }
  for (let i = 0; i < characters.length; i++) {
    if (hash[characters[i]] || closingParens[characters[i]]) {
      if (hash[characters[i]]) {
        parensSeen.push(hash[characters[i]]);
      } else {
        if (characters[i] === parensSeen[parensSeen.length - 1]) {
          parensSeen.pop();
        } else {
          return false;
        }
      }
    }
  }
  if (parensSeen.length !== 0) { return false; }
  return true;
}

const hash = { '(': ')', '[': ']', '{': '}' };

test('Given sets of parens and a string that is balanced, it returns true', () => {
  expect(balancedParens(hash, '[](asd8f){}')).toEqual(true);
});
test('Given sets of parens and a string that is balanced and nested, it returns true', () => {
  expect(balancedParens(hash, '[({})]')).toEqual(true);
});
test('Given sets of parens and a string that is not balanced, it returns false', () => {
  expect(balancedParens(hash, '[](asd8f)}')).toEqual(false);
});
test('Given sets of parens and a string that is out of order, it returns false', () => {
  expect(balancedParens(hash, 'fgds[fgd(s{gfds}gfds]gfds)gfs')).toEqual(false);
});


/*
Suppose you are creating an internal networking site for your company. You have two data sets to work with. The first data set is the employees at your company, and the second is all the pairs of employees who are virtually friends so far. It does not matter which employee's ID is in which column, the friendships are bidirectional.


You’re curious how employees are using your site. Specifically, you want to know how people between different departments are interacting.

Write a function that returns a data structure that tracks, for each department: how many employees are in that department, and how many of those employees have friends in other departments.

Note for example that Carla (ID: 6) is only friends with fellow Engineering employees. So while she DOES count towards the total number of employees in Engineering, she DOES NOT count towards the number of employees with friends outside the department.

{
  Engineering: {employees: 3, employees_with_outside_friends: 2},
  HR: {employees: 1, employees_with_outside_friends: 1},
  Business: {employees: 1, employees_with_outside_friends: 1},
  Directors: {employees: 1, employees_with_outside_friends: 0}
}

1 -- has many external
4 -- has one external
6 -- only has Engineering



var employees_input = [
  "1,Richard,Engineering",
  "2,Erlich,HR",
  "3,Monica,Business",
  "4,Dinesh,Engineering",
  "6,Carla,Engineering",
  "9,Laurie,Directors"
];

var friendships_input = [
  "1,2",
  "1,3",
  "1,6",
  "2,4"
];

function departmentMaker(employees) {
  var departmentHash = {};
  for (var i = 0; i < employees.length; i++) {
    var employee = employees[i].split(",");
    if ( departmentHash[employee[2]] === undefined) {
      departmentHash[employee[2]] = [employee[0]];
    } else {
      departmentHash[employee[2]].push(employee[0]);
    }
  }
  return departmentHash;
}

function friendMaker(employees, list) {
  var returnHash = {};
  for (var i = 0; i < employees.length; i++) {
    var employee = employees[i].split(",");
    returnHash[employee[0]] = [];
  }
  for (var i = 0; i < list.length; i++) {
    var friendship = list[i].split(",");
    returnHash[friendship[0]].push(friendship[1]);
    returnHash[friendship[1]].push(friendship[0]);
  }
  return returnHash;
}

function friendMap(employees, list){
  var departmentMap = departmentMaker(employees);
  var departments = Object.keys(departmentMap);
  var friends = friendMaker(employees, list);
  var returnValue = {};
  for (var i = 0; i < departments.length; i++) {
    var department = departments[i];
    var departmentEmployees = departmentMap[department];
    returnValue[department].employees = departmentEmployees.length;
    var outsideFriendCounter = 0;
    for (var i = 0; i < departmentEmployees.length; i++) {
      for (var j = 0; j < friends[departmentEmployees[i]]; j++) {
        if (departmentEmployees.indexOf(friends[departmentEmployees[i]][j]) === -1){
          outsideFriendCounter ++;
          break;
        }
      }
    }
    returnValue[department].employees_with_outside_friends = outsideFriendCounter;
  }
  return returnValue;
}

console.log(friendMap(employees_input, friendships_input));

function recognizeEntity(str, entities) {
  const wordArray = str.split(/[\s!'\?,\.]/);
  const allWords = {};
  const multiWord = [];
  let longestName = 0;
  for (let i = 0; i < entities.length; i++) {
    longestName = Math.max(longestName, entities[i].split(' ').length);
  }
  for (let i = 0; i < wordArray.length; i++) {
    for (let j = 1; j <= longestName; j++) {
      const recombinedWord = wordArray.slice(i, i+j).join(' ');
      if (entities.indexOf(recombinedWord) !== -1) {
        if (allWords[recombinedWord] == null) {
          allWords[recombinedWord] = {'index':[i]};
        } else {
          allWords[recombinedWord].index.push(i);
        }
      }
    }
  }
  return allWords;
}

/* Some user interactions, such as resizing and scrolling, can create a huge number of browser events in a short period of time. If listeners attached to these events take a long time to execute, the user's browser can start to slow down significantly. To mitigate this issue, we want to to implement a throttle function that will detect clusters of events and reduce the number of times we call an expensive function.

Your function will accept an array representing a stream of event timestamps and return an array representing the times that a callback should have been called. If an event happens within wait time of the previous event, it is part of the same cluster. Your function should satisfy the following use cases:

1) Firing once on the first event in a cluster, e.g. as soon as the window starts resizing.
2) Firing once after the last event in a cluster, e.g. after the user window stops resizing.
3) Firing every interval milliseconds during a cluster, e.g. every 100ms while the window is resizing.

Test Input	Expected Result	Result	Log
20, false, true, 0, [0,10,20,30]	[0]	-
20, true, false, 0, [0,10,20,30]	[50]	-
20, false, true, 20, [0,10,20,30]	[0,20]	-
20, false, true, 0, [0,10,40]	[0,40]	-
20, true, false, 0, [0,10,40]	[30,60]	-
20, true, true, 0, [0,10,50]	[0,30,50,70]	-
20, true, true, 10, [0,10,50]	[0,10,20,30,50,60,70]	-


function throttle(wait, onLast, onFirst, interval, timestamps) {
    let finalArray = [];
    let clusters = [];
    if (onFirst = true) {
        finalArray.push(timestamps[0]);
    }
    for (var i = 1; i < timestamps.length; i++) {
        if ( timestamps[i] - timestamps[i-1] > wait) {
            finalArray.push(timestamps[i]);
    }
    for

}


The deletion distance between two strings is the minimum sum of ASCII values of characters that you need to delete in the two strings in order to have the same string. The deletion distance between cat and at is 99, because you can just delete the first character of cat and the ASCII value of 'c' is 99. The deletion distance between cat and bat is 98 + 99, because you need to delete the first character of both words. Of course, the deletion distance between two strings can't be greater than the sum of their total ASCII values, because you can always just delete both of the strings entirely.Implement an efficient function to find the deletion distance between two strings.You can refer to the Wikipedia article on the algorithm for edit distance if you want to. The algorithm there is not quite the same as the algorithm required here, but it's similar.


"at", "cat"	99	-
"boat", "got"	298	-
"thought", "sloughs"	674	-
*/

function getDistance(item1, item2, array) {
  let index1 = '';
  let index2 = '';
  let bestDistance = -1;

  for (let i = 0; i < array.length; i++) {
    if (array[i] === item1) {
      index1 = i;
      if (index2 !== '') {
        const challenger = Math.abs(index1 - index2);
        if (bestDistance === -1) {
          bestDistance = challenger;
        } else {
          bestDistance = Math.min(challenger, bestDistance);
        }
      }
    }
    if (array[i] === item2) {
      index2 = i;
      if (index1 !== '') {
        const challenger = Math.abs(index1 - index2);
        if (bestDistance === -1) {
          bestDistance = challenger;
        } else {
          bestDistance = Math.min(challenger, bestDistance);
        }
      }
    }
  }
  return bestDistance;
}

const array = ['A', 'B', 'C', 'A', 'D', 'A', 'D', 'B'];

test('Given an array, and two items of interest it returns the best distance between those items', () => {
  expect(getDistance('B', 'D', array)).toEqual(1);
});
test('Given an array, and two items of interest it returns the best distance between those items', () => {
  expect(getDistance('C', 'D', array)).toEqual(2);
});
