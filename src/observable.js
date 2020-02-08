import { observable, autorun, computed, when, reaction, action, runInAction } from 'mobx';
import { func } from 'prop-types';


//1.取值，设值
// var num = observable.box(20);
// var str = observable.box('hello');
// var bool = observable.box(true);
// num.set(50);
// str.set('world');
// bool.set(false);
// console.log(
//     num.get(),
//     str.get(),
//     bool.get(),
// );




//2.数据修改状态观察
// var todoStore = observable({
//     /* 一些观察的状态 */
//     todos: [],

//     /* 推导值 */
//     get completedCount() {
//         return this.todos.filter(todo => todo.completed).length;
//     }
// });

// /* 观察状态改变的函数 */
// autorun(function () {
//     console.log("Completed %d of %d items",
//         todoStore.completedCount,
//         todoStore.todos.length
//     );
// });

// /* ..以及一些改变状态的动作 */
// todoStore.todos[0] = {
//     title: "Take a walk",
//     completed: false
// };

// // -> 同步打印 'Completed 0 of 1 items'

// todoStore.todos[0].completed = true;
// // -> 同步打印 'Completed 1 of 1 items'

//3. observable可以对不同类型的变量进行修饰
class Store {
    @observable array = [];
    @observable obj = {};
    @observable map = new Map();
    @observable string = 'hello';
    @observable number = 20;
    @observable bool = false;

    //计算属性，多个可观察数据组合成一个可观察数据
    @computed get mixed() {
        return store.string + '/' + store.number;
    }
    @action bar() {
        this.string = 'word';
        this.number = '40';
    }
    //包裹上
    @action.bound bar_bound() {
        this.string = 'wode';
        this.number = '50';
    }
}

var store = new Store();
/**
 * computed + observe观察数据 -----最灵活 ，多组合，每个组合任意个可观察
 */
// //在类的外面定义计算属性
// var foo = computed(
//     function () {
//         return store.string + '/' + store.number;
//     }
// )
// // console.log(foo.get()); //get触发计算属性 hello/20

// //observe 在外面 在计算属性上面定义可观察
// foo.observe(function (change) {
//     console.log(change);
// })
// store.string = 'world';  //触发一次
// store.number = 30; //触发一次
// store.array = ['aa', 'b']//不会触发


/**autoruan 所有可观察数据 */
//修改两个一起改变 - 调用autorun函数
// store.string = 'world';
// store.number = 30;
// autorun(() => {
//     console.log(store.string + '/' + store.number);
// })

//修改两个一起改变 - autorun调用computed 计算属性
// store.string = 'world';
// store.number = 30;
// autorun(() => {
//     console.log(store.mixed);
// })


/**
 * when条件观察 单个 备注：是同步顺序执行
 */
// console.log('before'); //before
// when(() => !store.bool, () => console.log("it's true"))  //it's true
// console.log('after');  //after
// when(() =>!!store.aaa, () => console.log("it's true")) //不存在的变量 也不运行


/**
 * reaction - 自由组合可观察数据 声明
 */
// reaction(() => [store.string, store.number], arr => console.log(arr.join('/')))
// store.string = 'world';//world/20
// store.number = 30;//world/30

/**测试action */
// reaction(() => [store.string, store.number], arr => console.log(arr.join('/')))
// store.bar(); //测试action
// var bar_bound = store.bar_bound; //测试action.bound
// bar_bound();


//建议 runInAction 配合 reaction使用 全局一对一
/**测试runInAction  同action 但是action 可以定义多个 */
// reaction(() => [store.string, store.number], arr => console.log(arr.join('/')))  //lasdfj/30
// runInAction('modify', () => {
//     store.string = 'lasdfj';
//     store.number = 30;
// })