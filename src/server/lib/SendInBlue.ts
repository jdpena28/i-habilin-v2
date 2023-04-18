import * as SibApiV3Sdk from "@sendinblue/client";

const sendEmail = new SibApiV3Sdk.TransactionalEmailsApi();

const API_KEY = process.env.SENDINBLUE_API_KEY
  ? process.env.SENDINBLUE_API_KEY
  : "";

sendEmail.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, API_KEY);

export { sendEmail };
