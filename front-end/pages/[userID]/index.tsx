import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LecturerById: React.FC = () => {
    const router = useRouter();
    const { userID } = router.query;

    return (
        <>
            {userID && <p>homepage <br />userID: {userID}</p>}
        </>
    );
};

export default LecturerById;
