import express from 'express'
import { Prisma } from '@prisma/client'
import { authorize } from '../controller/auth_controller.js'
import { IsAdmin, IsMember } from '../middleware/role_validation.js'
import {
    getAllBarang,
    getBarangById,
    addBarang,
    updateBarang,
    deleteBarang
} from '../controller/Inventori_Controller.js'

const app = express()

app.get('/',authorize,  getAllBarang)
app.get('/:id',authorize, getBarangById)
app.post('/', authorize, [IsAdmin] , addBarang)
app.put('/:id', authorize, [IsAdmin], updateBarang)
app.delete('/:id', authorize, [IsAdmin], deleteBarang)

export default app