import jwt from 'jsonwebtoken'

export const secret_admin = "q2qwsaxasdas9dwq9duijc9z"

export const verifyToken = (req : any, res : any, next : any) => {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      // req.token = bearerToken;
      // Next middleware
      jwt.verify(bearerToken, secret_admin, (err: any, decode: any) => {
        if(err) res.sendStatus(403);
        else if(decode){
          const { payload } = decode
          if(payload.role === 0) next();
        }else res.sendStatus(403);
      })
    } else {
      // Forbidden
      res.sendStatus(403);
    }
}


