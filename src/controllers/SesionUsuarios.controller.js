import usuarioModel from "../models/sesionUsuarios.model";

export const findAllUsuario = async (req, res) => {
    try {
        const datosBuscar = "usuario correo"
        const usuarios = await usuarioModel.find({}, datosBuscar)
            .populate('codigoRolXPermiso');
        res.json(usuarios);
    } catch (error) {
        res.status = 500;
        res.json({
            message: "Something goes wrang creating the tallas"
        })
    }
}

export const findOneUsuario = async (req, res) => {
    const datosBuscar = "usuario correo"
    const usuario = await usuarioModel.findOne({ usuario: req.query.usuario, contrasenha: req.query.contrasenha }, datosBuscar)
        .populate('codigoRolXPermiso');
    res.json(usuario)
}

export const createUsuario = async (req, res) => {
    const newUsuario = new usuarioModel({ usuario: req.body.usuario, contrasenha: req.body.contrasenha, correo: req.body.correo, codigoRolXPermiso: req.body.codigoRolXPermiso })
    const usuarioSave = await newUsuario.save();
    res.json({ usuarioSave });
}

export const deleteUsuario = async (req, res) => {
    await usuarioModel.findOneAndDelete({ usuario: req.body.usuario, contrasenha: req.body.contrasenha })
    res.json({
        message: `${req.params.id} were deleted successfully`
    })
}

export const updateUsuario = async (req, res) => {
    try {
        const usuarioActualizado = await usuarioModel.findOneAndUpdate(
            { usuario: req.body.usuario, contrasenha: req.body.contrasenha },
            { contrasenha: req.body.newContrasenha },
            { new: true }
        );
        if (usuarioActualizado) {
            res.sendStatus(205);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.sendStatus(500);
    }
};