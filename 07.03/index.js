var Input = /** @class */ (function () {
    function Input() {
        this.startApp();
    }
    Input.prototype.getDataInput = function () {
        this.input1 = document.querySelector("#inp1");
        this.input2 = document.querySelector("#inp2");
        this.input3 = document.querySelector("#inp3");
        this.input4 = document.querySelector("#inp4");
        //console.log(this.input1);
    };
    Input.prototype.getResultInput = function () {
        this.sumInput = document.querySelector("#sum");
        this.avgInput = document.querySelector("#avg");
        this.minInput = document.querySelector("#min");
        this.maxInput = document.querySelector("#max");
    };
    Input.prototype.watchInputs = function () {
        var _this = this;
        this.input1.addEventListener('input', function () { return _this.showResult(); });
        this.input2.addEventListener('input', function () { return _this.showResult(); });
        this.input3.addEventListener('input', function () { return _this.showResult(); });
        this.input4.addEventListener('input', function () { return _this.showResult(); });
    };
    Input.prototype.calculateResult = function () {
        var data1 = +this.input1.value;
        var data2 = +this.input2.value;
        var data3 = +this.input3.value;
        var data4 = +this.input4.value;
        var numberOfInputs = 4;
        var sum = data1 + data2 + data3 + data4;
        var avg = sum / numberOfInputs;
        var min = Math.min(data1, data2, data3, data4);
        var max = Math.max(data1, data2, data3, data4);
        return [sum, avg, min, max];
    };
    Input.prototype.showResult = function () {
        var _a = this.calculateResult(), sum = _a[0], avg = _a[1], min = _a[2], max = _a[3];
        console.log("hes");
        this.sumInput.value = sum.toString();
        this.avgInput.value = avg.toString();
        this.minInput.value = min.toString();
        this.maxInput.value = max.toString();
    };
    Input.prototype.startApp = function () {
        this.getDataInput();
        this.getResultInput();
        this.watchInputs();
    };
    return Input;
}());
var app = new Input();
