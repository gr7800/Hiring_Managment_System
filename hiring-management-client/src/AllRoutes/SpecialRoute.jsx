import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

const SpecialRoute = ({ children }) => {
    const { user, token, auth, loading } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    if (loading) {
        return <div>Loading...</div>
    }

    if (!token) {
        navigate("/login")
    }
    if (!user) {
        dispatch(fetchUserProfile());
    }

    if (user && (user.role !== "HR" && user.role !== "Manager")) {
        toast.warning("You dont have access to this page!");
        navigate("/login")
    }

    return children
}

export default SpecialRoute
