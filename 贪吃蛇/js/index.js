var container = $id("container")
timer = null,
    food = null
uls = $id("uls")
lis = $tagName(uls, "li")
btn = $id("btn")
score = $id("score")
// 初始积分
index = 0;
person = $id("person")
personDiv = $tagName(person, "div")
// 元素宽高
datas = {
    size: 20,
    x: 30,
    y: 30
}
// 速度
perData = {
    speed: 100,
    code: 39
}
// 定时器
timer = null
// 初始化游戏
function init() {
    createMap()
}
// 地图制作
function createMap() {
    container.style.width = (datas.size + 1) * datas.x + "px"
    for (let i = 0; i < datas.x * datas.y; i++) {
        let oDiv = document.createElement('li')
        oDiv.index = i;
        oDiv.style.width = oDiv.style.height = datas.size + "px"
        uls.appendChild(oDiv)
    }
    start()
}
// 开始游戏
function start() {
    btn.onclick = function () {
        createPerson()
        movePerson()
        bindPerson()
        createFood()
    }
}
//创建人物
function createPerson() {
    let oPerson = document.createElement('div');
    oPerson.style.width = oPerson.style.height = datas.size + 1 + "px"
    person.appendChild(oPerson)
}
// 创建食物
function createFood() {
    var hrr = [];
    for (let i = 0; i < lis.length; i++) {
        if (isFilter(lis[i])) {
            hrr.push(lis[i])
        }
    }
    // 生成随机数
    let random = Math.floor(Math.random() * (hrr.length - 1))
    food = document.createElement('div')
    food.className = 'food'
    food.style.width = food.style.height = (datas.size + 1) + "px"
    food.style.top = hrr[random].offsetLeft + "px"
    food.style.left = hrr[random].offsetTop + "px"
    container.appendChild(food)
}
// 过滤
function isFilter(li) {
    for (let i = 0; i < personDiv.length; i++) {
        if (li.index = personDiv[i].index) {
            return false;
        }
    }
    return true;
}
// 移动
function movePerson() {
    timer = setInterval(() => {
        if (isOut() || isSelf()) {
            clearInterval(timer)
            let isReset = alert('蛇蛇扑街了，游戏结束!')
            location.reload()
        }
        for (let i = personDiv.length - 1; i > 0; i--) {
            personDiv[i].style.left = personDiv[i - 1].offsetLeft + "px";
            personDiv[i].style.top = personDiv[i - 1].offsetTop + "px";
            personDiv[i].index = personDiv[i - 1].index;
        }
        if (crush(personDiv[0], food)) {
            food.removeAttribute('class')
            createPerson();
            createFood();
            num();
        }
        switch (perData.code) {
            case 37:
                personDiv[0].style.left = personDiv[0].offsetLeft - (datas.size + 1) + "px"
                personDiv[0].style.background = 'url(../imgs/蛇头_左.png) no-repeat center center'
                personDiv[0].index -= 1;
                break;
            case 38:
                personDiv[0].style.top = personDiv[0].offsetTop - (datas.size + 1) + "px"
                personDiv[0].style.background = 'url(../imgs/蛇头_上.png) no-repeat center center'
                personDiv[0].index -= datas.x
                break;
            case 39:
                personDiv[0].style.left = personDiv[0].offsetLeft + (datas.size + 1) + "px"
                personDiv[0].style.background = 'url(../imgs/蛇头_右.png) no-repeat center center'
                personDiv[0].index += 1;
                break;
            case 40:
                personDiv[0].style.top = personDiv[0].offsetTop + (datas.size + 1) + "px"
                personDiv[0].style.background = 'url(../imgs/蛇头_下.png) no-repeat center center'
                personDiv[0].index += datas.x
                break;
        }
    }, perData.speed);
}
// 改变移动方向
function bindPerson() {
    document.onkeydown = function (e) {
        var e = window.event || e;
        switch (e.keyCode) {
            case 37:
                perData.code = 37;
                break;
            case 38:
                perData.code = 38;
                break;
            case 39:
                perData.code = 39;
                break;
            case 40:
                perData.code = 40;
                break;
        }
    }
}
// 蛇与食物碰撞
function crush(el1, el2) {
    let l1 = el1.offsetLeft + el1.offsetWidth;
    let r1 = el1.offsetLeft;
    let t1 = el1.offsetTop + el1.offsetHeight;
    let b1 = el1.offsetTop;

    let l2 = el2.offsetLeft + el2.offsetWidth;
    let r2 = el2.offsetLeft;
    let t2 = el2.offsetTop + el2.offsetHeight;
    let b2 = el2.offsetTop;

    if (l1 <= r2 || r1 >= l2 || t1 <= b2 || b1 >= t2) {
        return false
    } else {
        return true
    }
}
// 改变积分
function num() {
    index += 100;
    score.innerHTML = '积分:' + index
}
// 判断是否出界
function isOut() {
    for (let i = 0; i < lis.length; i++) {
        if (crush(lis[i], personDiv[0])) {
            return false
        }
    }
    return true
}
// 判断是否碰撞到蛇身
function isSelf() {
    for (let i = 1; i < personDiv.length; i++) {
        if (crush(personDiv[0], personDiv[i])) {
            return true
        }
    }
    return false
}
// 获取子div元素
function $tagName(parend, child) {
    return parend.getElementsByTagName(child)
}
// 获取元素
function $id(id) {
    return document.getElementById(id)
}
init();