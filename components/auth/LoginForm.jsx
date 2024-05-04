"use client";
import { loginUser } from "@/app/actions";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const LoginForm = () => {
  const { setAuth } = useAuth();
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const found = await loginUser(formData);
      if (found) {
        setAuth(found);
        router.push("/");
      } else {
        toast.error("Incorrect email or password entered");
      }
    } catch (err) {
      toast.error(err.message);
    }
  }
  return (
    <form className='login-form' onSubmit={onSubmit}>
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
        Login
      </button>
    </form>
  );
};

export default LoginForm;
