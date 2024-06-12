import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import { getMyRestaurantRequest } from "@/redux/features/myRestaurantSlice";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const ManageRestaurantPage = () => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();

  const getMyRestaurantDetails = async () => {
    const token = await getAccessTokenSilently();

    const payload = {
      token,
    };
    dispatch(getMyRestaurantRequest(payload));
  };

  useEffect(() => {
    getMyRestaurantDetails()
  }, [])

  return (
    <>
      <ManageRestaurantForm />
    </>
  );
};

export default ManageRestaurantPage;
