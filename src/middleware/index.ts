import { NextFunction, Response } from "express";
import { decryptString, verifyJwtToken } from "../utils";

export const authenticateUser = async (req: any, res: Response, next: NextFunction) => {
    try {
        console.log("\nnode-server > middleware > authenticateUser")
        const authorization = req.headers["authorization"];
        if (!authorization) {
            return res.status(401).send("You are not authenticated, please login to continue");
        }

        console.log("\nnode-server > middleware > authenticateUser > pass authentication")
    
        const accessToken = authorization.split("Bearer ")[1];
    
        if (!accessToken) {
            return res.status(401).send("Can not get accessToken");
        }

        console.log("\nnode-server > middleware > authenticateUser > get accessToken")
    
        const result = await verifyJwtToken(accessToken);

        console.log("\nnode-server > middleware > authenticateUser > verified Jwt Token")
    
        if (result.isError) {
            console.log("\nnode-server > middleware > authenticateUser > verifyJwtToken error")
            return res.status(403).send("verifyJwtToken not success");
        }
    
        console.log("\nnode-server > middleware > authenticateUser > trying to decrypt...")
    
        const decrypted = decryptString(result?.data?.user);
    
        if (!decrypted) {
            return res.status(401).send("decryptString not success!");
        }
        req.user = decrypted
        console.log("\nnode-server > middleware > authenticateUser > decrypted successfully, about to return next()")
        return next()
    } catch (error) {
        console.log("node-server > middleware > authenticateUser error:", error)
        return res.status(500).send("Sorry, something went wrong. Please try again later")
    }
}