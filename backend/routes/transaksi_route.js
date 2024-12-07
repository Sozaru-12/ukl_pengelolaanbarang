import express from 'express'
import {
   getAllPeminjaman,
   getPeminjamanById,
   addPeminjaman,
   pengembalianBarang,
   usageReport,
   
} from '../controller/transaksi_controller.js'

import {authorize} from '../controller/auth_controller.js'
import {IsMember, IsAdmin} from '../middleware/role_validation.js'

const app = express()

    
app.get('/borrow', authorize, [IsMember, IsAdmin], getAllPeminjaman)
app.get('/borrow/:id', authorize, [IsMember, IsAdmin], getPeminjamanById)
app.post('/borrow', authorize, [IsMember], addPeminjaman)
app.post('/return', authorize, [IsMember], pengembalianBarang)
app.post('/usage-report', usageReport)



export default app