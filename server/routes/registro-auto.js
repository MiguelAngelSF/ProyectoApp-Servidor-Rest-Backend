const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Registro = require('../models/registro-auto');
const app = express();

app.get('/registro-auto', function(req, res) {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 300;

    Registro.find({ estado: true })
        .skip(Number(desde))
        .limit(Number(hasta))
        .exec((err, registros) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al momento de consultar',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Lista de autos obtenida con exito',
                conteo: registros.length,
                registros
            });
        });
});

app.get('/registro-auto/:id', function(req, res) {

    let idRegistro = req.params.id;

    Registro.findById({ _id: idRegistro })
        .exec((err, registros) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al momento de consultar',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'registro obtenido con exito',
                conteo: registros.length,
                registros
            });
        });
});

app.post('/registro-auto', function(req, res) {
    let body = req.body;
    let reg = new Registro({
        propietario: body.propietario,
        modelo: body.modelo,
        placas: body.placas,
        anio: body.anio

    });

    reg.save((err, regDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'Auto insertado con exito',
            regDB
        });
    });
});

app.put('/registro-auto/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['titular', 'modelo']);

    Registro.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' },
        (err, regDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al momento de actualizar',
                    err
                });
            }
            res.json({
                ok: true,
                msg: 'Auto actualizado con exito',
                registros: regDB
            });
        });
});

app.delete('/registro-auto/:id', function(req, res) {
    // let id = req.params.id;

    // Usuario.deleteOne({ _id: id }, (err, usuarioBorrado) => {
    //     if (err) {
    //         return res.status(400).json({
    //             ok: true,
    //             msg: 'Ocurrio un error al momento de eliminar',
    //             err
    //         });
    //     }
    //     res.json({
    //         ok: true,
    //         msg: 'Usuario eliminado con exito',
    //         usuarioBorrado

    //     });

    // });

    let id = req.params.id;
    console.log(req.params);
    console.log(id);

    Registro.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, regDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de eliminar',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'Registro eliminado con exito',
            regDB

        });
    });
});

module.exports = app;