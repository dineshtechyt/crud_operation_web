import demoUserModel from "../models/demoUserModel.js";

export const createDUserController = async (req, res) => {
  try {
    const { name, address, education, age, location } = req.body;

    if (!name || !address || !education || !age || !location) {
      return res.status(404).send({
        success: "false",
        message: "something went wrong",
      });
    }

    const myData = await new demoUserModel({
      name,
      address,
      education,
      age,
      location,
    });
    myData.save();
    res.status(200).send({
      success: true,
      message: "the demo user is ceated successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "something is wrong",
    });
  }
};
export const updateDUserController = async (req, res) => {
  try {
    const { name, address, education, age, location } = req.body;
    const userId = req.params.id;
    // console.log(userId)
    if (!name || !address || !education || !age || !location) {
      return res.status(404).send({
        success: "false",
        message: "something went wrong",
      });
    }

    const myData = await demoUserModel.findByIdAndUpdate(
      userId,
      {
        name,
        address,
        education,
        age,
        location,
      },
      { new: true }
    );
    // myData.save();

    res.status(200).send({
      success: true,
      message: "the demo user is updated successfully",
      myData,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "something is wrong",
    });
  }
};
export const deleteDUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    // console.log(userId)
    await demoUserModel.findByIdAndDelete(userId);

    // myData.save();

    res.status(200).send({
      success: true,
      message: "the demo user is deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "something is wrong",
    });
  }
};
export const getAllDUserController = async (req, res) => {
  try {
    const data = await demoUserModel.find();

    // myData.save();

    res.status(200).send({
      success: true,
      message: "the demo user is fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "something is wrong",
    });
  }
};

export const getSingleDUserController = async (req, res) => {
  try {
    const userId = req.params.id;

    const data = await demoUserModel.findById(userId);

    // myData.save();

    res.status(200).send({
      success: true,
      message: "the  user is fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "something is wrong",
    });
  }
};
