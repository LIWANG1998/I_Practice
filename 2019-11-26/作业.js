let school = {
    name: "山东南翔",
    students: [
        {
            name: '国强子',
            age: 25,
            fav: ['唱歌', '游戏']
        },
        {
            name: '铁锤',
            age: 28,
            fav: ['rap', '游戏']
        }
    ],
    teachers: [
        {
            name: '唐老师',
            age: 45,
            fav: ['挖掘机', '开车']
        },
        {
            name: 'tony老师',
            age: 28,
            fav: ['洗', '剪', '吹']
        }
    ]
}
//1.至少使用两种方法完成上面school对象的深拷贝。可尝试使用函数递归的方式
// 使用json
// let schooltojson = JSON.stringify(school);
// console.log(schooltojson);
// let jsonstochool = JSON.parse(schooltojson);
function tojsonto(obj) {
    let str = JSON.stringify(obj);
    return JSON.parse(str);
}
// let jsonstr = tojsonto(school);
// //使用那个obj
// let schooltojson = Object.assign({}, school);
// console.log(schooltojson);
// -----------------------------------------------------------------
let httackBase = {
    hp: 100,
    mp: 100,
    gjl: 10,
    attack: function () { console.log('攻击对方') }
}
let hero = {
    hp: 100,
    mp: 100,
    gjl: 10,
    attack: function () { console.log('攻击对方') },
    type: 'hero'
}

let soldier = {
    hp: 100,
    mp: 100,
    gjl: 10,
    attack: function () { console.log('攻击对方') },
    type: 'soldier'
}
//2.给定三个对象模板，创建模板对应的构造函数，通过继承实现。
function HttackBase() {
    this.hp = 100;
    this.mp = 100;
    this.gjl = 10;
    this.attack = () => {
        console.log('攻击对方');
    }
}
// --------------------------------------
function Hero() {
    this.type = "hero";
    // HttackBase.apply(this, arguments);
    HttackBase.call(this);
}
// --------------------------------------
function Heroone() {
    this.type = "hero";
}
Heroone.prototype = new HttackBase();
Heroone.prototype.constructor = Heroone;
// --------------- 这种继承 需要 父类的属性 用 prototype 写出才行 -----------------------
HttackBase.prototype.hhp = 100;
function Herotwo() {
    this.type = "hero";
}
function zj() { }
zj.prototype = HttackBase.prototype;
Herotwo.prototype = new zj();
Herotwo.prototype.constructor = Herotwo;
// --------------------------------------
function Soldier() {
    this.type = "soldier";
    HttackBase.apply(this, arguments);
}

//3.完成一个网页时钟，样式不限。使用setInterval以及Date对象
//4.http://www.fgm.cc/learn/lesson7/01.html，可以尝试左右滑动模式