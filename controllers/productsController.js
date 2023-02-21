const db = require('../src/database/models/index');
const { validationResult } = require('express-validator');

const controller = {
   products: (req, res) => {
      db.Product.findAll().then(function (products) {
         return res.json(products);
      });
   },

   /* Eliminar metodo */
   create: function (req, res) {
      let oldData = req.body;
      return res.render('create', { oldData: oldData });
   },
   /*  */

   save: function (req, res) {
      // Que conviene hacer con las validaciones del back, redirigir a otra ruta?? Ya que ahora no se puede renderizar la vista con los errores
      /* const resultValidation = validationResult(req);
      if (resultValidation.errors.length > 0) {
         return res.render('create', {
            oldData: req.body,
            errors: resultValidation.mapped(),
         });
      } */
      db.Product.create({
         name: req.body.name,
         description: req.body.description,
         image: 'http://localhost:3007/images/products/' + req.file.filename,
         status: req.body.status,
         price: req.body.price,
         discount: req.body.discount,
      }).then((product) => {
         return res.status(200).json({
            data: product,
            status: 200,
         });
      });
   },

   /* Eliminar metodo */
   detail: (req, res) => {
      db.Product.findByPk(req.params.id).then(function (product) {
         return res.render('productDetail', { product: product });
      });
   },
   /*  */

   edit: (req, res) => {
      db.Product.findByPk(req.params.id).then(function (product) {
         return res.json(product);
      });
   },

   update: (req, res) => {
      // incorporar olData y que los cambios en el edit no se pisen por el producto original, en caso de que las validaciones den error
      const resultValidation = validationResult(req);
      if (resultValidation.errors.length > 0) {
         db.Product.findByPk(req.params.id).then(function (product) {
            return res.render('edit', {
               product: product,
               errors: resultValidation.mapped(),
            });
         });
      } else {
         db.Product.update(
            {
               name: req.body.name,
               description: req.body.description,
               image: 'http://localhost:3007/images/products/' + req.file.filename,
               status: req.body.status,
               price: req.body.price,
               discount: req.body.discount,
            },
            {
               where: {
                  id: req.params.id,
               },
            }
         );
         res.redirect('/products/productDetail/' + req.params.id);
      }
   },

   delete: (req, res) => {
      db.Product.destroy({
         where: {
            id: req.params.id,
         },
      }).then((response) => {
         return res.json(response);
      });
   },
};

module.exports = controller;
