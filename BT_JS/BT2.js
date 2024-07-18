function SumnArray(array)
{
    let sum = 0;
    for (let number of array)
        sum += number;
    return sum;
}

function AvgArray(array)
{
    let sum = 0;
    for (let number of array)
        sum += number;
    let avg = sum / array.length; 
    return avg;
}

let numbers = new Array(1,2,3,4,5);

console.log("Tổng các phần tử trong mảng: ", SumnArray(numbers))
console.log("Trung bình cộng các phần tử trong mảng: ", SumnArray(numbers))