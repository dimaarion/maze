export default class Action{

    arrayCount(n) {
        let a = [];
        for (let i = 0; i < n; i++) {
            a[i] = i + 1;
        }
        return a;
    }

    percent(num,pr) {
        return num * pr / 100;
    }
}