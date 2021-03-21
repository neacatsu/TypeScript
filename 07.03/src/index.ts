class Input{
    quantity:HTMLInputElement;
    sumInput:HTMLInputElement;
    avgInput:HTMLInputElement;
    minInput:HTMLInputElement;
    maxInput:HTMLInputElement;
    dataInputs:HTMLDivElement;

    constructor(){
        this.getDataInput();
        this.getResultInput();
    }

    getDataInput(): void{
        this.quantity = document.querySelector("#addInput");
        this.quantity.addEventListener('input', () => this.clearInputs())
        this.quantity.addEventListener('input', () => this.createInputs(this.quantity))
        this.quantity.addEventListener('input', () => this.getInputs())
    }

    createInputs(quantity): void{
        this.dataInputs=document.querySelector("#dataInputs");

        for(let i = 0; i < quantity.value; i++){

            const div:HTMLDivElement = document.createElement("div");
            const checkBox:HTMLInputElement = document.createElement("input");
            const input:HTMLInputElement = document.createElement("input");
            const span: HTMLSpanElement = document.createElement("span");

            input.setAttribute("type", "text");
            input.setAttribute("class", "textBox");
            checkBox.setAttribute("type","checkbox");
            checkBox.setAttribute('class',"checkBox")
            span.setAttribute('class', "fa fa-remove");

            this.dataInputs.appendChild(div);
            div.appendChild(input)
            div.appendChild(checkBox)
            div.appendChild(span)
        }
        this.removeItem()
        this.removeChosenItems()
    }

    getItemList(): HTMLInputElement[] {
        const dataInputsNode:NodeList = document.querySelectorAll("#dataInputs input.textBox");
        const dataInputs: HTMLInputElement[] = Array.prototype.slice.call(dataInputsNode);
        return dataInputs;
    }

    getInputs(): void{
        const dataInputs: HTMLInputElement[] = this.getItemList();

        dataInputs.forEach((element: HTMLInputElement) => {
            element.addEventListener('input', () => {this.showResult(dataInputs)});
            element.addEventListener('input', () => {this.watchInputs()});
        });
    }

    getResultInput(): void{
        this.sumInput = document.querySelector("#sum");
        this.avgInput = document.querySelector("#avg");
        this.minInput = document.querySelector("#min");
        this.maxInput = document.querySelector("#max");
    }
    
    calculateResult(dataArr: HTMLInputElement[]) : number[]{
        const numberOfInputs:number = dataArr.length; 
        let firstNumber = 0;
        if(dataArr.length != 0) firstNumber = +dataArr[0].value;

        let min: number = firstNumber;
        let max: number = firstNumber;
        let sum: number = 0;

        dataArr.forEach((element:HTMLInputElement) => {
            sum += +element.value;
            if(min > +element.value) min = +element.value
            if(max < +element.value) max = +element.value
        });
    
        const avg: number = sum / numberOfInputs;
        return [sum, avg, min, max];
    }

    clearInputs(): void{
        document.querySelector("#dataInputs").innerHTML = "";
        this.sumInput.value = "";
        this.avgInput.value = "";
        this.minInput.value = "";
        this.maxInput.value = "";
    }

    showResult(dataArr: HTMLInputElement[]): void{
        const [sum, avg, min, max] : number[] = this.calculateResult(dataArr);
    
        this.sumInput.value = sum.toString();
        this.avgInput.value = avg.toString();
        this.minInput.value = min.toString();
        this.maxInput.value = max.toString();
    }

    watchInputs(): void{
        const dataInputs: HTMLInputElement[] = this.getItemList();
        const resultInputsNode:NodeList = document.querySelectorAll("#resultInputs > input");
        const resultInputs: HTMLInputElement[] = Array.prototype.slice.call(resultInputsNode);

        dataInputs.forEach((element:HTMLInputElement) => {
          if(element.value == "" ||  element.value == null || isNaN(+element.value)){
            resultInputs.forEach((el:HTMLInputElement) =>{
                el.value="something's wrong";
            })
          }
        });
    }

    removeItem(): void{
        const spanNode: NodeList = document.querySelectorAll("#dataInputs .fa");
        const spanArray: HTMLSpanElement[] = Array.prototype.slice.call(spanNode);

        spanArray.forEach((element: HTMLSpanElement)=>{
            element.addEventListener('click',()=>{
                element.parentNode.parentNode.removeChild(element.parentNode);
                const dataInputs: HTMLInputElement[] = this.getItemList();
                this.showResult(dataInputs);
                console.log(dataInputs.length)
                if(dataInputs.length === 0) {
                    this.clearInputs();
                } 
            })
        })

        
    }

    removeChosenItems(){
        const deleteButton: HTMLInputElement = document.querySelector(".delete");
        const checkboxNode: NodeList = document.querySelectorAll("#dataInputs input.checkBox");
        const checkboxArray: HTMLInputElement[] = Array.prototype.slice.call(checkboxNode);
        deleteButton.addEventListener('click', () =>{
            checkboxArray.forEach((element: HTMLInputElement) => {  
                if(element.checked){
                    element.parentNode.parentNode.removeChild(element.parentNode);
                    const dataInputs: HTMLInputElement[] = this.getItemList();
                    this.showResult(dataInputs);
                }
            })
            this.removeChosenItems();     
        })

        if(this.getItemList().length === 0) {
            this.clearInputs();
        } 
    }
}
const app = new Input();