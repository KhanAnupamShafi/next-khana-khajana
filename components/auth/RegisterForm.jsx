import { registerUser } from "@/app/actions";

const RegisterForm = () => {
  return (
    <form className='login-form' action={registerUser}>
      <div>
        <label htmlFor='fname'>First Name</label>
        <input type='text' name='firstName' id='fname' />
      </div>

      <div>
        <label htmlFor='lname'>Last Name</label>
        <input type='text' name='lastName' id='lname' />
      </div>
      <div>
        <label htmlFor='email'>Email Address</label>
        <input type='email' name='email' id='email' />
      </div>

      <div>
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' id='password' />
      </div>

      <button
        type='submit'
        className='bg-[#eb4a36] py-3 rounded-md text-white w-full mt-4'>
        Create Account
      </button>
    </form>
  );
};

export default RegisterForm;
