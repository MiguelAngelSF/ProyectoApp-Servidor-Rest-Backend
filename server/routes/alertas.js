const express = require('express');
const _ = require('underscore');
const app = express();
const Alerta = require('../models/alertas');

app.get('/alerta', function(req, res) {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 300;

    Alerta.find({ estado: true })
        .skip(Number(desde))
        .limit(Number(hasta))
        .exec((err, alerta) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al momento de consultar',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Lista de alertas obtenida con exito',
                conteo: alerta.length,
                alerta
            });
        });
});

app.get('/alerta/:id', function(req, res) {

    let idAlerta = req.params.id;

    Alerta.findById({ _id: idAlerta })

    .exec((err, alertas) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de consultar',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Lista de productos obtenida con exito',
            conteo: alertas.length,
            alertas
        });
    });
});

app.post('/alerta', function(req, res) {
    let body = req.body;
    let ale = new Alerta({
        descripcion: body.descripcion
    });

    ale.save((err, aleDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'Alerta insertada con exito',
            aleDB
        });
    });
});

app.put('/viaje/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['articulo', 'precioUni']);

    Viaje.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' },
        (err, proDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al momento de actualizar',
                    err
                });
            }
            res.json({
                ok: true,
                msg: 'Producto actualizado con exito',
                producto: proDB
            });
        });
});

app.delete('/alerta/:id', function(req, res) {

    let id = req.params.id;

    Alerta.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, aleDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de eliminar',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'Alerta eliminado con exito',
            aleDB

        });
    });
});


module.exports = app;