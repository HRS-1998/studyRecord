var path = '../image/project-list.png'
function clipImage(path){
    const canvas = document.createElement('canvas')
    canvas.width = 200
    canvas.height = 100
    const ctx = canvas.getContext('2d')
    const img = document.createElement('img')
    img.src = path
    img.setAttribute("crossOrigin",'Anonymous')
    img.onload = function (){
        ctx.drawImage(this,0,0,200,100)
        console.log(canvas.toDataURL())
    }
}
clipImage(path)