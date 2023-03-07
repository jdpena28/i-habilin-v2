import InputForm from "@/client/components/form/InputForm";

const DesignSystem = () => {
  return (
    <div className="min-h-screen w-full bg-tertiary">
      <div className="container mx-auto space-y-3">
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero modi
          quia maiores aliquam, minima saepe! Sit, eius, ratione dolorum modi
          debitis quia ullam nam ea laboriosam totam velit, sequi reiciendis non
          officia.
        </p>
        <hr />
        <div className="flex justify-center gap-x-3">
          <button type="button" className="bg-primary">
            <svg
              className="fill-white"
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M20.1249 11.4999C20.1249 11.6906 20.0492 11.8734 19.9144 12.0082C19.7796 12.143 19.5968 12.2187 19.4061 12.2187H5.32763L10.5745 17.4566C10.7095 17.5929 10.7852 17.7769 10.7852 17.9687C10.7852 18.1605 10.7095 18.3445 10.5745 18.4808C10.4371 18.6136 10.2535 18.6879 10.0624 18.6879C9.87129 18.6879 9.68767 18.6136 9.55028 18.4808L3.08153 12.0121C2.94657 11.8758 2.87085 11.6917 2.87085 11.4999C2.87085 11.3081 2.94657 11.1241 3.08153 10.9878L9.55028 4.51908C9.68993 4.40447 9.86722 4.3459 10.0477 4.35476C10.2281 4.36362 10.3988 4.43928 10.5266 4.56703C10.6543 4.69478 10.73 4.86547 10.7388 5.04592C10.7477 5.22636 10.6891 5.40365 10.5745 5.5433L5.32763 10.7812H19.4061C19.5968 10.7812 19.7796 10.8569 19.9144 10.9917C20.0492 11.1265 20.1249 11.3093 20.1249 11.4999Z" />
            </svg>
            Button with Icon
          </button>
          <button type="button" className="bg-primary">
            Button
          </button>
        </div>
        {/* Decorated Underline */}
        <div className="decorated-underline">
          <h3>Decorated Underline</h3>
          <div />
        </div>
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
      </div>
    </div>
  );
};

export default DesignSystem;
