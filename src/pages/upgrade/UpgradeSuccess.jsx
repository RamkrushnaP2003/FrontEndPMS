import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  getUserSubscription,
  upgradeSubcription,
} from "@/redux/subcription/Action";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UpgradeSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { subscription } = useSelector((store) => store);
  const queryParam = new URLSearchParams(location.search);
  const paymentId = queryParam.get("payment_id");
  const planType = queryParam.get("planType");

  useEffect(() => {
    dispatch(upgradeSubcription({ planType }));
    dispatch(getUserSubscription());
  }, []);

  return (
    <div className="flex justify-center">
      <Card className="mt-15 space-y-5 flex flex-col items-center p-5 shadow-2xl z-10">
        <div className="flex items-center gap-4 pb-2 border-b">
          <CheckCircledIcon className="h-9 w-9 text-green-500" />
          <p className="text-xl font-semibold text-gray-900">
            Plan upgraded successfully!
          </p>
        </div>
        <div className="space-y-3 font-semibold">
          <p className="text-green-500">Start Data: </p>
          <p className="text-red-500">End Data: </p>
          <p className="">Playn Type: </p>
        </div>
        <Button className="cursor-pointer" onClick={() => navigate("/home")}>
          Go To Home
        </Button>
      </Card>
    </div>
  );
};

export default UpgradeSuccess;
