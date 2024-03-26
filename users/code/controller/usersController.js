import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

// Initialize Supabase client
const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.PUBLIC_SUPABASE_ANON_KEY
);

const getAlluserData = async (req, res) => {
  try {
    // Fetch all user data from Supabase
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('id');

    if (error) {
      throw error;
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching user data from Supabase:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await supabase
      .from('profiles')
      .delete()
      .eq('id', id);
    console.log(result);
    res.status(200).json({ message: 'Row deleted successfully' });
  } catch (error) {
    console.error('Error deleting row:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const updateUser = async (req, res) => {
  const id = req.params.id
  const { email, full_name, password } = req.body;
  const updatedUser = {
    email,
    full_name,
    password,
  };

  try {
    const { data, error } = await supabase
      .from('profiles')
      .update([updatedUser])
      .eq('id', id)

    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.status(200).json(updatedUser);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getUserId = async (req, res) => {
  const id = req.params.id;

  try {
    // Fetch a product by ID from Supabase
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    if (profile) {
      res.json(profile);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getAlluserData, deleteUser, getUserId, updateUser };