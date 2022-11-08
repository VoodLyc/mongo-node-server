import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';;

const verifyToken = (req: Request, res: Response, next: NextFunction)  => {
    let token: string = req.headers.authorization || ''

    if (!token) {
        res.status(403).send("Forbidden")
    }

    try {
        // token = token.split('.')[1]
        const tokenSecret = process.env.TOKEN_SECRET || ""
        const decoded = jwt.verify(token, tokenSecret )
        res.locals.user = decoded
        next()
    }catch(e: any){
        return res.status(403).send("Invalid Token");
    }
}

export default verifyToken;