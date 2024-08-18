import React from "react";

const useDecodejwt = () => {
  const decodeJwt = (token) => {
    if (!token) {
      console.error("token not identified");
      return;
    }

    const tokenCode = token.split(".")[1]; //payload code,menggunakan base64. bisa dicek di jwt.io;
    const jwtPayload = JSON.parse(atob(tokenCode)); //mengembalikan payload yang bersifat string, parsing dengan json.parse untuk jadi object js 
    
    return jwtPayload;
  };

  return {decodeJwt};
};

export default useDecodejwt;
