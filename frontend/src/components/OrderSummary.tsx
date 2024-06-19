import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";
import { CartItem } from "@/types/cartTypes/cartTypes";
import { useAppSelector } from "@/redux/hooks/hooks";

type Props = {
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
};

const OrderSummary = ({ cartItems, removeFromCart }: Props) => {
  const { getRestaurantByIdData } = useAppSelector(
    (state) => state.myRestaurant
  );

  const getTotalCost = () => {
    const totalInPence = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    const deliveryPrice = getRestaurantByIdData?.deliveryPrice ?? 0;
    const totalWithDelivery = totalInPence + deliveryPrice;

    return totalWithDelivery;
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-center">
          <span>Your Order</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item) => (
          <div className="flex justify-between">
            <span>
              <Badge variant="outline" className="mr-2">
                {item.quantity}
              </Badge>
              {item.name}
            </span>
            <span className="flex items-center gap-1">
              <Trash
                className="cursor-pointer"
                color="red"
                size={20}
                onClick={() => removeFromCart(item)}
              />
              ₹{item.price * item.quantity}
            </span>
          </div>
        ))}
        <Separator />
        {cartItems?.length > 0 && (
          <>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>₹{getRestaurantByIdData?.deliveryPrice}</span>
            </div>
            <Separator />
            <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
              <span>Total:</span>
              <span>₹{getTotalCost()}</span>
            </CardTitle>
          </>
        )}
      </CardContent>
    </>
  );
};

export default OrderSummary;
