import Button from '../components/Button';
import Input from '../components/Input';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className=" p-3 flex flex-col justify-center items-center w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%]">
        <h2 className="text-center text-white text-4xl font-semibold p-4">
          Register
        </h2>

        <div className="flex flex-col">
          <Input placeholder={'Name'} type={'text'} />
          <Input placeholder={'Username'} type={'text'} />
          <Input placeholder={'Email'} type={'text'} />
          <Input placeholder={'Password'} type={'password'} />
        </div>
        <div className="flex flex-col">
          <Button
            label={'Register'}
            type={'button'}
            variant={'primary'}
            disabled={false}
            onClick={() => console.log('Clicked')}
          />
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300" />
            <span className="mx-2 text-gray-400">OR</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>
          <Link to={'/Login'}>
            <Button
              label={'Login'}
              type={'button'}
              variant={'secondary'}
              disabled={false}
              onClick={() => console.log('Clicked')}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
