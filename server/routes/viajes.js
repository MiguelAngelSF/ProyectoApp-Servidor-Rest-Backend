const express = require('express');
const _ = require('underscore');
const app = express();
const Viaje = require('../models/viajes');

app.get('/viaje', function(req, res) {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 300;

    Viaje.find({ estado: true })
        .skip(Number(desde))
        .limit(Number(hasta))
        .exec((err, viajes) => {
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
                conteo: viajes.length,
                viajes
            });
        });
});

app.get('/viaje/:id', function(req, res) {

    let idViaje = req.params.id;

    Producto.findById({ _id: idViaje })

    .exec((err, viajes) => {
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
            conteo: viajes.length,
            viajes
        });
    });
});

app.post('/viaje', function(req, res) {
    let body = req.body;
    let via = new Viaje({
        destino: body.destino,
        actual: body.actual,
        pago: body.pago
    });

    via.save((err, viaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'Viaje insertado con exito',
            viaDB
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

app.delete('/viaje/:id', function(req, res) {

    let id = req.params.id;

    Viaje.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, viaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de eliminar',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'Viaje eliminado con exito',
            viaDB

        });
    });
});


module.exports = app;