import CustomerRecommendation from "../models/customerRecommendation.model.js";

// Get all customer recommendations, with optional filters
export const getAllCustomerRecommendations = async (req, res) => {
  try {
    const { product_type, status } = req.query;

    let filter = {};
    if (product_type) filter.product_type = product_type;
    if (status) filter.status = status;

    const recommendations = await CustomerRecommendation.find(filter).sort({
      confidence_score: -1, // optional: highest confidence first
    });

    res.status(200).json(recommendations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching recommendations" });
  }
};

// Optionally: create a recommendation
export const createCustomerRecommendation = async (req, res) => {
  try {
    const { customer_name, email, product_type, confidence_score, status } =
      req.body;

    const newRecommendation = await CustomerRecommendation.create({
      customer_name,
      email,
      product_type,
      confidence_score,
      status,
    });

    res.status(201).json(newRecommendation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error creating recommendation" });
  }
};
