const Procedure = ({ step, desc }) => {
  return (
    <div className='step'>
      <h3>Step {step + 1}</h3>
      <p>{desc}</p>
    </div>
  );
};

export default Procedure;
