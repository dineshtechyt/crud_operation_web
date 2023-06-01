import demoUserModel from "../models/demoUserModel.js";

// filters
export const userFiltersController = async (req, res) => {
  try {
    const {radio } = req.body;
    let arg = {};
    
    // if (checked.legnth > 0) arg.category = checked;
    if (radio.length) arg.age = { $gte: radio[0], $lte: radio[1] };
    console.log(arg)
    const users = await demoUserModel.find(arg);
    res.status(200).send({
      success: true,
      message: "successfully filter",
      data:users,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};

// product count
export const userCountController = async (req, res) => {
  try {
    const total = await demoUserModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
export const userListController = async (req, res) => {
  try {
    const perPage = 3;
    const page = req.params.page ? req.params.page : 1;
    const products = await demoUserModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

// search product
export const searchUserController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await demoUserModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};
