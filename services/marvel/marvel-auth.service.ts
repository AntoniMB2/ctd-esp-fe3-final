import { createHash } from "crypto";
const MARVEL_API_PUBLIC_KEY="6d7b4337d7861926c4505ba6cb5b85d6"
const MARVEL_API_PRIVATE_KEY="122c19c0bffcf013417bffad7d4945dfc89a6942"

const getMD5Hash = (str: string): string => {
    return createHash('md5').update(str).digest('hex');
}

export const generateAuthenticationString = () => {
    const ts = new Date().getTime();
    const hash = getMD5Hash(`${ts}${MARVEL_API_PRIVATE_KEY}${MARVEL_API_PUBLIC_KEY}`)
    return `ts=${ts}&apikey=${MARVEL_API_PUBLIC_KEY}&hash=${hash}`
}
