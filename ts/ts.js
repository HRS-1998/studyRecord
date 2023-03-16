/**
 * ##基础类型
 boolean

 number 

 string  

 数组：1.let list: number[] =[1,2,3]
       2.let list: Array<number> =[1,2,3]

 元组：元组类型允许表示一个已知元素数量和类型的数组(Tuple)
       let x:[string,number]    x=['三',2]

 枚举：enum Color {Red,Green,Blue}
       let c: Color=Color.Green
       let d: Color=Color[1]              //c==d

 任意值： any

 空值：void   声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null

 Null和Undefined 

 Never:表示的是那些永不存在的值的类型

 类型断言：有两种形式---- (两种形式是等价的，但在使用JSX时只有as语法断言是被允许的)
 1.‘尖括号’语法
     let someValue: any ='this is a string';
     let strLength: number =(<string>someValue).length;

 2. as语法

     let strLength: number= (someValue as string).length;


 * ##变量声明


 * ##接口
     1.属性类型接口
     interface LabelledValue {
        label: string;
        age?: number       //可选属性
        readonly name: string //只读属性
     }
     function printLabel(labelledObj: LabelledValue){
        console.log(labelledObj.label)
     }
     let myObj={size:10,label:"SSSSS"}
     printLabel(myObj)

     let a: number[] = [1,3,4]
     let ro: ReadonlyArray<number> = a        //ReadonlyArray<T> 只读属性

     2.接口也可以用来表示函数类型
     interface SearchFun{
        (source: string ,subString: string): boolean
     }
     let myFun: searchFun
     myFun=function(source:string,subString: string){
        let result=source.search(subString)
        return result > -1
     }
      
     3.可索引的类型
     interface StringArray{
        [index: number]: string
     }
     let myArray: StringArray
     myArray=['a','b']
     let myStr: string= myArray[0]

     4.类类型接口
     interface ClockInterface {
     currentTime: Date;
     setTime(d: Date);
     }
     //类去实现这个接口
     class Clock implements ClockInterface {
        currentTime: Date;
        setTime(d: Date) {
        this.currentTime = d;
     }
     constructor(h: number, m: number) { }
    }

 * ##类
    static 类名. 的方式访问   Person.name
    public  
    private  私有化属性，外部不能访问
    readonly 只读
    get/set  存取器
    protect  私有属性，可以被子类继承，
    当构造函数constructor被protect保护时，代表这个类不能被实例化new
    lass Person {
        static age:number
        protected name: string;
        protected constructor(theName: string) { this.name = theName; }
    }
    class Employee extends Person {
        private department: string;
        constructor(name: string, department: string) {
            super(name);
            this.department = department;
        }
        public getElevatorPitch() {
            return `Hello, my name is ${this.name} and I work in ${this.department}.`;
        }
    }
    let howard = new Employee("Howard", "Sales");
    let john = new Person("John"); // 错误: 'Person' 的构造函数是被保护的.
 
     abstract  抽象类  不可被实例化，可以对其子类实例化，子类必须实现抽象方法
 * ##函数
 * ##泛型
     <T>
     泛型约束
     interface Lengthwise{
        length: number
     }
     function login<T extends Lengthwise>(arg:T): T{
     console.log(arg.length)
     return arg   
    }

 * ##枚举


 * ##类型推论


 * ##类型兼容性


 * ##高级类型
    交叉类型，联合类型

 * ##symbols

 * ##iterators和Generators


 * ##模块

 * ##命名空间




    ts2.3以后使用--checkJs对.js文件进行类型检查
    可以通过// @ts-nocheck注释忽略类型检查
    // @ts-ignore忽略本行
    // @ts-check来检查某些.js文件

    在.js文件中通过JSDoc注解修饰的声明会被设置为这个声明的类型
    // /**@type {number} (*)/  --这里*没有()
     @arguments对参数注解

 --------------------------写好一份声明文件---------------------
 
 --------------------------tsconfig.json--------------------- 
   
 
 */

