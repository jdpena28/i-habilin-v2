import EmailSent1 from "../../public/email-sent 1";

const Notification = () => {
  return (
    <section className="container mx-auto min-h-screen">
      <div className="mx-auto flex h-screen flex-col items-center justify-center">
        <EmailSent1 />
      </div>
      <div className="mt-5 flex flex-col justify-center text-center">
        <h4 className="mb-5">Thank You!</h4>
        <p>
          {" "}
          Your application for the I-Habilin System has been submitted. Once
          your application has been reviewed, you will receive an email
          notification regarding the status of your application. Please allow up
          to 3 business days for our team to process your application.
        </p>
        <p className="mt-5">
          If you have any questions or concerns, please do not hesitate to
          contact us at help@ihabilin.com
        </p>
      </div>
      <div className="mx-auto flex flex-col items-center justify-center ">
        <button type="button" className="mt-5 bg-primary">
          <svg
            className="fill-white"
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M20.1249 11.4999C20.1249 11.6906 20.0492 11.8734 19.9144 12.0082C19.7796 12.143 19.5968 12.2187 19.4061 12.2187H5.32763L10.5745 17.4566C10.7095 17.5929 10.7852 17.7769 10.7852 17.9687C10.7852 18.1605 10.7095 18.3445 10.5745 18.4808C10.4371 18.6136 10.2535 18.6879 10.0624 18.6879C9.87129 18.6879 9.68767 18.6136 9.55028 18.4808L3.08153 12.0121C2.94657 11.8758 2.87085 11.6917 2.87085 11.4999C2.87085 11.3081 2.94657 11.1241 3.08153 10.9878L9.55028 4.51908C9.68993 4.40447 9.86722 4.3459 10.0477 4.35476C10.2281 4.36362 10.3988 4.43928 10.5266 4.56703C10.6543 4.69478 10.73 4.86547 10.7388 5.04592C10.7477 5.22636 10.6891 5.40365 10.5745 5.5433L5.32763 10.7812H19.4061C19.5968 10.7812 19.7796 10.8569 19.9144 10.9917C20.0492 11.1265 20.1249 11.3093 20.1249 11.4999Z" />
          </svg>
          Go back to home
        </button>
      </div>
    </section>
  );
};

export default Notification;
