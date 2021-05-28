require('dotenv').config()

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database');
const { createPool } = require('mysql');
const { json } = require('body-parser');

//Get data using id
app.get("/:id", async (req, res) => {
  const query = "SELECT * FROM reports WHERE id_laporan = ?";
  pool.query(query, [ req.params.id ], (error, results) => {
    if (!results[0]) {
      res.json({ status: "Not Found"})
    } else {
      res.json(results[0]);
    }
  }); 
});

app.get("/", async (req, res) => {
  res.json({ status: "Connected to server!"});
});

const pool = mysql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
});


//Post data report
// app.route('/postdata')
//   .post(function(req, res, next) {
//     var kategori = req.body.kategori;
//     var sub_kategori = req.body.sub_kategori;
//     var deskripsi = req.body.deskripsi;
//     var latitude = req.body.latitude;
//     var longitude = req.body.longitude;
//     var foto = req.body.foto;
//     var id_kecamatan = req.body.id_kecamatan;

//     connection.query('INSERT INTO report (kategori, sub_kategori, deskripsi, latitude, longitude, foto, id_kecamatan) VALUES(?,?,?,?,?,?,?)',
//         [kategori, sub_kategori, deskripsi, latitude, longitude, foto, id_kecamatan],
//         function(error, rows, fields){
//             if(error){
//                 console.log(error);
//             }else {
//                 response.ok("Data berhasil ditambahkan", res)
//             }
//         });
//   });

// app.post("/post", async (req, res) => {
//   const data = {
//     kategori = req.body.kategori,
//     sub_kategori = req.body.sub_kategori,
//     deskripsi = req.body.deskripsi,
//     latitude = req.body.latitude,
//     longitude = req.body.longitude,
//     foto = req.body.foto,
//     id_kecamatan = req.body.id_kecamatan;
//   }
// })

app.use(express,json());
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Connected Now!');
});