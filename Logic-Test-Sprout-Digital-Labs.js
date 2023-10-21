//(1) Name Validator (Logic Test)
function validName(name) {
  let nameArr = name.split(" ");
  let nameLength = nameArr.length;

  if (nameLength < 2 || nameLength > 3) {
    return false;
  } else {
    for (let i = 0; i < nameArr.length; i++) {
      if (nameArr[i][0] !== nameArr[i][0].toUpperCase()) {
        return false;
      }

      if (nameArr[i].length < 2) {
        return false;
      }

      if (nameLength > 2) {
        if (nameArr[0].length == 2) {
          if (nameArr[1].length > 2) {
            return false;
          }
        }
      }

      if (nameArr[nameArr.length - 1].length <= 2) {
        return false;
      }

      if (nameArr[i].length > 2) {
        if (nameArr[i][nameArr[i].length - 1] === ".") {
          return false;
        }
      }
    }
  }

  return true;
}

// console.log(validName("A. Kesya")); //true
// console.log(validName("A. K. Putri")); //true
// console.log(validName("Angelina K. Putri")); //true
// console.log(validName("Angelina")); //false
// console.log(validName("a. Kesya")); //false
// console.log(validName("A Kesya")); //false
// console.log(validName("A. Kesya Putri")); //false
// console.log(validName("A. Kesya P.")); //false
// console.log(validName("Angelina. Kesya Putri")); //false

//(2) Find All Numbers Disappeared in an Array (Logic Test)
function findDisappeared(nums) {
  let result = [];
  for (let i = 0; i < nums.length; i++) {
    let index = Math.abs(nums[i]) - 1;
    if (nums[index] > 0) {
      nums[index] = -nums[index];
    }
  }

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      result.push(i + 1);
    }
  }
  return result;
}

const nums1 = [4, 3, 2, 7, 8, 2, 3, 1];
console.log(findDisappeared(nums1)); // [5,6]

const nums2 = [1, 1];
console.log(findDisappeared(nums2)); // [2]
