//async await 的实现
const getData=()=>{
    console.log('222')
    let a=0
    return new Promise((resolve)=>setTimeout(()=>resolve(a+1)),1000)
 
}

//generator 函数
function* testG(){
    console.log('11111')
    const data=yield getData()
    console.log('data',data,arguments)
    const data2=yield getData()
    console.log('data2',data2)
    return 'success'
}

function asyncToGenerator(fun){
    return function(){
        // console.log(11)
        const gen=fun.apply(this,arguments)
        return new Promise((resolve,reject)=>{
            function step(key,arg){
                let generatorResult;
                try{
                generatorResult=gen[key](arg)
                }catch(error){
                    return reject(error)
                }
                const {value,done}=generatorResult
                if(done){ 
                      resolve(value)
                }else{
                    return Promise.resolve(value).then(
                        function onResolve(val){
                            step("next",val)
                        },
                        function onReject(err){
                            step("throw",err)
                        }
                    )
                }
            }
            step("next")
        })
    }
}
const testGAsync=asyncToGenerator(testG)

testGAsync().then(result=>{
    console.log(result);
})

