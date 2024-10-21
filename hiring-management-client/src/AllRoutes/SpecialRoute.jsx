import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchUserProfile } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import LoadingScreen from "../component/LoadingScreen";

const SpecialRoute = ({ children }) => {
    const { user, token, loading } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!token) {
            toast.warning("Please log in first");
            navigate("/login");
            return;
        }
        if (token && !user) {
            dispatch(fetchUserProfile());
        }
        if (user && user.role !== "HR" && user.role !== "Manager") {
            toast.warning("You don't have access to this page!");
            navigate("/login");
        }
    }, [token, user, navigate, dispatch]);

    if (loading) {
        return <LoadingScreen />;
    }

    return user && (user.role === "HR" || user.role === "Manager") ? children : null;
};

export default SpecialRoute;
