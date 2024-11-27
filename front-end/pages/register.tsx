import Head from 'next/head';
import Link from 'next/link';
import styles from '@styles/Register.module.css';
import { FormEvent, useState } from 'react';
import AuthService from '@services/authService';
import { useRouter } from 'next/router';
import Helper from 'utils/helper';
import RegisterForm from '@components/registerForm';

const Register: React.FC = () => {
    

    

    return (
        <>
            <Head>
                <title>Register</title>
            </Head>
            <main>
                <RegisterForm />
            </main>
        </>
    );
};

export default Register;
