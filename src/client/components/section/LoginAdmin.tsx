import InputForm from "@/client/components/form/InputForm";

const LoginAdmin = () => {
  return (
    <section className="container">
      <div className="login">
        <div className="LoginForm">
          <h2>I-Habilin</h2>
          <h3 className="">Hey, hello</h3>

          <p>We will never share your password with anyone else</p>
          <form className="max-w-lg space-y-3">
            <InputForm id="email" type="text" labelText="Email" name="email" />
            <InputForm
              id="email"
              type="text"
              labelText="Email with Icon"
              name="email"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4">
                  <path
                    fillRule="evenodd"
                    d="M5.404 14.596A6.5 6.5 0 1116.5 10a1.25 1.25 0 01-2.5 0 4 4 0 10-.571 2.06A2.75 2.75 0 0018 10a8 8 0 10-2.343 5.657.75.75 0 00-1.06-1.06 6.5 6.5 0 01-9.193 0zM10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            />
            <InputForm
              id="email"
              type="text"
              labelText="Helper Text"
              name="email"
              helperText="With Helper Text"
            />
          </form>

          <a href="google.com" className="underline underline-offset-4">
            Forgot Password
          </a>
          <button type="button" className="mt-5 bg-primary">
            Login
          </button>
        </div>
      </div>
    </section>
  );
};

export default LoginAdmin;
