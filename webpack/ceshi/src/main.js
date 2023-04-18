const {SyncHook} =require("tapable")

const syncHook= new SyncHook(['author'])

syncHook.tap('监听器1',(name)=>{
  console.log('监听器1',name)
})

syncHook.call("触发了tap")