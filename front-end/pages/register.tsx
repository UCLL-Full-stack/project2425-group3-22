import Head from 'next/head';
import RegisterForm from '@components/registerForm';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const Register: React.FC = () => {
    const { t } = useTranslation(); 

    return (
        <>
            <Head>
                <title>{t("title.register")}</title>
            </Head>
            <main>
                <RegisterForm />
            </main>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
};

export default Register;
