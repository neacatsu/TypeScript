var Input = /** @class */ (function () {
    function Input() {
        this.getDataInput();
        this.getResultInput();
    }
    Input.prototype.getDataInput = function () {
        var _this = this;
        this.quantity = document.querySelector("#addInput");
        this.quantity.addEventListener('input', function () { return _this.clearInputs(); });
        this.quantity.addEventListener('input', function () { return _this.createInputs(_this.quantity); });
        this.quantity.addEventListener('input', function () { return _this.getInputs(); });
    };
    Input.prototype.createInputs = function (quantity) {
        this.dataInputs = document.querySelector("#dataInputs");
        for (var i = 0; i < quantity.value; i++) {
            var div = document.createElement("div");
            var checkBox = document.createElement("input");
            var input = document.createElement("input");
            var span = document.createElement("span");
            input.setAttribute("type", "text");
            input.setAttribute("class", "textBox");
            checkBox.setAttribute("type", "checkbox");
            checkBox.setAttribute('class', "checkBox");
            span.setAttribute('class', "fa fa-remove");
            this.dataInputs.appendChild(div);
            div.appendChild(input);
            div.appendChild(checkBox);
            div.appendChild(span);
        }
        this.removeItem();
        this.removeChosenItems();
    };
    Input.prototype.getItemList = function () {
        var dataInputsNode = document.querySelectorAll("#dataInputs input.textBox");
        var dataInputs = Array.prototype.slice.call(dataInputsNode);
        return dataInputs;
    };
    Input.prototype.getInputs = function () {
        var _this = this;
        var dataInputs = this.getItemList();
        dataInputs.forEach(function (element) {
            element.addEventListener('input', function () { _this.showResult(dataInputs); });
            element.addEventListener('input', function () { _this.watchInputs(); });
        });
    };
    Input.prototype.getResultInput = function () {
        this.sumInput = document.querySelector("#sum");
        this.avgInput = document.querySelector("#avg");
        this.minInput = document.querySelector("#min");
        this.maxInput = document.querySelector("#max");
    };
    Input.prototype.calculateResult = function (dataArr) {
        var numberOfInputs = dataArr.length;
        var firstNumber = 0;
        if (dataArr.length != 0)
            firstNumber = +dataArr[0].value;
        var min = firstNumber;
        var max = firstNumber;
        var sum = 0;
        dataArr.forEach(function (element) {
            sum += +element.value;
            if (min > +element.value)
                min = +element.value;
            if (max < +element.value)
                max = +element.value;
        });
        var avg = sum / numberOfInputs;
        return [sum, avg, min, max];
    };
    Input.prototype.clearInputs = function () {
        document.querySelector("#dataInputs").innerHTML = "";
        this.sumInput.value = "";
        this.avgInput.value = "";
        this.minInput.value = "";
        this.maxInput.value = "";
    };
    Input.prototype.showResult = function (dataArr) {
        var _a = this.calculateResult(dataArr), sum = _a[0], avg = _a[1], min = _a[2], max = _a[3];
        this.sumInput.value = sum.toString();
        this.avgInput.value = avg.toString();
        this.minInput.value = min.toString();
        this.maxInput.value = max.toString();
    };
    Input.prototype.watchInputs = function () {
        var dataInputs = this.getItemList();
        var resultInputsNode = document.querySelectorAll("#resultInputs > input");
        var resultInputs = Array.prototype.slice.call(resultInputsNode);
        dataInputs.forEach(function (element) {
            if (element.value == "" || element.value == null || isNaN(+element.value)) {
                resultInputs.forEach(function (el) {
                    el.value = "something's wrong";
                });
            }
        });
    };
    Input.prototype.removeItem = function () {
        var _this = this;
        var spanNode = document.querySelectorAll("#dataInputs .fa");
        var spanArray = Array.prototype.slice.call(spanNode);
        spanArray.forEach(function (element) {
            element.addEventListener('click', function () {
                element.parentNode.parentNode.removeChild(element.parentNode);
                var dataInputs = _this.getItemList();
                _this.showResult(dataInputs);
                console.log(dataInputs.length);
                if (dataInputs.length === 0) {
                    _this.clearInputs();
                }
            });
        });
    };
    Input.prototype.removeChosenItems = function () {
        var _this = this;
        var deleteButton = document.querySelector(".delete");
        var checkboxNode = document.querySelectorAll("#dataInputs input.checkBox");
        var checkboxArray = Array.prototype.slice.call(checkboxNode);
        deleteButton.addEventListener('click', function () {
            checkboxArray.forEach(function (element) {
                if (element.checked) {
                    element.parentNode.parentNode.removeChild(element.parentNode);
                    var dataInputs = _this.getItemList();
                    _this.showResult(dataInputs);
                }
            });
            _this.removeChosenItems();
        });
        if (this.getItemList().length === 0) {
            this.clearInputs();
        }
    };
    return Input;
}());
var app = new Input();
