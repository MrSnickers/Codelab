/* eslint-disable max-len */

/*
 This is a TDD file of various code challenges I have found on the web and the solutions I coded up.
*/

// Take an unsigned integer and return the number of 1 bits it has.
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

// implement flatten() for an array
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

// implement flatten() for a hash

/*
approach
  iterate over keys for hash
    if value is not an object shovel in return object
    if value is object, flatten object
      take root key and append new key
      return flattend value
      recurse if required -- base case is no values are objects
  return returnObject
*/

function flattenHash(hash, rootKey = '') {
  const returnHash = {};
  const keys = Object.keys(hash);
  for (let i = 0; i < keys.length; i++) {
    const value = hash[keys[i]];
    const key = `${rootKey}${keys[i]}`;
    if (typeof (value) !== 'object') {
      returnHash[key] = value;
    } else {
      const catKey = `${key}.`;
      Object.assign(returnHash, flattenHash(value, catKey));
    }
  }
  return returnHash;
}

const testHash =
{
  Key1: 1,
  Key2: {
    a: 2,
    b: 3,
    c: {
      d: 3,
      e: 1,
    },
  },
};

const flattenedTestHash =
{
  Key1: 1,
  'Key2.a': 2,
  'Key2.b': 3,
  'Key2.c.d': 3,
  'Key2.c.e': 1,
};

