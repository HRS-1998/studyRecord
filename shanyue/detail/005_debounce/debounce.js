// function fn(e){
//     console.log('111',e)
// }
function debounce(fn,delay){
    let timer
    let args=arguments
    let self=this
    return function(){

    if(timer) clearTimeout(timer)
        timer=setTimeout(()=>{ 
        fn.apply(self,args)
        },delay)
    }
   
} 


