import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import { getMyRestaurantRequest, resetCreateNewRestaurant } from "@/redux/features/myRestaurantSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { toast } from 'react-toastify';

const ManageRestaurantPage = () => {
  const { createNewRestaurantIsSuccess } = useAppSelector(
    (state) => state.myRestaurant
  );

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
    toast('Restaurant Created Successfully!', { autoClose: 2000, type: 'success' })
    getMyRestaurantDetails();
    dispatch(resetCreateNewRestaurant())
  }, [createNewRestaurantIsSuccess]);

  return (
    <>
      <ManageRestaurantForm />
    </>
  );
};

export default ManageRestaurantPage;
