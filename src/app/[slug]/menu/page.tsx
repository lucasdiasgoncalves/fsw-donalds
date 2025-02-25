// import {ChevronLeftIcon} from "lucide-react";
// import {ScrollTextIcon} from "lucide-react";
// import Image from "next/image";

// import {Button} from "@/components/ui/button"
import { db } from "@/lib/prisma";

import RestaurantHeader from "./components/header";

interface RestaurantMenuPageProps {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ consumptionMethod: string}>
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
    return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
}

const RestaurantMenuPage = async ({params, searchParams}: RestaurantMenuPageProps) => {
     
    const { slug } = await params;
    const { consumptionMethod } = await searchParams;
    if (!isConsumptionMethodValid(consumptionMethod)){
        return notFound();
    }
    const restaurant = await db.restaurant.findUnique({where: {slug} })
    return  (
        <div>
            <RestaurantHeader restaurant={restaurant}/>
        </div>
    ) ;
}
 
export default RestaurantMenuPage;