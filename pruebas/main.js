// app.get("/", (req, res)=> {

//     res.json ({message: "Hola mundo"})

// })

// app.get("/bienvenido", (req,res) => {

//     const html = `
//     <!DOCTYPE html>
//     <html>
//     <body>
//         <h1 style="color: blue">Bienvenidos a mi pagina</h1>
//     </body>
//     </html>
//     `

//     res.setHeader("Content-Type", "text/html")

//     res.send(html)

// })

// app.get("/usuario", (req, res) => {

//     res.json({ fullname: "Franco", age: 25, email: "franco@gmail.com"})

// })

// app.get("/usuario/:id", (req, res) =>{
//     const userId = req.params.id
//     res.send({ message: `Usuario con id: ${userId}` })
// })

// app.get("/buscar", (req, res)=> {
//     const { categoria,precio } = req.query;
//     res.send({ message: `Producto de categoria: ${categoria}, con precio: ${precio}` })
// })
