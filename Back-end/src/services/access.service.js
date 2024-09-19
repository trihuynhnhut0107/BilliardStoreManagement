"use strict";

const bcrypt = require("bcrypt");
const crypto = require("crypto");

const RoleUser = {
  ADMIN: "admin",
  STAFF: "staff",
  USER: "user",
};

class AccessService {
  static login = async ({ email, password, refreshToken = null }) => {
    const foundUser = await findByEmail({ email });
    if (!foundUser) {
      throw new Error("User not found");
    }
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      throw new Error("Invalid password");
    }
    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");

    const { _id: userID } = foundUser;
    const tokens = await createTokenPair(
      {
        userID,
        email,
      },
      publicKey,
      privateKey
    );
    await KeyTokenService.createKeyToken({
      refreshToken: tokens.refreshToken,
      privateKey,
      publicKey,
      userID,
    });
    return {
      user: getInfoData({
        fields: ["_id", "name", "email"],
        object: foundUser,
      }),
      tokens,
    };
  };
}
