const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Driver = require('../models/driver');
const app = express();


app.get('/driver', function(req, res) {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 300;

    Driver.find({ estado: true })
        .skip(Number(desde))
        .limit(Number(hasta))
        .exec((err, conductores) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al momento de consultar',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Lista de usuarios obtenida con exito',
                conteo: conductores.length,
                conductores
            });
        });
});

app.get('/usuario/:id', function(req, res) {

    let idUsuario = req.params.id;

    Usuario.findById({ _id: idUsuario })
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al momento de consultar',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'usuario obtenido con exito',
                conteo: usuarios.length,
                usuarios
            });
        });
});

app.post('/driver', function(req, res) {
    let body = req.body;
    let dri = new Driver({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        edad: body.edad,
        genero: body.genero,
        tipoUsuario: body.tipoUsuario
    });

    dri.save((err, driDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'Usuario insertado con exito',
            driDB
        });
    });
});

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' },
        (err, usrDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al momento de actualizar',
                    err
                });
            }
            res.json({
                ok: true,
                msg: 'Usuario actualizado con exito',
                usuario: usrDB
            });
        });
});

app.delete('/usuario/:id', function(req, res) {
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

    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de eliminar',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'Usuario eliminado con exito',
            usrDB

        });
    });
});

module.exports = app;