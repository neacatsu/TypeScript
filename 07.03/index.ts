class Input{
    
    input1:HTMLInputElement;
    input2:HTMLInputElement;
    input3:HTMLInputElement;
    input4:HTMLInputElement;

    sumInput:HTMLInputElement;
    avgInput:HTMLInputElement;
    minInput:HTMLInputElement;
    maxInput:HTMLInputElement;

    constructor(){
        this.startApp();
    }

    getDataInput(){
        this.input1 = document.querySelector("#inp1");
        this.input2 = document.querySelector("#inp2");
        this.input3 = document.querySelector("#inp3");
        this.input4 = document.querySelector("#inp4");
        
    }

    getResultInput(){
        this.sumInput = document.querySelector("#sum");
        this.avgInput = document.querySelector("#avg");
        this.minInput = document.querySelector("#min");
        this.maxInput = document.querySelector("#max");
        }

    watchInputs(){
        this.input1.addEventListener('input', () => this.showResult())
        this.input2.addEventListener('input', () => this.showResult())
        this.input3.addEventListener('input', () => this.showResult())
        this.input4.addEventListener('input', () => this.showResult())
    }

    calculateResult() : number[]{

        const data1:number = +this.input1.value;
        const data2:number = +this.input2.value;
        const data3:number = +this.input3.value;
        const data4:number = +this.input4.value;

        const numberOfInputs=4;

        const sum:number = data1+data2+data3+data4;
        const avg:number = sum/numberOfInputs;
        const min:number = Math.min(data1, data2, data3, data4);
        const max:number = Math.max(data1, data2, data3, data4);

        return [sum, avg, min, max];
    }

    showResult(){
        const [sum, avg, min, max] = this.calculateResult();
    
        
        this.sumInput.value= sum.toString();
        this.avgInput.value= avg.toString();
        this.minInput.value= min.toString();
        this.maxInput.value= max.toString();
    }

    startApp(){
        this.getDataInput()
        this.getResultInput()
        this.watchInputs()
    }


}
const app = new Input();