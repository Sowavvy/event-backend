import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Initialize Supabase client
const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.PUBLIC_SUPABASE_ANON_KEY
);

const getCart = async (req, res) => {
  try {
    // Fetch all products in cart from Supabase
    const { data, error } = await supabase
      .from('shoppingCart')
      .select('*')
      .order('id');

    if (error) {
      throw error;
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const upsertNewProduct = async (req, res) => {
  const { product, amount, totalPrice } = req.body;
  const newProduct = {
    product,
    amount,
    totalPrice,
  };

  try {
    const { data, error } = await supabase.from('shoppingCart').upsert([newProduct]);

    if (error) {
      throw error;
    }

    res.status(200).json(newProduct);
  } catch (error) {
    console.error('Error adding/updating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getCartById = async (req, res) => {
  const cartId = req.params.id;

  try {
    // Fetch a product by ID from Supabase
    const { data: product, error } = await supabase
      .from('shoppingCart')
      .select('*')
      .eq('id', cartId)
      .single();

    if (error) {
      throw error;
    }

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const placeOrder = async (req, res) => {
  const { destination } = req.body; // Extract destination from request body

  try {
    // Fetch all products from the shopping cart
    const { data: shoppingCartItems, error: cartError } = await supabase
      .from('shoppingCart')
      .select('*');

    if (cartError) {
      throw cartError;
    }

    // Prepare order details including destination and products
    const orderDetails = {
      destination: destination,
      products: shoppingCartItems || [], // Array containing products from shopping cart
      // Add more fields as needed for the order
    };

    // Insert the order details into the 'orders' table using Supabase
    const { data: insertedOrder, error: orderError } = await supabase
      .from('orders')
      .insert([orderDetails]);

    if (orderError) {
      throw orderError;
    }

    res.status(200).json(orderDetails); // Respond with order details if successful
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await supabase
      .from('shoppingCart')
      .delete()
      .eq('id', id);
    console.log(result);
    res.status(200).json({ message: 'Row deleted successfully' });
  } catch (error) {
    console.error('Error deleting row:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export { getCart, upsertNewProduct, getCartById, placeOrder, deleteProduct };
