import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { getRestaurantByIdAction } from "@/redux/features/myRestaurantSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { CartItem } from "@/types/cartTypes/cartTypes";
import { MenuItemType } from "@/types/restaurantTypes/restaurantTypes";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

const DetailPage = () => {
  const { restaurantId } = useParams();
  const dispatch = useAppDispatch();
  const {
    getRestaurantByIdData,
    getRestaurantByIdIsLoading,
    getRestaurantByIdIsError,
    getRestaurantByIdError,
    getRestaurantByIdIsSuccess,
  } = useAppSelector((state) => state.myRestaurant);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      );

      let updatedCartItems;

      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => cartItem._id !== item._id
      );

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const onCheckout = async (userFormData: UserFormData) => {
    if (!getRestaurantByIdData) {
      return;
    }

    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      restaurantId: getRestaurantByIdData?._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string,
      },
    };

    // const data = await createCheckoutSession(checkoutData);
    // window.location.href = data.url;
  };

  useEffect(() => {
    const payload = {
      id: restaurantId as string,
    };
    if (restaurantId) {
      dispatch(getRestaurantByIdAction(payload));
    }
  }, [restaurantId, dispatch]);

  return (
    <div>
      {getRestaurantByIdIsLoading ? (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4 text-orange-500">
            Loading...
          </h1>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      ) : getRestaurantByIdIsError ? (
        <div className="text-red-500 font-bold">{getRestaurantByIdError}</div>
      ) : getRestaurantByIdIsSuccess ? (
        <>
          <div className="flex flex-col gap-10">
            <AspectRatio ratio={16 / 5}>
              <img
                src={getRestaurantByIdData?.imageUrl}
                className="rounded-md object-cover h-full w-full"
              />
            </AspectRatio>
            <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
              <div className="flex flex-col gap-4">
                <RestaurantInfo />
                <span className="text-2xl font-bold tracking-tight">Menu</span>
                {getRestaurantByIdData?.menuItems.map((menuItem) => (
                  <MenuItem
                    menuItem={menuItem}
                    addToCart={() => addToCart(menuItem)}
                  />
                ))}
              </div>
              <div>
                <Card>
                  <OrderSummary
                    cartItems={cartItems}
                    removeFromCart={removeFromCart}
                  />
                  <CardFooter>
                    {/* <CheckoutButton
                disabled={cartItems.length === 0}
                onCheckout={onCheckout}
                isLoading={isCheckoutLoading}
              /> */}
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default DetailPage;
