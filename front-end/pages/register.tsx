import Head from 'next/head';
import RegisterForm from '@components/registerForm';

const Register: React.FC = () => {
    

    

    return (
        <>
            <Head>
                <title>Poopedia | Register</title>
            </Head>
            <main>
                <RegisterForm />
            </main>
        </>
    );
};

export default Register;
