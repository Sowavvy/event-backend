import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

// Initialize Supabase client
const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.PUBLIC_SUPABASE_ANON_KEY
);


const getAllProducts = async (req, res) => {
  try {
    // Fetch all products from Supabase
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id");


    if (error) {
      throw error;
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const { name, price, pictures, weight, stock } = req.body;
  const updatedProduct = {
    name,
    price,
    pictures,
    weight,
    stock,
  };

  try {
    const { data, error } = await supabase
      .from('products')
      .update([updatedProduct])
      .eq('id', id);

    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.status(200).json(updatedProduct);

  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    // Fetch a product by ID from Supabase
    const { data: product, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single();

    if (error) {
      throw error;
    }

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addProduct = async (req, res) => {
  const { name, type, weight, price, kcal, NutriScore, pictures, farmer_id, stock } = req.body;
  const newProduct = {
    name,
    type,
    weight,
    price,
    kcal,
    NutriScore,
    pictures,
    farmer_id,
    stock,
  }

  try {
    const { data, error } = await supabase
      .from("products")
      .insert([newProduct])
      .select();

    if (error) {
      throw error;
    }

    res.status(200).json(newProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export { getAllProducts, getProductById, updateProduct, deleteProduct, addProduct };