test('Given a nested hash, it will return a one hash with no nesting', () => {
  expect(flattenHash(testHash)).toEqual(flattenedTestHash);
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

// Given an array of sorted distinct integers named arr, write a function that returns an index i in arr for which arr[i] = i or -1 if no such index exists.
function elementEquality(arr, head = 0, end = arr.length) {
  let location = -1;
  const mid = Math.floor((end + head) / 2);
  if (arr[mid] === mid) {
    location = mid;
  } else if (mid > head) {
    if (arr[mid] > mid) {
      location = elementEquality(arr, head, mid);
    } else {
      location = elementEquality(arr, mid, end);
    }
  }
  return location;
}

test('Given a sorted array, find element equal to the value of its index', () => {
  expect(elementEquality([-8, 0, 2, 5])).toEqual(2);
});
test('Given a sorted array, find element equal to the value of its index', () => {
  expect(elementEquality([-8, 0, 1, 3])).toEqual(3);
});
test('Given a sorted array, find element equal to the value of its index', () => {
  expect(elementEquality([0, 2, 5, 7])).toEqual(0);
});
test('Given a sorted array with no index/ element equality, it returns -1', () => {
  expect(elementEquality([-1, 0, 3, 6])).toEqual(-1);
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

function arrayOfArrayProducts(arr) {
  if (arr.length < 2) { return []; }
  const forward = [1, arr[0]];
  const back = [arr[arr.length - 1], 1];
  const returnArray = [];
  for (let i = 1; i < arr.length - 1; i++) {
    forward.push(arr[i] * forward[forward.length - 1]);
    back.unshift(arr[arr.length - (i + 1)] * back[0]);
  }
  for (let i = 0; i < arr.length; i++) {
    returnArray.push(forward[i] * back[i]);
  }
  return returnArray;
}

test('Given an array, it returns product of all other integers not at that index', () => {
  expect(arrayOfArrayProducts([1, 7, 3, 4])).toEqual([84, 12, 28, 21]);
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
      } else if (characters[i] === parensSeen[parensSeen.length - 1]) {
        parensSeen.pop();
      } else {
        return false;
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

// Given an array of timestamps in "hh:mm" format return shortest span of time between two stamps
function minutes(string) {
  const time = string.split(':');
  return (Number(time[0]) * 60) + (Number(time[1]));
}

function bestTime(array) {
  if (array.length < 2) return 0;
  const timeArray = array.map(x => minutes(x));
  timeArray.sort((x, y) => x - y);
  let bestDelta = timeArray[1] - timeArray[0];
  for (let i = 2; i < timeArray.length; i++) {
    bestDelta = Math.min(timeArray[i] - timeArray[i - 1], bestDelta);
  }
  bestDelta = Math.min(((1440 - timeArray[timeArray.length - 1]) + timeArray[0]), bestDelta);
  return bestDelta;
}
test('Given a set of timestamps, return sortest times between stamps', () => {
  expect(bestTime(['10:05', '23:50', '10:20', '00:01'])).toEqual(11);
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
*/

const employeesInput = [
  '1,Richard,Engineering',
  '2,Erlich,HR',
  '3,Monica,Business',
  '4,Dinesh,Engineering',
  '6,Carla,Engineering',
  '9,Laurie,Directors',
];

const friendshipsInput = [
  '1,2',
  '1,3',
  '1,6',
  '2,4',
];

function departmentMaker(employees) {
  const departmentHash = {};
  for (let i = 0; i < employees.length; i++) {
    const employee = employees[i].split(',');
    if (departmentHash[employee[2]] === undefined) {
      departmentHash[employee[2]] = [employee[0]];
    } else {
      departmentHash[employee[2]].push(employee[0]);
    }
  }
  return departmentHash;
}

function friendMaker(employees, list) {
  const returnHash = {};
  for (let i = 0; i < employees.length; i++) {
    const employee = employees[i].split(',');
    returnHash[employee[0]] = [];
  }
  for (let i = 0; i < list.length; i++) {
    const friendship = list[i].split(',');
    returnHash[friendship[0]].push(friendship[1]);
    returnHash[friendship[1]].push(friendship[0]);
  }
  return returnHash;
}

function friendMap(employees, list) {
  const departmentMap = departmentMaker(employees);
  const departments = Object.keys(departmentMap);
  const friends = friendMaker(employees, list);
  const returnValue = {};
  for (let n = 0; n < departments.length; n++) {
    const department = departments[n];
    const departmentEmployees = departmentMap[department];
    returnValue[department] = {};
    returnValue[department].employees = departmentEmployees.length;
    let outsideFriendCounter = 0;
    for (let i = 0; i < departmentEmployees.length; i++) {
      for (let j = 0; j < friends[departmentEmployees[i]]; j++) {
        if (departmentEmployees.indexOf(friends[departmentEmployees[i]][j]) === -1) {
          outsideFriendCounter++;
          break;
        }
      }
    }
    returnValue[department].employees_with_outside_friends = outsideFriendCounter;
  }
  return returnValue;
}

const testMap = { Business: { employees: 1, employees_with_outside_friends: 1 }, Directors: { employees: 1, employees_with_outside_friends: 0 }, Engineering: { employees: 3, employees_with_outside_friends: 1 }, HR: { employees: 1, employees_with_outside_friends: 0 } };


test('Given a list of employees, return which employees have friends outside of the department', () => {
  expect(friendMap(employeesInput, friendshipsInput)).toEqual(testMap);
});

// Implement a function that finds the minimum distance between two values in an array.  There are duplicate values.
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

// Find the number of islands in a matrix
function getNumberOfIslands(binaryMatrix) {
  let islandCounter = 0;
  for (let i = 0; i < binaryMatrix.length; i++) {
    for (let j = 0; j < binaryMatrix[0].length; j++) {
      if (binaryMatrix[i][j] === 1) {
        findNeighbors(binaryMatrix, i, j);
        islandCounter++;
      }
    }
  }
  return islandCounter;
}

function resolveIsland(matrix, i, j) {
  if (matrix[i] !== undefined && matrix[i][j] === 1) {
    matrix[i][j] = 0; // eslint-disable-line no-param-reassign
    findNeighbors(matrix, i, j);
  }
}

function findNeighbors(matrix, i, j) {
  resolveIsland(matrix, i - 1, j);
  resolveIsland(matrix, i + 1, j);
  resolveIsland(matrix, i, j - 1);
  resolveIsland(matrix, i, j + 1);
}
const binaryMatrix = [[0, 1, 0, 1, 0],
[0, 0, 1, 1, 1],
[1, 0, 0, 1, 0],
[0, 1, 1, 0, 0],
[1, 0, 1, 0, 1]];

test('Given a matrix of 1s and 0s return how many islands of 1s there are', () => {
  expect(getNumberOfIslands(binaryMatrix)).toEqual(6);
});

// Spiral Print
function spiralCopy(inputMatrix) {
  let jmax = inputMatrix[0].length - 1;
  let jmin = 0;
  let imax = inputMatrix.length - 1;
  let imin = 0;
  const returnArray = [];
  while (imax >= imin && jmax >= jmin) {
    for (let j = jmin; j <= jmax; j++) {
      returnArray.push(inputMatrix[imin][j]);
    }
    imin++;
    for (let i = imin; i <= imax; i++) {
      returnArray.push(inputMatrix[i][jmax]);
    }
    jmax--;
    if (jmax < jmin) { break; }
    for (let j = jmax; j >= jmin; j--) {
      returnArray.push(inputMatrix[imax][j]);
    }
    imax--;
    if (imax < imin) { break; }
    for (let i = imax; i >= imin; i--) {
      returnArray.push(inputMatrix[i][jmin]);
    }
    jmin++;
  }
  return returnArray;
}

const inputMatrix = [[1, 2, 3, 4, 5],
[6, 7, 8, 9, 10],
[11, 12, 13, 14, 15],
[16, 17, 18, 19, 20]];

test('Given a matrix return an array of elements aquired in a spiral', () => {
  expect(spiralCopy(inputMatrix)).toEqual([1, 2, 3, 4, 5, 10, 15, 20, 19, 18, 17, 16, 11, 6, 7, 8, 9, 14, 13, 12]);
});

// Calculate the busiest time in the mall
function findBusiestPeriod(data) {
  const bestTotal = [0, ''];
  let currentTotal = 0;
  for (let i = 0; i <= data.length - 1; i++) {
    if (data[i][2] === 1) {
      currentTotal += data[i][1];
    } else {
      currentTotal -= data[i][1];
    }
    if (data[i + 1] === undefined || data[i][0] !== data[i + 1][0]) {
      if (currentTotal > bestTotal[0]) {
        bestTotal[0] = currentTotal;
        bestTotal[1] = data[i][0];
      }
    }
  }
  return bestTotal[1];
}

const data = [[1487799425, 14, 1],
[1487799425, 4, 0],
[1487799425, 2, 0],
[1487800378, 10, 1],
[1487801478, 18, 0],
[1487801478, 18, 1],
[1487901013, 1, 0],
[1487901211, 7, 1],
[1487901211, 7, 0]];

test('Given a log of entries and exits, it returns the time at which the most people are in the mall', () => {
  expect(findBusiestPeriod(data)).toEqual(1487800378);
});


/*
// given an int N and a list of ints L of length m, find all pairs of ints in L that sum to N. Do it in the best possible run time.
// say an array is triangular if the elements when read l to r are strictly increasing up to some point and then decreasing. [2, 3, 4, 1]. find the top of the triangle index.
// given a string chars a-z only find the longest substring that has no repeating letters
// given two strings, tell me if they have the same characters in them
// an array with all unique int vals find local min, meaning a[i-1] < a[i] < a[i+1]. An end can be a min
// why is sorting in python n log n ? what algorithm is used?

// board 2D array
// player to be token


// Write the function that assesses the win condition for a game of tic tac toe
const winBoard = [[1,0,2],
[2,1,0],
[0,2,1]]

const winBoard2 = [[0,1,2],
[2,1,0],
[0,1,1]]

const failBoard = [[0,1,2],
 [2,1,0],
 [0,2,1]]


  function hasWon(board, token) {
  for (let i = 0; i < board[0].length; i++) {
    if (board[i][0] === token && board[i][1] === token && board[i][2] === token) {
      return true;
    }
  }
  for (let i = 0; i < board[0].length; i++) {
    let vWin = true;
    for (let j = 0; j < board[0].length; j++) {
      if (board[j][i] !== token) {
        vWin = false;
      }
    }
    if (vWin === true) {
      return true;
    }
  }

  return false;
}

test('Given a board with no tokens it returns false', () => {
  expect(getNumberOfIslands(binaryMatrix)).toEqual(6);
});


  function isMatch(text, pattern) {
    let pIndex = 0;
    let tIndex = 0;
   while(pIndex !== pattern.length){
     if(pattern[pIndex] === text[tIndex] || pattern[pIndex] === '.'){
      pIndex ++;
      tIndex++;
     } else if (pattern[pIndex] === '*') {
       while(text[tIndex] === pattern[pIndex -1]){
         tIndex ++;
       }
       pIndex++;
     } else {
       return false;
     }
   }
    return tIndex === text.length;
  }

  console.log(isMatch("aby", "ab*"));
  */
/*
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

Test Input Expected Result Result Log
20, false, true, 0, [0,10,20,30] [0] -
20, true, false, 0, [0,10,20,30] [50] -
20, false, true, 20, [0,10,20,30] [0,20] -
20, false, true, 0, [0,10,40] [0,40] -
20, true, false, 0, [0,10,40] [30,60] -
20, true, true, 0, [0,10,50] [0,30,50,70] -
20, true, true, 10, [0,10,50] [0,10,20,30,50,60,70] -


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


// The deletion distance between two strings is the minimum sum of ASCII values of characters that you need to delete in the two strings in order to have the same string. The deletion distance between cat and at is 99, because you can just delete the first character of cat and the ASCII value of 'c' is 99. The deletion distance between cat and bat is 98 + 99, because you need to delete the first character of both words. Of course, the deletion distance between two strings can't be greater than the sum of their total ASCII values, because you can always just delete both of the strings entirely.Implement an efficient function to find the deletion distance between two strings.You can refer to the Wikipedia article on the algorithm for edit distance if you want to. The algorithm there is not quite the same as the algorithm required here, but it's similar.

"at", "cat" 99 -
"boat", "got" 298 -
"thought", "sloughs" 674 -
*/

// function calculate_distance(destination){
//     const x_distance = Math.abs(destination[0]);
//     const y_distance = Math.abs(destination[1]);
//     return Math.sqrt(Math.pow(x_distance, 2) + Math.pow(y_distance, 2));
// }


// function ClosestXdestinations(numDestinations, allLocations, numDeliveries)
// {
//     console.log('a', calculate_distance([1, -3]));
//     console.log('b', calculate_distance([1, 2]));
//     const sortedLocations = allLocations.sort((a, b)=>{return calculate_distance(a) - calculate_distance(b)});
//     console.log('sorted', sortedLocations)
//     return sortedLocations.slice(0, numDeliveries);
// }

// destimations = [[1, -3], [1, 2]]

// dests = [[3,6], [2,4], [5,3], [2,7]]

// console.log(ClosestXdestinations(4, destimations, 1));

function optimalUtilization(max, forwardRoutes, returnRoutes) {
  let allRoutes = {};
  for (let route of forwardRoutes) {
    for (let reverse of returnRoutes) {
      totalDistance = route[1] + reverse[1];
      if (totalDistance <= max) {
        if (allRoutes[totalDistance]) {
          console.log('existing', allRoutes[totalDistance]);
          allRoutes[totalDistance] = allRoutes[totalDistance].concat([[route[0], reverse[0]]]);
          console.log('became', allRoutes[totalDistance]);
        } else {
          allRoutes[totalDistance] = [[route[0], reverse[0]]]
        }
      }
    }
  }
  console.log(Object.keys(allRoutes))
  optimizedDistance = Object.keys(allRoutes).sort((a, b) => { return b - a })[0];
  return allRoutes[optimizedDistance];
}

const total = 20;
const forward = [[1, 8], [2, 15], [3, 9]];
const reverse = [[1, 8], [2, 11], [3, 12]];


console.log(optimalUtilization(total, forward, reverse));

/*
    Instructions:
    Please implement the top_k_words function to satisfy the following requirements:

      1) Given a string and integer return the top k words by frequency.
         Examples:
           String[] top_k_words("It's a dog eat dog world", 1) => ["dog"]
           String[] top_k_words("Hello New York, New York", 2) => ["new", "york"]
           String[] top_k_words("A poem about Mary. Mary had a little lamb, its fleece was white as snow; And everywhere that Mary went the lamb was sure to go.", 4) => ["mary", "lamb", "was", "a"]
      2) Treat uppercase and lowercase words as the same word.
      3) Remove punctuation.
      4) Once you have a working solution sorting top k words by frequency please
         apply an alphabetical secondary sort.
         Example:
           In the above example, ["mary", "lamb", "was", "a"] is correctly sorted by
           frequency.
             [["mary", 3], ["lamb", 2], ["was",2], ["a", 2]]
           Sorting by frequency, then alphabetical should yield
             [["mary", 3], ["a", 2], ["lamb",2], ["was", 2]]
           The final result should look like this:
             ["mary", "a", "lamb", "was"]
      5) As a caller of your function, I decide to call it with `top_k_words(str, -2)`. Calling `top_k_words` with `-2` does not yield any valid output. Modify your solution to handle this input.

    Feel free to use Google to check Javascript syntax and functionality

    You have 60 minutes to complete the problem  Please email arawding@handy.com once you have completed the problem.
*/

// convert string to array
// sanitize each word
// create mapping of word to frequency
// convert map to array
// sort array by frequency
// return subarray of 0 index to k

"use strict";

var _ = require('underscore')

var str = "Two vast and trunkless legs of stone Stand in the desert. Near them, on the sand, Half sunk, a shattered visage lies, whose frown, And wrinkled lip, and sneer of cold command, Tell that its sculptor well those passions read Which yet survive, stamped on these lifeless things, The hand that mocked them and the heart that fed: And on the pedestal these words appear: 'My name is Ozymandias, king of kings: Look on my works, ye Mighty, and despair!' Nothing beside remains. Round the decay Of that colossal wreck, boundless and bare The lone and level sands stretch far away."

function sanitize(word) {
  var lowerCaseWord = word.toLowerCase();
  return lowerCaseWord.replace(/[^\w]|_/g, "");

}

function convertToSanitizedArray(string) {
  const wordArray = string.split(' ')
  return _.map(wordArray, sanitize);
}

function createWordHash(array) {
  var wordHash = {};
  for (var word of array) {
    if (wordHash[word]) {
      wordHash[word] = wordHash[word] + 1;
    } else {
      wordHash[word] = 1;
    }
  }
  return wordHash;
}

function top_k_words(str, k) {
  var sanitizedArray = convertToSanitizedArray(str);
  var wordHash = createWordHash(sanitizedArray);
  var sortableArray = Object.keys(wordHash);
  sortableArray.sort(function (a, b) {
    return wordHash[b] - wordHash[a];
  })
  return sortableArray.slice(0, k);
}

console.log(top_k_words(str, 9));

/* Problem Name is &&& Longest Word &&& PLEASE DO NOT REMOVE THIS LINE. */

/**
 * Instructions to candidate.
 *  1) Given a a string of letters and a dictionary, the function longestWord should
 *     find the longest word or words in the dictionary that can be made from the letters
 *     Input: letters = "oet", dictionary = {"to","toe","toes", "tree"}
 *     Output: {"toe"}
 *     Only lowercase letters will occur in the dictionary and the letters
 *     The length of letters will be between 1 and 10 characters
 *     The solution should work well for a dictionary of over 100,000 words
 *  2) Run this code in the REPL to observe its behaviour.
 *  3) Consider adding some additional tests in doTestsPass().
 *  4) Implement the longestWord() method correctly.
 *  5) If time permits, introduce '?' which can represent any letter.  "to?" could match to "toe", "ton" etc
 */

// query input letters for exclusion criteria
// pass exclusion criteria and apply to dictionary
// sort dictionary

var _ = require('underscore');


function processInput(input) {
  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
  var exclusion = {};
  for (var letter in alphabet) {
    var tooMany = 1;
    for (var item in input) {
      if (item == letter) {
        tooMany += 1;
      }
    }
    exclusion[letter] = tooMany;
  }
  return exclusion;
}

function excludeWords(words, exclusion) {
  var returnArray = [];
  for (var word in words) {
    var wordExculsion = exclusion;
    for (var letter in word) {
      if (exclusion[letter] = 1) {
        break;
      } else {
        exclusion[letter] -= 1;
      }
    }
    returnArray.push(word);
  }
}

function longestWord(input, words) {

  var eligibleWords = excludeWords(words, processInput(input));
  var longestSoFar = [];
  var bestLength = 0;
  for (var word in eligibleWords) {
    if (word.length > bestLength) {
      console(word.length);
      bestLength = word.length;
      longestSoFar = [word];
    } else if (word.length = bestLength) {
      longestSoFar.push(word);
    }
  }
  console.log(longestSoFar);
  return longestSoFar;
}

// class Dictionary {
//   constructor(words) {
//     this.words = words
//   }

//   contains(word) {
//     return _.contains(this.words, word);
//   }
// }

// function longestWord(letters, dict) {
//   return dict.contains(letters) ? [letters] : [];
// }

function arraysEqual(arr1, arr2) {
  return _.difference(arr1, arr2).length == 0 && _.difference(arr2, arr1) == 0
}

function doTestsPass() {
  var words = ["io", "ioe", "ioed", "doe", "dog", "god", "dogs", "book", "bababa"];

  var result = arraysEqual(["ioe"], longestWord("ioe", words));
  result = result && arraysEqual(["ioes", "dogs"], longestWord("oseidg", words));

  return result;
}

/**
 * Main execution entry.
 */
if (doTestsPass()) {
  console.log("All tests pass!");
} else {
  console.error("There are test failures.");
}



// Amazon

/*
 Given a boolean 2D matrix, find the number of islands. A group of connected 1s forms an island.
 For example, the below matrix contains 5 islands
 
 Ex:
 
 Input : mat[][] = {{0, 0, 0},
                    {0, 1, 0}, 1,1 -> 2,0
                    {0, 0, 1},
                    {1, 0, 1}}
Output : 5

*/
'use strict;'
const eraseLand = (x, y, matrix) => {
  if (x - 1 > 0 && matrix[x - 1][y] === 1) {
    matrix[x - 1][y] = 0;
    eraseLand(x - 1, y);
  }
  if (x - 1 > 0 && y - 1 > 0 && matrix[x - 1][y - 1] === 1) {
    matrix[x - 1][y - 1] = 0;
    findNeighbors(x - 1, y);
  }
  if (x - 1 > 0 && y + 1 < matrix.length && matrix[x - 1][y - 1] === 1) {
    matrix[x - 1][y - 1] = 0;
    eraseLand(x - 1, y);
  }
  if (x + 1 < matrix.length && matrix[x + 1][y] === 1) {
    matrix[x + 1][y] = 0;
    findNeighbors(x + 1, y);
  }
  if (x + 1 < matrix.length && y - 1 > 0 && matrix[x + 1][y - 1] === 1) {
    matrix[x + 1][y - 1] = 0;
    findNeighbors(x + 1, y);
  }
  if (x + 1 < matrix.length && y + 1 < matrix.length && matrix[x + 1][y + 1] === 1) {
    matrix[x + 1][y + 1] = 0;
    findNeighbors(x + 1, y);
  }
  if (y - 1 > 0 && matrix[x][y - 1] === 1) {
    matrix[x][y - 1] = 0;
    findNeighbors(x, y - 1);
  }
  if (y + 1 < matrix.length && matrix[x][y + 1] === 1) {
    matrix[x][y + 1] = 0;
    findNeighbors(x, y + 1);
  }
}

const findIslands = (matrix) => {
  const matrixCopy = matrix;
  let islandCount = 0;
  for (let x = 0; x < matrixCopy[0].length; x++) {
    for (let y = 0; y < matrixCopy.length; y++) {
      if (matrixCopy[x][y] === 1) {
        islandCount++;
        eraseLand(x, y, matrixCopy);
      }
    }
  }
}

// Create a random sentence generator based on an input corpus file with the following strategy:
// 1. Choose a random start word from the corpus
// 2. The next word is randomly chosen from the words that appear directly after the previous word in the corpus
// For example, if the corpus is “This is a sentence and it is somewhat good but is a sentence”


const input = "This is a sentence and it is somewhat good but is a sentence"
// rw = RandomWriter.new(input)
// rw.write(6)
// rw.write(100)
// rw.write(1000)



// This is somewhat good but is

// Convert input string to array
// make array to lookup hash
// make hash values eligible next words for each word
// select next word for length parameter

const makeHash = (input) => {
  const Hash = {};
  for (let i = 0; i < input.length - 1; i++) {
    if (Hash[input[i]]) {
      Hash[input[i]].push(input[i + 1]);
    } else {
      Hash[input[i]] = [input[i + 1]];
    }
  }
  const finalWord = input[input.length - 1]
  if (Hash[finalWord]) {
    Hash[finalWord].push(input[0]);
  } else {
    Hash[finalWord] = [input[0]];
  }
  return Hash;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


const sentenceGenerator = (input, length) => {
  const sentence = [];
  const inputArray = input.split(' ');
  const hash = makeHash(inputArray);
  const firstWordIndex = getRandomInt(inputArray.length);
  const firstWord = inputArray[firstWordIndex];
  sentence.push(firstWord);
  for (let i = 1; i < length; i++) {
    const workingWord = sentence[sentence.length - 1];
    const possibleNext = hash[workingWord];
    const selectedNext = possibleNext[getRandomInt(possibleNext.length)];
    sentence.push(selectedNext);
  }
  return sentence.join(" ");
}

console.log(sentenceGenerator(input, 100));

function isBalanced(string) {
  const characters = string.split('');
  const closingBrackets = new Set([')', ']', '}']);
  const matchingBracketsMap = { '(': ')', '[': ']', '{': '}' };
  const closingBracketsNeeded = [];
  for (const character of characters) {
    console.log('character', character);
    if (closingBrackets.has(character)) {
      if (character == closingBracketsNeeded[0]) {
        closingBracketsNeeded.shift();
      } else {
        return ('NO');
      }
    }
    if (matchingBracketsMap[character]) {
      closingBracketsNeeded.unshift(matchingBracketsMap[character]);
    }
  }
  return ('YES');
}

console.log(isBalanced('[{]}'));

// Complete the oddNumbers function below.
function oddNumbers(l, r) {
  const offset = l % 2 ? 0 : 1;
  const returnArray = [];
  for (let i = l + offset; i <= r; i = i + 2) {
    returnArray.push(i);
  }
  return returnArray;

}


function isBalanced(string) {
  const characters = string.split('');
  const closingBrackets = new Set([')', ']', '}']);
  const matchingBracketsMap = { '(': ')', '[': ']', '{': '}' };
  const closingBracketsNeeded = [];
  for (const character of characters) {
    if (closingBrackets.has(character)) {
      if (character == closingBracketsNeeded[0]) {
        closingBracketsNeeded.shift();
      } else {
        return ('NO');
      }
    }
    if (matchingBracketsMap[character]) {
      closingBracketsNeeded.unshift(matchingBracketsMap[character]);
    }
  }
  return ('YES');
}


<ul id="list">
  <li>wiskers on kittens</li>
  <li>bright copper kettles</li>
  <li>warm woolen mittens</li>
</ul>
  <form>
    <input type="text" id="input" />
    <button id="insert" type="submit">Insert</button>
  </form>

var form = document.querySelector("form");
var list = document.getElementById("list");
var input = document.getElementById("input");
form.addEventListener('submit', function (event) {
  event.preventDefault();
  var text = input.value.trim();
  if (text) {
    var newItem = document.createElement('li');
    newItem.innerText = text;
    list.appendChild(newItem);
    document.getElementById("input").value = '';
  }

})

ul li: nth - child(3n + 3) {
  color: red;
}

< !--Enter your HTML code here-- >
  <div class="grid">
    <div class="pair">
      <div class="enhanced"></div>
      <div class="enhanced"></div>
    </div><div class="pair">
      <div class="enhanced"></div>
      <div class="enhanced"></div>
    </div>
  </div>

  /* Add your css styles here */
  * {
    box- sizing: border - box;   
 }
 
 .grid {
  font - size: 0rem;
  width: 100vw;
  white - space: nowrap;
}
 
 .pair {
  display: inline - block;
  font - size: 0rem;
  width: 50 %;
}
 
 .enhanced {
  border: 1px solid #000;
  display: inline - block;
  font - size: 1rem;
  height: 10 %;
  width: 50 %;
}

@media screen and(max - width: 720px){
   .pair {
    display: block;
  }
}

@media screen and(max - width: 360px){
   .enhanced {
    display: block;
    width: 100 %;
  }
}
