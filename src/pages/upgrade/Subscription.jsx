import React from "react";
import SubscriptionCard from "./SubscriptionCard";

const Subscription = () => {
  const monthlyPlan = [
    "Add unlimited project",
    "Access to live chat",
    "Add unlimiited team member",
    "Advanced reporting",
    "Priority support",
    "Customization option",
    "Integration support",
    "Advanced security",
    "Training and resources",
    "Access control",
    "Custom workflow",
  ];

  const annualPlan = [
    "Add unlimited project",
    "Access to live chat",
    "Add unlimited team member",
    "Advanced reporting",
    "Priority support",
    "Everything which monthly plan has",
  ];

  const freePlan = [
    "Add only 3 projects",
    "Basic task management",
    "Project collaboration",
    "Basic reporting",
    "Email Notification",
    "Basic access control",
  ];

  return (
    <div className="p-10">
      <h1 className="text-5xl font-semibold py-5 pb-16 text-center">Pricing</h1>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-9">
        <SubscriptionCard
          key={"freeplan"}
          data={{
            planName: "Free",
            features: freePlan,
            planType: "FREE",
            price: 0,
            buttonName: true ? "Current Plan" : "Get Started",
          }}
        />
        <SubscriptionCard
          key="monthlyplan"
          data={{
            planName: "Monthly Paid Plan",
            features: monthlyPlan,
            planType: "MONTHLY",
            price: 799,
            buttonName: true ? "Current Plan" : "Get Started",
          }}
        />
        <SubscriptionCard
          key="annualplan"
          data={{
            planName: "Annual Paid Plan",
            features: annualPlan,
            planType: "ANNUALLY",
            price: 6711,
            buttonName: true ? "Current Plan" : "Get Started",
          }}
        />
      </div>
    </div>
  );
};

export default Subscription;
