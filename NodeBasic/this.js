console.log(this);
console.log(this === module.exports); // 같음

function a() {
    console.log(this === global); // 같음
}
a();