import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import shoppingcart from "../assets/ShoppingCart.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {
  fetchCartByUserId,
  removeFromCart,
  updateCartItem,
} from "../Redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearBuyNowItem } from "../Redux/slices/buyNowSlice"; // ✅ import this

// Get the user string from localStorage
const userString = localStorage.getItem("user");

// Parse it into an object
const user = JSON.parse(userString);

// Access the id
const user_Id = user?.id;

console.log("From the cart" , user_Id); // Output: "9"


const ShoppingCart = () => {
  const userId = user_Id; // temp userId
  const dispatch = useDispatch();
  
  const items = useSelector((state) => state.cart?.items);

  // ✅ Clear BuyNow item if user opens the cart
  useEffect(() => {
    const buyNowItem = localStorage.getItem("buyNowItem");
    if (buyNowItem) {
      console.log("🧹 Removing buyNowItem instantly since user opened Cart");

      // ✅ Remove from localStorage
      localStorage.removeItem("buyNowItem");

      // ✅ Dispatch to Redux (update state so UI reacts immediately)
      dispatch(clearBuyNowItem());

      // ✅ Optional: force a tiny re-render to sync UI without reload
      window.dispatchEvent(new Event("storage"));
    }
  }, [dispatch]);


  useEffect(() => {
    if (userId) {
      dispatch(fetchCartByUserId(userId));
    }
  }, [dispatch, userId]);

  const handleRemove = (cartItemId) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      dispatch(removeFromCart(cartItemId));
      dispatch(fetchCartByUserId(userId));
    }
  };

  const handleIncrement = (item) => {
    dispatch(
      updateCartItem({
        cartId: item.cartId,
        action: 1,
      })
    );
  };

  const handleDecrement = (item) => {
    if (item?.quantity > 1) {
      dispatch(
        updateCartItem({
          cartId: item.cartId,
          action: -1,
        })
      );
    }
  };

  // ✅ Calculate price details
  const totalItems =
    items?.items?.reduce((sum, item) => sum + Number(item?.quantity), 0) || 0;

  const totalPrice =
    items?.items?.reduce(
      (sum, item) => sum + item.productPrice * item?.quantity,
      0
    ) || 0;

  const discountRate = 0.05; // 5% discount
  const discountAmount = totalPrice * discountRate;
  const gstRate = 0.18; // 18% GST
  const gstAmount = (totalPrice - discountAmount) * gstRate;

  const finalAmount = totalPrice - discountAmount + gstAmount;

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header */}
      <div
        className="w-full h-60 lg:h-80 bg-cover bg-center flex items-center justify-start pl-20"
        style={{
          backgroundImage: `url(${shoppingcart})`,
        }}
      >
        <div>
          <h1 className="text-4xl font-bold">Shopping Cart</h1>
          <p className="mt-2">
            <Link to={"/MainHome"}>Home </Link> |{" "}
            <span className="font-semibold">Shopping Cart</span>
          </p>
        </div>
      </div>

      {/* Cart Section */}
      <div className="max-w-7xl mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - Product List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="hidden sm:grid grid-cols-4 font-semibold text-sm border-b pb-2">
            <p>PRODUCT NAME</p>
            <p className="text-center">UNIT PRICE</p>
            <p className="text-center">QUANTITY</p>
            <p className="text-right">TOTAL</p>
          </div>

        

          {/* Product Item */}
          {items?.items?.map((item, index) => (
            <div
              key={item?.id}
              className="flex flex-col sm:grid sm:grid-cols-4 gap-4 items-start sm:items-center border-b pb-4 pt-4"
            >

              {/* Product Info */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <img
                  src={item?.productImage[0]}
                  alt="product"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
                />
                <div>
                  <p className="text-sm text-gray-400">Nallakkar</p>
                  <p className="text-xs sm:text-sm font-semibold">
                    {item?.productName} (
                    {item?.variant &&
                      Object.entries(item?.variant)?.map(
                        ([key, value], index) => (
                          <span key={key}>
                            {key}: {value}
                            {index <
                            Object.entries(item.variant).length - 1
                              ? ", "
                              : ""}
                          </span>
                        )
                      )}
                    )
                  </p>
                </div>
              </div>

              {/* Unit Price */}
              <p className="text-gray-700 sm:text-center text-sm sm:text-base">
                {item?.productPrice}
              </p>

              {/* Quantity */}
              <div className="flex items-center gap-2 sm:justify-center">
                <button
                  className="px-2 py-1 border rounded"
                  onClick={() => handleDecrement(item)}
                >
                  <FaMinus size={12} />
                </button>
                <span className="text-sm sm:text-base">{item?.quantity}</span>
                <button
                  className="px-2 py-1 border rounded"
                  onClick={() => handleIncrement(item)}
                >
                  <FaPlus size={12} />
                </button>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                <p className="text-gray-700 text-sm sm:text-base">
                  {(item?.productPrice * item?.quantity).toFixed(2)}
                </p>
                <button
                  className="text-gray-500 hover:text-red-500"
                  onClick={() => handleRemove(item?.cartId)}
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right - Price Details */}
        <div className="pb-12 lg:pb-0 font-semibold text-black">
          <div className="border rounded-lg shadow p-6 space-y-4">
            <h2 className="text-lg font-semibold">Price Details</h2>
            <div className="flex justify-between text-sm sm:text-base">
              <p>Price ({parseInt(totalItems, 10)} items)</p>
              <p>₹ {totalPrice.toFixed(2)}/-</p>
            </div>

            <div className="flex justify-between text-sm sm:text-base">
              <p>Discount</p>
              <p>- ₹ {discountAmount.toFixed(2)}</p>
            </div>

            <div className="flex justify-between text-sm sm:text-base">
              <p>GST (18%)</p>
              <p>₹ {gstAmount.toFixed(2)}</p>
            </div>

            <div className="flex justify-between font-semibold border-t pt-3 text-sm sm:text-base">
              <p>Total Amount</p>
              <p>₹ {finalAmount.toFixed(2)}/-</p>
            </div>

            <p className="text-green-600 text-xs sm:text-sm">
              You saved ₹ {discountAmount.toFixed(2)} on this order
            </p>

            <Link
              to={"/category/kids"}
              className="block text-center w-full border py-2 font-medium hover:bg-gray-100 text-sm sm:text-base"
            >
              Continue Shopping
            </Link>
            <Link
              to={"/SelectAddress"}
              className="block text-center w-full bg-primary text-white py-2 font-semibold hover:bg-rose text-sm sm:text-base"
            >
              Order Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
