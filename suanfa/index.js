let app=new Set()
let b=1;
app.add(()=>{
 b=b+10;
 console.log(b)
})

console.log(app)
app.forEach(item=>{
    item()
})