// function fn(e){
//     console.log('111',e)
// }
function debounce(fn,delay){
    let timer
    let args=arguments
    return function(){

    if(timer) clearTimeout(timer)
        timer=setTimeout(()=>{ 
        fn.call(args)
        },delay)
    }
   
} 


