import * as joseJwt from "jose";
import CryptoJS from "crypto-js";

export const verifyJwtToken = async(token: string) => {
    try {
        console.log("\nnode-server > utils > verifyJwtToken")
        const privateKey = process.env.ACCESS_TOKEN_PRIVATE_KEY
        const result = await joseJwt.jwtVerify(token, new TextEncoder().encode(privateKey))
        return {data: result.payload, isError: false, message: "Success" }
    } catch (error) {
        console.log("\nnode-server > utils > verifyJwtToken error")
        return { data: null, isError: true, message: error instanceof Error ? error.message : "An unknown error occurred" }
    }
}


export const decryptString = (hexString: any) => {
    console.log("node-server > utils > decryptString")
    const secretKey = CryptoJS.enc.Utf8.parse(process.env.CRYPTO_ENCRYPTION_KEY ?? "Crypto encryption key not found")
    const iv = CryptoJS.enc.Utf8.parse(process.env.CRYPTO_IV_KEY ?? "Crypto iv key not found")

    try {
        const ciphertext = CryptoJS.enc.Hex.parse(hexString)
        const decrypted = CryptoJS.AES.decrypt({ciphertext} as any, secretKey, {iv}).toString(CryptoJS.enc.Utf8)

        console.log("utils > decryptString > decrypted:", decrypted)

        return JSON.parse(decrypted)

    } catch (error) {
        console.log("utils > decryptString error:", error);
        return null;
    }
}