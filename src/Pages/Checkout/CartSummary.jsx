import { useSelector } from "react-redux";
import { IMAGE_BASE_URL } from "../../utils/apiConstants";

const CartItem = ({ name, size, price, quantity, image }) => (
  <div className="flex items-center py-3 border-b border-gray-200">
    <img src={IMAGE_BASE_URL + "/" + image} className="h-16 w-16 bg-gray-100 rounded-md flex-shrink-0" />
    <div className="ml-4 flex-grow">
      <h3 className="text-sm font-medium text-gray-900">{name}</h3>
      <p className="text-sm text-gray-500">{size}</p>
    </div>
    <div className="flex items-center">
      <span className="text-gray-500 mr-2">{quantity}x</span>
      <span className="text-sm font-medium">€{parseInt(price).toFixed(2)}</span>
    </div>
  </div>
);

const CartSummary = () => {

    const cart = useSelector((state) => state.cart.cart);

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="w-full max-w-2xl">
      <div className="p-6">
        <div className="space-y-1">
          {cart.map((item) => (
            <CartItem
              key={item?.id}
              name={item?.name}
              size={item?.selectedSize}
              price={item?.price}
              quantity={item?.quantity}
              image={item?.image}
            />
          ))}
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Subtotal</span>
            <span className="text-sm font-medium">€{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div className="flex items-center">
              <span>Shipping</span>
              <div className="ml-1 text-gray-400">
                <span className="text-xs">(?)</span>
              </div>
            </div>
            <span>Calculated at next step</span>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-base font-medium">Total</span>
              <span className="text-lg font-medium">EUR €{subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;