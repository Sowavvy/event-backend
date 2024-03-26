import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

// Initialize Supabase client
const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.PUBLIC_SUPABASE_ANON_KEY
);

const getAllFarmerData = async (req, res) => {
  try {
    // Fetch all farmers from Supabase
    const { data, error } = await supabase
      .from("farmers")
      .select("*")
      .order("farmer_id");

    if (error) {
      throw error;
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching farmers from Supabase table:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteFarmer = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await supabase.from("farmers").delete().eq("id", id);
    console.log(result);
    res.status(200).json({ message: "Farmer deleted successfully" });
  } catch (error) {
    console.error("Error deleting farmer from Supabase table:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateFarmer = async (req, res) => {
  const { id, name, address, zipcode, city } = req.body;
  const farmerId = req.params.id;
  // obsolete, please update to work with new database
  const updatedFarmer = {
    id,
    name,
    address,
    zipcode,
    city,
  };

  try {
    const { data, error } = await supabase
      .from("farmers")
      .update([updatedFarmer])
      .eq("id", farmerId);

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.status(200).json(updatedFarmer);
  } catch (error) {
    console.error("Error updating farmer in Supabase table:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getFarmerById = async (req, res) => {
  const id = req.params.id;

  try {
    //Fetch farmer by id
    const { data: farmer, error } = await supabase
      .from("farmers")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    if (farmer) {
      res.json(farmer);
    } else {
      res.status(404).json({ error: "Farmer not found" });
    }
  } catch (error) {
    console.error("Error fetching farmer from Supabase table by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createFarmer = async (req, res) => {
  const { id, name, address, zipcode, city } = req.body;
  const newFarmer = {
    id,
    name,
    address,
    zipcode,
    city,
  };

  try {
    const { data, error } = await supabase.from("farmers").insert([newFarmer]);

    if (error) {
      throw error;
    }

    res.status(201).json(newFarmer);
  } catch (error) {
    console.error("Error creating farmer in Supabase table:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllFarmerProducts = async (req, res) => {
  try {
    const farmersId = req.params.id;
    console.log(farmersId);
    // Fetch all farmers products from Supabase
    const { data, error } = await supabase
      .from("farmers")
      .select("*")
      .eq("id", farmersId)
      .order("id");

    if (error) {
      throw error;
    }

    res.json(data); // Fixed: Respond with the actual data retrieved from Supabase
  } catch (error) {
    console.error("Error fetching farmer Products from Supabase table:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProductById = async (req, res) => {
  const id = req.params.id;

  try {
    //Fetch farmer by id
    const { data: products, error } = await supabase
      .from("farmer_products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    if (products) {
      res.json(products);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error fetching farmers products from Supabase table by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createProduct = async (req, res) => {
  const { id, product_name, quantity, weight, calories, nutriscore } = req.body;
  const newProduct = {
    id,
    product_name,
    quantity,
    weight,
    calories,
    nutriscore,
  };

  try {
    const { data, error } = await supabase.from("farmer_products").insert([newProduct]);

    if (error) {
      throw error;
    }

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product in Supabase table:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateFarmerProduct = async (req, res) => {
  const { id, product_name, quantity, weight, calories, nutriscore } = req.body;
  const productId = req.params.id;
  const updatedProduct = {
    id,
    product_name,
    quantity,
    weight,
    calories,
    nutriscore,
  };

  try {
    const { data, error } = await supabase
      .from("farmer_products")
      .update([updatedProduct])
      .eq("id", productId);

    if (error) {
      throw error;
    }

    console.log(data); // Log the result for debugging if needed
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating farmer product in Supabase table:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteFarmerProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const { data, error } = await supabase.from("farmer_products").delete().eq("id", id);

    if (error) {
      throw error;
    }

    console.log(data); // Log the result for debugging if needed
    res.status(200).json({ message: "Farmer product deleted successfully" }); // Updated: Respond with a success message
  } catch (error) {
    console.error("Error deleting farmer product from Supabase table:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  getAllFarmerData,
  createFarmer,
  deleteFarmer,
  updateFarmer,
  getFarmerById,
  getAllFarmerProducts,
  getProductById,
  createProduct,
  updateFarmerProduct,
  deleteFarmerProduct,
};
