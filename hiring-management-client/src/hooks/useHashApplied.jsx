import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";

const useHasApplied = (jobId) => {
    const [hasApplied, setHasApplied] = useState(false);
    const applications = useSelector((state) => state?.auth?.user?.applications || []);

    const checkIfApplied = useCallback(() => {
        const applied = applications.some(
            (application) => application?.job?._id === jobId
        );
        setHasApplied(applied);
    }, [applications, jobId]);

    useEffect(() => {
        if (jobId && applications.length) {
            checkIfApplied();
        }
    }, [checkIfApplied, jobId]);

    return hasApplied;
};

export default useHasApplied;
