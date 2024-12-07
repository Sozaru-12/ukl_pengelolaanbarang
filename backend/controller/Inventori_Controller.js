import {PrismaClient} from "@prisma/client"
import md5 from "md5"
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const getAllBarang = async (req, res) => {
    try {
        const result = await prisma.inventori.findMany();
        res.json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.log(error);
        res.json({
            msg: error,
        })
    }
};

export const getBarangById = async (req, res) => {
    try {
        const result = await prisma.inventori.findUnique({
            where: {
                id_barang: Number(req.params.id)
            },
        })
        if (result) {
            res.status(200).json({
                success: true,
                data: result,
            })
        } else {
            res.status(400).json({
                success: false,
                message: "Tidak Ditemukan"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error,
        })
    }
};

export const addBarang = async (req, res) => {
    try {
        const { nama_barang, category, location, quantity } = req.body;

        // Validasi apakah barang sudah ada
        const itemCheck = await prisma.inventori.findFirst({
            where: {
                nama_barang: nama_barang, // Perbaiki penamaan variabel
            },
        });

        if (itemCheck) {
            return res.status(400).json({
                success: false,
                msg: "Barang sudah tersedia",
            });
        }

        // Tambah barang baru
        const result = await prisma.inventori.create({
            data: {
                nama_barang: nama_barang, // Harus sesuai dengan schema.prisma
                category: category,       // Pastikan schema menggunakan "kategori"
                location: location,           // Pastikan schema menggunakan "lokasi"
                quantity: quantity,     // Pastikan schema menggunakan "kuantitas"
            },
        });

        res.status(201).json({
            success: true,
            message: "Barang berhasil ditambah",
            data: result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Terjadi kesalahan server",
            error: error.message,
        });
    }
  
};


export const updateBarang = async (req, res) => {
    try {
      const { nama_barang, category, location, quantity } = req.body;
  
      const dataCheck = await prisma.inventori.findUnique({
        where: {
          id_barang: Number(req.params.id),
        },
      });
      if (!dataCheck) {
        res.status(401).json({
          msg: "data tidak ditemukan",
        });
      } else {
        const result = await prisma.inventori.update({
          where: {
            id_barang: Number(req.params.id),
          },
          data: {
            nama_barang: nama_barang,
            kategori: category,
            lokasi: location,
            kuantitas: quantity,
          },
        });
        res.json({
          success: true,
          message: "Barang berhasil diubah",
          data: result,
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        msg: error,
      });
    }
  };
  export const deleteBarang = async (req, res) => {
    try {
      const dataCheck = await prisma.inventori.findUnique({
        where: {
          id_barang: Number(req.params.id),
        },
      });
      if (!dataCheck) {
        res.status(401).json({
          msg: "data tidak ditemukan",
        });
      } else {
        const result = await prisma.inventori.delete({
          where: {
            id_barang: Number(req.params.id),
          },
        });
        res.json({
          success: true,
          message: "Data Barang berhasil dihapus",
          data: result,
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        msg: error,
      });
    }
  };

  