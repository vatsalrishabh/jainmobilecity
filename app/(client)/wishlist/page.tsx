import NoAccess from "@/components/NoAccess";
import WishListProducts from "@/components/WishListProducts";

import React from "react";

const WishListPage = async () => {
  return (
    <>
      {true ? (
        <WishListProducts />
      ) : (
        <NoAccess details="Log in to view your wishlist items. Don’t miss out on your cart products to make the payment!" />
      )}
    </>
  );
};

export default WishListPage;
