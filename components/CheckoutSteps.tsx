const CheckoutSteps = ({ current = 0 }) => {
  return (
    <ul className='steps steps-verticle lg:steps-horizontal w-full mt-4'>
      {["User Login", "Shipping Address", "Payment Method", "Place order"].map(
        (step, index) => (
          <li
            key={step}
            className={`step ${index <= current ? "step-primary" : ""}`}
          >
            {step}
          </li>
        )
      )}
    </ul>
  );
};

export default CheckoutSteps;
