import express from "express";

let celulares = [
    {
        id: "Alf232",
        modelo: "iphone 15 pro max",
        marca: "Apple",
        caracteristicas: ["256gb", "8 ram", "150mp"]
    },
    {
        id: "Alf214",
        modelo: "iphone 14 pro max",
        marca: "Apple",
        caracteristicas: ["512gb", "8 ram", "100mp"]
    },
    {
        id: "Syd485",
        modelo: "motorola e22",
        marca: "Motorola",
        caracteristicas: ["128gb", "4 ram", "15mp"]
    },
    {
        id: "Sta254",
        modelo: "s23 ultra",
        marca: "Samsung",
        caracteristicas: ["512gb", "8 ram", "150mp"]
    }
]

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/celulares", (req, res) => {
    res.status(200).send(celulares);
})

app.get("/celulares/:modelo", (req, res) => {
    const { modelo } = req.params;
    const celularesFiltrados = celulares.filter((celular) => celular.modelo === modelo)
    res.send (celularesFiltrados)
})

app.post("/celulares", (req, res) => {
    const { modelo, marca, caracteristicas } = req.body;
    if( !modelo || !marca || !caracteristicas || caracteristicas.length === 0 ) return res.status(404).send({ message: "Error al recuperar los datos" });
        
        celulares.push({ modelo, marca, caracteristicas });
        res.status(201).send(celulares)
})

app.put("/celulares/:id", (req, res)=> {

    const { id } = req.params;
    const { modelo, marca, caracteristicas } = req.body;
    const index = celulares.findIndex( (celular) => celular.id === id )

    if(index === -1) return res.status(404).send({ message:"Error, ese modelo no existe aqui" })

    celulares[index] = {
        id: celulares[index].id,
        modelo,
        marca,
        caracteristicas
    }

    res.status(200).send(celulares);

})

app.delete("/celulares/:id", (req, res)=> {
    const { id } = req.params;
    const index = celulares.findIndex((celular) => celular.id === id )
    if(index === -1) return res.status(404).send({ message:"Error, ese modelo no existe aqui" })
    
        let celularesFiltrados = celulares.filter((celular)=> celular.id !== id );

        celulares = [...celularesFiltrados];

        res.status(200).send(celulares);

})

app.listen( 8080, () => console.log("Servidor iniciado en: http://localhost:8080 ") );