import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot } from "lucide-react";
import { useAppSelector } from "@/redux/hooks/hooks";

const RestaurantInfo = () => {
  const { getRestaurantByIdData } = useAppSelector(
    (state) => state.myRestaurant
  );
  return (
    <Card className="border-sla">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {getRestaurantByIdData?.restaurantName}
        </CardTitle>
        <CardDescription>
          {getRestaurantByIdData?.city}, {getRestaurantByIdData?.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        {getRestaurantByIdData?.cuisines.map((item, index) => (
          <span className="flex">
            <span>{item}</span>
            {index < getRestaurantByIdData?.cuisines.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
};

export default RestaurantInfo;
