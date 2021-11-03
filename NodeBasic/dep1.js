require('./dep2'); // 서로 호출을 하여 순환참조를 하게 되면 호출이 막히게 된다.

module.exports = {
    hello: 'hello',
};