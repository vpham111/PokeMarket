import { useShoppingCart } from 'use-shopping-cart';

export default function Product({ product }) {
  const { addItem } = useShoppingCart();

  const itemToAdd = {
    id: product.id,
    name: product.name,
    //price: Math.round(product.price * 100), 
    //currency: 'usd',                        
  };

  return (
    <div>
      <h3>{product.name}</h3>
      <p>${product.price.toFixed(2)}</p>
      <button onClick={() => addItem(itemToAdd)}>Add to Cart</button>
    </div>
  );
}
