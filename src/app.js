const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/celulares", (req, res) => {
res.status(200).send(celulares);
})

app.get("/celulares", (req, res) => {
    fs.readFile('productos.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error al leer el archivo de productos');
        }
        const productos = JSON.parse(data);
        res.status(200).send(productos);
    });
});

app.get("/celulares/:pid", (req, res) => {
    const pid = parseInt(req.params.pid); 
    const celular = celulares.find(modelo => modelo.id === pid); 

    if (celular) {
        res.status(200).send(celular); 
    } else {
        res.status(404).send({ message: 'Celular no encontrado' });
    }
});