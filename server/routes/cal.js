const express = require('express');
const _ = require('underscore');
const app = express();
const Cali = require('../models/calificaciones');

app.get('/calif', function(req, res) {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 300;

    Cali.find({ estado: true })
        .skip(Number(desde))
        .limit(Number(hasta))
        .exec((err, cali) => {
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
                conteo: cali.length,
                cali
            });
        });
});

app.get('/cali/:id', function(req, res) {

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

app.post('/calif', function(req, res) {
    let body = req.body;
    let cal = new Cali({
        nombre: body.nombre,
        calificacion: body.calificacion
    });

    cal.save((err, calDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'Cal insertada con exito',
            calDB
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

app.delete('/calif/:id', function(req, res) {

    let id = req.params.id;

    Cali.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, calDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de eliminar',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'Calificacion eliminada con exito',
            calDB

        });
    });
});


module.exports = app;