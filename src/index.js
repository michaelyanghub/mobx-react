//定义一个类修饰器
function log(target) {
    const desc = Object.getOwnPropertyDescriptors(target.prototype);
    for (const key of Object.keys(desc)) {
        if (key === 'constructor') {
            continue;
        }
        const func = desc[key].value;
        if ('function' === typeof func) {
            Object.defineProperty(target.prototype, key, {
                value(...args) {
                    console.log('before' + key);
                    const ret = func.apply(this, args);
                    console.log('after' + key);
                    return ret;
                }
            })
        }
    }
}

//定义一个只读修饰器
function readonly(target, key, descriptor) {
    descriptor.writable = false;
} validate

//定义一个验证函数只能输入数字的修饰器
function validate(target, key, descriptor) {
    const func = descriptor.value;
    descriptor.value = function (...args) {
        for (let num of args) {
            if ('number' !== typeof num) {
                throw new Error(`"${num}" is not a number`);
            }
        }
        return func.apply(this, args);
    }
}


@log
class Numberic {
    @readonly PI = 3.1415926;
    @validate
    add(...nums) {
        return nums.reduce((p, n) => (p + n), 0);
    }
}


// console.log(new Numberic().add(1, 2, 4, 5));  //10
// console.log(new Numberic().PI = 100);  //报错
// console.log(new Numberic().add(1, 'x')); //报错

