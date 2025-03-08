import api from "@/config/api";

export const createPayment = async ({ planType, jwt }) => {
  try {
    const { data } = await api.post(`/api/payments/${planType}`, null, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (data.payment_link_url) {
      window.location.href = data.payment_link_url;
    }
  } catch (error) {
    console.log("Error in payment: ", error.message);
  }
};
