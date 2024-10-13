import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

const PrivateRoute = ({ children }) => {
    const { user, token, auth, loading } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!token) {
            toast.warning("Please log in first");
            navigate("/login");
        }
        if (token && !user) {
            dispatch(fetchUserProfile());
        }
    }, [token, user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return user ? children : null;
};

export default PrivateRoute;
