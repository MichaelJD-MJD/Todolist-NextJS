import jwt from "jsonwebtoken";

export default function generateToken(userId: string) {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
}

export  function verifyToken(token : string){
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.log(error);
    throw new Error("Invalid or expired token");
  }
}

export function verifyJwt(token: string): boolean {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return !!decoded;
  } catch (error) {
    console.log(error);
    return false;
  }
}
