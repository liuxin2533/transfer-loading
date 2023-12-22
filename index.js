function lcm(numbers) {
    if (numbers.length === 1) {
        return numbers[0];
    }
    const currentLcm = lcm(numbers.slice(1)); // 计算剩余数的最小公倍数
    const gcd = function gcd(a, b) {
        if (b === 0) {
            return a;
        }
        return gcd(b, a % b);
    };
    // 最小公倍数 = 两数之积 / 最大公约数
    return currentLcm * numbers[0] / gcd(currentLcm, numbers[0]);
}
// 编写计算元素相对于屏幕左上角绝对位置的函数
function getPosition(element) {
    const rect = element.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}

function topBarHeight() {
    return window.outerHeight - window.innerHeight
}

function leftBarHeight() {
    return window.outerWidth - window.innerWidth
}

function clientToScreen(x, y) {
    return {
        x: x + window.screenX + leftBarHeight(),
        y: y + window.screenY + topBarHeight()
    };
}

function screenToClient(x, y) {
    return {
        x: x - window.screenX - leftBarHeight(),
        y: y - window.screenY - topBarHeight()
    };
}

const loading = document.querySelector('#loading')


const channel = new BroadcastChannel('channel');
channel.onmessage = (e) => {
    console.log(e.data);
    const clientPoint = screenToClient(e.data.x, e.data.y);
    console.log(clientPoint);
    loading.style.left = clientPoint.x + 'px';
    loading.style.top = clientPoint.y + 'px';
}

const offsetLeft = loading.offsetLeft
const offsetTop = loading.offsetTop
loading.onmousedown = (e) => {
    const x = e.pageX - loading.offsetLeft
    const y = e.pageY - loading.offsetTop

    window.onmousemove = (e) => {
        const cx = e.pageX - x - 50
        const cy = e.pageY - y - 50
        loading.style.left = cx + 'px'
        loading.style.top = cy + 'px'

        const screenPoint = clientToScreen(cx, cy)
        console.log('screenPoint', screenPoint);
        channel.postMessage(screenPoint)
    }
    window.onmouseup = () => {
        window.onmousemove = null
        window.onmouseup = null
    }
}

const dots = loading.children

function move(x, y) {
    loading.style.transitionDuration = '5s'
    loading.style.transform = `translate(${x}px, ${y}px)`
}

function expand(index, x, y) {
    console.log(dots[index]);
    dots[index].style.transform = `translate(${x}px, ${y}px)`
}

setTimeout(() => {
    console.log(lcm([1, 2, 3, 4]))
    console.log(getPosition(loading));
}, 2000)


