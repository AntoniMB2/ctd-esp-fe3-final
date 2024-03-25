import { createHash } from "crypto";

const getMD5Hash = (str: string): string => {
    return createHash('md5').update(str).digest('hex');
}

export const generateAuthenticationString = () => {
    const ts = new Date().getTime();
    const hash = getMD5Hash(`${ts}${process.env.MARVEL_API_PRIVATE_KEY}${process.env.MARVEL_API_PUBLIC_KEY}`)
    return `ts=${ts}&apikey=${process.env.MARVEL_API_PUBLIC_KEY}&hash=${hash}`
}
