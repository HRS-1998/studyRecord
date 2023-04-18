有两种方法：
     方案一：Text -> DataURL
      const dataUrl = `data:,${str}`
      download(dataUrl, 'demo.json')
      
     方案二：Text -> Blob -> ObjectURL
      const url = URL.createObjectURL(new Blob(str.split('')))
      download(url, 'demo1.json')


      