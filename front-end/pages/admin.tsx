import MainNavigation from '@components/mainNavigation';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Helper from 'utils/helper';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import AdminService from '@services/adminService';
import AdminUserOverview from '@components/Admin/adminUserOverview';
import AdminPoopByUserIDOverview from '@components/Admin/adminPoopByUserIDOverview';
import styles from '@styles/Admin.module.css';
import useSWR from 'swr';
import { poopItem, userItem } from '@types';

const getUsers = async () => {
    const response = await AdminService.getUsers();
    if (response.ok) {
        return response.json();
    }
};

const getPoops = async (UserID: number) => {
    const response = await AdminService.getPoopsByUserID(UserID);
    if (response.ok) {
        return response.json();
    }
};

const Admin: React.FC = () => {
    const router = useRouter();
    const { t } = useTranslation();

    const [isAdmin, setIsAdmin] = useState(false);
    const [selectedUserID, setSelectedUserID] = useState<number | null>(null);

    const { data: users } = useSWR<userItem[]>('users', getUsers);
    const { data: poops } = useSWR<poopItem[]>(
        selectedUserID ? `poops-${selectedUserID}` : null,
        () => getPoops(selectedUserID!),
        { revalidateOnFocus: false }
    );
    useEffect(() => {
        setIsAdmin(Helper.authorizeAdmin(router));
    }, [router]);

    if (!isAdmin) {
        return null;
    }

    return (
        <>
            <Head>
                <title>{t('title.admin')}</title>
            </Head>
            <MainNavigation />
            <main>
                <div className={styles.tablesContainer}>
                    {users && (
                        <AdminUserOverview
                            users={users!}
                            setSelectedUserID={(UserID: number) => setSelectedUserID(UserID)}
                            selectedUserID={selectedUserID}
                        />
                    )}
                    {poops && selectedUserID && (
                        <AdminPoopByUserIDOverview user={selectedUserID ?? 0} poops={poops!} />
                    )}
                </div>
            </main>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
    };
};

export default Admin;
