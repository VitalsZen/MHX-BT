function isPalindrome(str) 
{
    let reversedstr= str.split('').reverse().join('');
    return str === reversedstr;
}

console.log(isPalindrome("bads"));
console.log(isPalindrome("kayak"));
console.log(isPalindrome("anna"));