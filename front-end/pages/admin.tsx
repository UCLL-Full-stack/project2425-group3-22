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

const Profile: React.FC = () => {
    const router = useRouter();
    const { t } = useTranslation();

    const [isAdmin, setIsAdmin] = useState(false);
    const [users, setUsers] = useState([]);
    const [poops, setPoops] = useState([]);
    const [selectedUserID, setSelectedUserID] = useState<number | null>(null);

    useEffect(() => {
        setIsAdmin(Helper.authorizeAdmin(router));
    }, [router]);

    useEffect(() => {
        if (isAdmin) {
            const fetchUserData = async () => {
                const response = await AdminService.getUsers();

                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }

                const result = await response.json();
                setUsers(result);
            };

            fetchUserData();
        }
    }, [isAdmin]);

    useEffect(() => {
        if (isAdmin && selectedUserID) {
            const fetchUserPoops = async () => {
                const response = await AdminService.getPoopsByUserID(selectedUserID);

                if (!response.ok) {
                    throw new Error("Failed to fetch user's poops");
                }

                const result = await response.json();
                setPoops(result);
                console.log(result);
            };

            fetchUserPoops();
        }
    }, [isAdmin, selectedUserID]);

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
                    <AdminUserOverview
                        users={users}
                        setSelectedUserID={(UserID: number) => setSelectedUserID(UserID)}
                        selectedUserID={selectedUserID}
                    />
                    {selectedUserID && (
                        <AdminPoopByUserIDOverview user={selectedUserID ?? 0} poops={poops} />
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

export default Profile;
