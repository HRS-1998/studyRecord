export const captureMouse = (element) => {
    const mouse = {
      x: 0,
      y: 0,
      event: null,
    }
    const { offsetLeft, offsetTop } = element
  
    element.addEventListener('mousemove', (e) => {
      let x
      let y
      x = e.pageX
      y = e.pageY
      x -= offsetLeft
      y -= offsetTop
      mouse.x = x
      mouse.y = y
      mouse.event = e
    })
    return mouse
  }