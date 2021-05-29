const express = require("express");
const app = express();
const mysql = require("mysql")

// app.route('/get')
//   .get(function(req, res, next) {
//     connection.query(
//       "SELECT * FROM reports",
//       function(error, results, fields) {
//         if (error) throw error;
//         res.json(results);
//       }
//     );
//   });

app.get('/get/:id_laporan', async (req, res) => {
    const query = "SELECT * FROM reports WHERE id_laporan = ?";
    pool.query(query , [ req.params.id_laporan], (error, results) => {
      if (!results[0]) {
        res.json({status: "Not Found!"});
      } else {
        res.json(results[0]);
      }
  });
});

app.post("/post", async (req, res) => {
  const data = {
    kategori: req.body.kategori,
    sub_kategori: req.body.sub_kategori,
    deskripsi: req.body.deskripsi,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    foto: req.body.foto,
    id_kecamatan: req.body.id_kecamatan
  }
  const query = "INSERT INTO reports (kategori, sub_kategori, deskripsi, latitude, longitude, foto, id_kecamatan) VALUES(?,?,?,?,?,?,?)";
  pool.query(query, Object.values(data), (error) => {
    if(error) {
      res.json({ status: "Failure", reason: error.code });
    } else {
      res.json({ status: "Success", data: data});
    }
  });
});

const pool = mysql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
});

app.use(express.json());
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});

app.get('/status', (req, res) => {
  res.json({ status: "Working!" })
});