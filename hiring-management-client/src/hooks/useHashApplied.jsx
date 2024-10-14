import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useHasApplied = (jobId) => {
    const [hasApplied, setHasApplied] = useState(false);
    const { applications } = useSelector((state) => state.auth.user || {});
    useEffect(() => {
        const temp = applications?.some((application) => {
            return application?.job?._id === jobId;
        });
        setHasApplied(temp);
    }, [applications, jobId])

    return hasApplied || false;
};

export default useHasApplied;
