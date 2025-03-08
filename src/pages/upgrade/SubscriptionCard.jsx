import { Button } from "@/components/ui/button";
import { createPayment } from "@/redux/payment/Action";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import React from "react";
import { useDispatch } from "react-redux";

const SubscriptionCard = ({ data }) => {
  const dispatch = useDispatch();
  const handleUpgrade = () => {
    dispatch(
      createPayment({
        planType: data.planType,
        jwt: localStorage.getItem("jwt"),
      })
    );
  };
  return (
    <div className="rounded-xl bg-[#1b1b1b] text-gray-100 bg-opacity-20 shadow-[#14173b] shadow-2xl card p-5 space-y-5 w-[18rem] font-semibold">
      <p>{data.planName}</p>
      <p className="text-xl font-semibold">
        <span>₹{data.price}/</span>
        <span>{data.planType}</span>
      </p>
      {data.planType == "ANNUALLY" && <p className="text-green-500">30% OFF</p>}
      <Button
        onClick={handleUpgrade}
        className="w-full bg-gray-100 text-black hover:bg-gray-200 cursor-pointer"
      >
        {data.buttonName}
      </Button>
      <div>
        {data.features.map((item, idx) => (
          <div className="flex items-center gap-2">
            <CheckCircledIcon key={item + idx} />
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionCard;
