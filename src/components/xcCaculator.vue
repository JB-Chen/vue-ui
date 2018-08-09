<template>
  <div class="xc-caculator">
      我是计算器组件
      <br>
      <!-- 显示框 -->
      <br>
      <input id="input-box" type="text" size="20" maxlength="20" v-model="inputShow" readonly="readonly">{{outputShow}}
      <br>
      <div id="btn-list">
          <slot>
              <!-- 这里是网块状的输入按钮，目前只实现四则运算 -->
              <div @click="inputNum('7')" class="btn">7</div>
              <div @click="inputNum('8')" class="btn">8</div>
              <div @click="inputNum('9')" class="btn">9</div>
              <div @click="inputNum('plus')" class="btn">+</div>
              <div @click="inputNum('4')" class="btn">4</div>
              <div @click="inputNum('5')" class="btn">5</div>
              <div @click="inputNum('6')" class="btn">6</div>
              <div @click="inputNum('minus')" class="btn">-</div>
              <div @click="inputNum('1')" class="btn">1</div>
              <div @click="inputNum('2')" class="btn">2</div>
              <div @click="inputNum('3')" class="btn">3</div>
              <div @click="inputNum('multiply')" class="btn">*</div>
              <div @click="inputNum('dot')" class="btn">.</div>
              <div @click="inputNum('0')" class="btn">0</div>
              <div @click="inputNum('del')" class="btn">del</div>
              <div @click="inputNum('divide')" class="btn">/</div>
          </slot>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        // 输入区
        inputShow:'',
        // 中缀表达式
        infix:[],
        // 后缀表达式
        suffix:[],
        // 后缀表达式运算结果集
        result:[],
        // 对应的运算符
        op:{
            'plus':'+',
            'minus':'-',
            'multiply':'*',
            'divide':'/'
        },
        // 运算符
        opArr:['+','-','*','/'],
        // 储存最近的值
        lastVal:0,
        // s输出
        outputShow:''
    }
  },
  methods:{
    //   输入数字方法
    inputNum(val){
        // 按两次都是0-9
        if(!isNaN(parseInt(val,10))){
            // 构建中缀表达式
            let infixRe = this.buildInfix(parseInt(val,10),'add');
            this.inputShow = infixRe.join("");
            // 计算函数
            this.calculate();
            return ;
        }
        // 如果是运算符的话
        else if(this.isOp(this.op[val])){
            // 如果在没有输入操作数之前输入运算符的话
            if(!this.infix.length && ((this.op[val]==='*')||(this.op[val]==='/'))){
                return ;
            }
            let infixRe = this.buildInfix(this.op[val],'add');
            this.inputShow = infixRe.join("");
            // 计算函数
            // this.calculate()
        }
        // 如果是小数点的话
        else if(val==='dot'){
            // console.log("dot");
            // 重新构建中缀表达式
            let infixRe = this.buildInfix(this.lastVal,'change');
            this.inputShow = infixRe.join("");
            // 计算函数
            this.calculate()
        }
        // 如果是删除操作(删除新的一个)
        else if(val === 'del'){
            // 当第一个数大于1位时才可以执行
            if(this.infix[0]){
                let lastValLen = this.infix[0].toString().length;
                if(lastValLen>1){
                    // 构建中缀表达式
                    let infixRe = this.buildInfix(val,'del');
                    this.inputShow = infixRe.join("");
                    // 计算函数
                    this.calculate()
                }else{
                    // 构建中缀表达式
                    let infixRe = this.buildInfix(val,'del');
                    this.inputShow = infixRe.join("");
                    // 计算函数
                    this.calculate();
                    // 防止NaN错误
                    this.lastVal = 0
                }
            }
           
    
        }

    },
    // 构建中缀表达式
    buildInfix(val,type){
        // 添加操作，判断数字，运算符重复输入的情况
        if(type === 'add'){
            // 两个连续的数字
            if(!this.isOp(val) && !this.isOp(this.lastVal)){
                if(typeof(this.lastVal)==='string'){
                    // console.log("test2")
                    let newVal = this.infix.pop()+val;
                    this.infix.push(parseFloat(newVal));
                    this.lastVal = parseFloat(newVal);
                    // console.log(this.infix)
                    return this.infix;
                    
                }else{
                   if(this.isFloat(this.lastVal)){
                    //    console.log("i am float");
                        // 判断小数点后几位
                        let dotLen  = this.lastVal.toString().split('.')[1].length;
                        // console.log(val/Math.pow(10,(dotLen+1)));
                        let dotNem = val/Math.pow(10,(dotLen+1));
                        let newVal = this.lastVal+dotNem;
                        this.infix.pop();
                        // 修正浮点型的值。没有这个的话运算会出错，比如：9.2+0.03 = 9.2999999999...
                        newVal = parseFloat(newVal.toFixed(dotLen+1));
                        this.infix.push(newVal);
                        this.lastVal = newVal;
                        // console.log(this.infix);
                        return this.infix;

                   }else{
                       let newVal = this.lastVal*10 + val;
                        this.infix.pop();
                        this.lastVal = newVal;
                        this.infix.push(newVal);
                        // console.log(this.infix);
                        return this.infix;
                   }
                    
                }
               
            }
            // 如果输入连续两个运算符
            else if(this.isOp(val) && this.isOp(this.lastVal)){
                // console.log("sss")
                // console.log(this.infix)
                return this.infix;
            }
            // 首个数字正负数
            else if(!this.isOp(val) && this.infix.length === 1 && (this.lastVal === '+' || this.lastVal === '-')){
                let newVal = this.lastVal === '+'?val : 0-val;
                this.infix.pop();
                this.infix.push(newVal);
                this.lastVal = newVal;
                // console.log(this.infix);
                return this.infix;
            }
            // console.log(val);
            this.lastVal = val;
            this.infix.push(val);
            // console.log(this.infix)
            return this.infix;
        }
        // 更改操作，小数点的情况
        else if(type==='change'){
            // 数值不是浮点型时
            if(!this.isFloat(this.lastVal)){
                this.infix.pop();
                this.infix.push(val+='.');
                this.lastVal = val;
                // console.log(this.infix)
                return this.infix;
            }else{
                return this.infix;
            }
        }
        // 删除操作，删除一个
        else if(type === 'del'){
             
            let newVal = this.infix.pop();
            // 删除末尾一位数
            newVal = Math.floor(newVal/10);
            if(newVal){
                this.infix.push(newVal);
            }
            this.lastVal = this.infix[this.infix.length - 1];
            
            // console.log(this.infix)
           
            return this.infix;
        }

    },
    // 判断是否为运算符（运算符返回真，数字的话返回假）
    isOp(op){
        return op && this.opArr.indexOf(op) !== -1;
    },
    // 判断浮点型数字函数
    isFloat(n){
        return /^-?\d*\.\d+$/.test(n);
    },
    // 判断运算符的优先级
    priorHigher(a,b){
        return (a === '+'|| a==='-') && (b==='*' || b==='/');
    },
    // 中缀转后缀
    infix2Suffix(){
        // console.log("infix");
        // console.log(this.infix);
        this.suffix=[];
        // 存放运算符的数组
        let temp = [];
        for(let i=0;i<this.infix.length;i++){
            // 数值的话，直接压入
            if(!this.isOp(this.infix[i])){
                this.suffix.push(this.infix[i]);
                // console.log(this.suffix)
            }
            else{
                // 当长度为空时
                if(!temp.length){
                    temp.push(this.infix[i]);
                }
                // 不为空时
                else{
                    // 栈顶部的操作符
                    let opTop = temp[temp.length-1];
                    // 循环判断运算符的优先级，将优先级高的压入后缀表达式suffix
                    if(!this.priorHigher(opTop,this.infix[i])){
                        // 当temp有长度时且前者优先级高，则将优先级高的压入suffix，然后判断栈顶（有长度时才能操作）
                        while(temp.length && !this.priorHigher(opTop,this.infix[i])){
                            this.suffix.push(temp.pop());
                            // 判断栈顶（有长度时才能操作）
                            opTop = temp[temp.length-1];
                        }
                    }
                    // 将当前的运算符也压入后缀表达式
                    temp.push(this.infix[i]);
                }
            }
        }
        // 将剩下的运算符也压入
        while(temp.length){
            this.suffix.push(temp.pop());
        }
        // this.suffix.shift();
        //  console.log("infix2suffix")
        //  console.log(this.suffix);
        //  this.calSuffix()
       
        // this.calSuffix();
    },
    // 进行运算符的运算
    opCalc(b,op,a){
        return op === '+'
                ?a+b
                :op === '-'
                ?a-b
                :op === '*'
                ?a*b
                :op === '/'
                ?a/b
                :0;
    },
    // 后缀表达式的运算
    calSuffix(){
        //   console.log("infix2suffix")
        //  console.log(this.suffix);
         this.result = [];
        for(let i=0;i<this.suffix.length;i++){
            // 数值，直接压入结果集
            if(!this.isOp(this.suffix[i])){
                this.result.push(this.suffix[i]);
            }
            // 运算符,从结果集抽出两项进行运算,并将结果压入
            else{
                this.result.push(this.opCalc(this.result.pop(),this.suffix[i],this.result.pop()));
            }
        }
        // 对结果是浮点型的进行精度求精(此处为bug待完善)
        if(this.isFloat(this.result[0])){
            this.result[0] = parseFloat(this.result[0].toFixed(4))
        }
        // 此时结果集只有一个值
        //  console.log("Result")
        //  console.log(this.result)
        // console.log(this.result[0])
        return this.result[0];
    },
    // 即时得到运算的结果
    calculate(){
       
        this.infix2Suffix();
       
        this.calSuffix()
        let suffixRe = this.calSuffix();
        if(suffixRe){
            this.outputShow = '='+suffixRe;
        }

    }
  }
}
</script>

<style lang="scss" scoped>
#btn-list{
    margin-top:1.0667rem;
    width: 10rem;
    height: 8.2667rem;
    background-color: gray;
    .btn{
        float: left;
        width: 2.5rem;
        height: 2.067rem;
        line-height: 2.067rem;
        background: #fff;
        text-align: center;
    }
}
</style>

