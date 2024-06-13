import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { createNewRestaurantAction } from "@/redux/features/myRestaurantSlice";
import { useEffect } from "react";
import { toast } from 'react-toastify';

const formSchema = z
  .object({
    restaurantName: z.string({
      required_error: "restuarant name is required",
    }),
    city: z.string({
      required_error: "city is required",
    }),
    country: z.string({
      required_error: "country is required",
    }),
    deliveryPrice: z.coerce.number({
      required_error: "delivery price is required",
      invalid_type_error: "must be a valid number",
    }),
    estimatedDeliveryTime: z.coerce.number({
      required_error: "estimated delivery time is required",
      invalid_type_error: "must be a valid number",
    }),
    cuisines: z.array(z.string()).nonempty({
      message: "please select at least one item",
    }),
    menuItems: z.array(
      z.object({
        name: z.string().min(1, "name is required"),
        price: z.coerce.number().min(1, "price is required"),
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "image is required" }).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
  });

type RestaurantFormData = z.infer<typeof formSchema>;

const ManageRestaurantForm = () => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();

  const {
    createNewRestaurantIsLoading,
    getMyRestaurantData,
    getMyRestaurantIsLoading,
    getMyRestaurantIsError,
    getMyRestaurantError,
    getMyRestaurantIsSuccess,
  } = useAppSelector((state) => state.myRestaurant);

  useEffect(() => {
  if(getMyRestaurantIsError){
    if(getMyRestaurantError === "restaurant not found"){
      toast("Create New Restaurant", { autoClose: 2000, type: 'info' })
    } else{
      toast(getMyRestaurantError, { autoClose: 2000, type: 'error' })
    }
  }
  },[getMyRestaurantIsError])

  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  useEffect(() => {
    if (!getMyRestaurantData) {
      return;
    }

    form.reset(getMyRestaurantData);
  }, [form, getMyRestaurantData, getMyRestaurantIsSuccess]);

  const createNewRestaurant = async (formData: FormData) => {
    const token = await getAccessTokenSilently();

    const payload = {
      token,
      formData,
    };
    dispatch(createNewRestaurantAction(payload));
  };

  const onSubmit = (formDataJson: RestaurantFormData) => {
    const formData = new FormData();

    formData.append("restaurantName", formDataJson.restaurantName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);

    formData.append("deliveryPrice", formDataJson.deliveryPrice.toString());
    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString()
    );
    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });
    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price).toString()
      );
    });

    if (formDataJson.imageFile) {
      formData.append(`imageFile`, formDataJson.imageFile);
    }

    createNewRestaurant(formData);
  };

  return (
    <>
      {getMyRestaurantIsLoading && (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4 text-orange-500">
            Getting your Restaurant Details
          </h1>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 bg-gray-50 p-10 rounded-lg"
        >
          <DetailsSection />
          <Separator />
          <CuisinesSection />
          <Separator />
          <MenuSection />
          <Separator />
          <ImageSection />
          {createNewRestaurantIsLoading || getMyRestaurantIsLoading ? (
            <LoadingButton />
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </form>
      </Form>
    </>
  );
};

export default ManageRestaurantForm;
