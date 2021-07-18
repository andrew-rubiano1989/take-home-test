import express from "express";
import { Request, Response } from "express-serve-static-core";
import multer from 'multer';
import fs from 'fs';
import { resolve } from "path";

const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function(req, file, cb){
       cb(null, file.originalname.toLowerCase().replace(/\s/g, '_'));
    }
 });
 
 const upload = multer({
    storage: storage,
    limits:{fileSize: 100000000},
 }).single("image");

export const setupImageRoutes = (app: express.Express) => {
    app.get('/images', async (req: Request, res: Response) => {
        let searchTerm = req.query.search;

        fs.readdir(resolve(__dirname, '../../public/uploads'), (err, files) => {
            if(!searchTerm || !searchTerm.length) {
                const relevantFileNames = files.map((fileName: string) => `/images/${fileName}`);
                res.status(200).send({images: relevantFileNames})
            }
            else {
                searchTerm = searchTerm.toLowerCase();
                const relevantFileNames = files.filter(file => file.indexOf(searchTerm) > -1).map((fileName: string) => `/images/${fileName}`);
                res.status(200).send({images: relevantFileNames})
            }
        });
    });

    app.post('/image', upload, (req: Request, res: Response) => {
        // console.log("Request ---", req.body);
        // console.log("Request file ---", req.file);
        return res.send(200).end();
    });

    app.delete('/image/:fileName', (req: Request, res: Response) => {
        let fileName = req.params.fileName;

        if(!fileName) {
            res.sendStatus(400)
        }

        try {
            fs.unlinkSync(resolve(__dirname, `../../public/uploads/${fileName}`))
            res.sendStatus(200)
        } catch(err) {
            res.sendStatus(404)
        }
    })
}