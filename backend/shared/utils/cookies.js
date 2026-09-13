const isProduction = process.env.NODE_ENV === "production";

const defaultOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  path: "/",
};

export default function setCookies({ res, name, token, maxAge } = {}) {
  if (res === undefined) {
    throw new Error("Response object is required to set cookies");
  }
  if (name === undefined) throw new Error("name is required to set cookies.");
    if (token === undefined)
      throw new Error("jwt token is required to set cookies");

  return res.cookie(name, token, {
    ...defaultOptions,
    ...(maxAge !== undefined ? { maxAge } : {}),
  });
}
