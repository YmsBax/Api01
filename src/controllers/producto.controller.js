import productos from '../models/productos.model'

export const findAllProducto = async (req, res) => {
    const producto = await productos.find()
    .populate('categoria');
    res.json(producto);
}

export const createProducto = async (req, res) => {
    const producto = new productos({ codigo: req.body.codigo, nombre: req.body.nombre, descripcion: req.body.descripcion, cantidad: req.body.cantidad, valorUnitario: req.body.valorUnitario,
        estadoProducto: req.body.estadoProducto, categoria: req.body.categoria})
    const newProducto = await producto.save();
    res.json(newProducto);
}

export const findOneProducto = async (req, res) => {
    const producto = await productos.findById(req.params.id)
    res.json(producto);
}

export const deleteProducto = async (req, res) => {
    await productos.findByIdAndDelete(req.params.id);
    res.json({
        message: `${req.params.id} were producto deleted`
    })
}

export const updateProducto = async (req, res) => {
    const updatedproducto = await productos.findByIdAndUpdate(req.params.id, req.body)
    res.json({ updatedproducto })
}