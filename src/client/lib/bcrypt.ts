import bcrypt from "bcryptjs";

const encrypt = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const decrypt = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

export { encrypt, decrypt };
