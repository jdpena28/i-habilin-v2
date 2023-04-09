import { UPLOADCARE_SECRET_KEY } from "../constant";

const deleteMedia = (uuid: string | undefined) => {
  const privateKey = UPLOADCARE_SECRET_KEY;
  const publicKey = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY;
  try {
    const url = `https://api.uploadcare.com/files/${uuid}/`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Uploadcare.Simple ${publicKey}:${privateKey}`,
    };
    return fetch(url, {
      method: "DELETE",
      headers,
    });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export { deleteMedia };
