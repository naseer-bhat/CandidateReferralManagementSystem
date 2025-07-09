import User from "../models/user.model.js";

export const addNewCandidate = async (req, res) => {
  try {
    const { name, email, phone, jobTitle, status, resume, referredBy } =
      req.body;
    if (!name || !email || !phone || !jobTitle || !status)
      res.status(400).json({ msg: `All fields required` });
    const newCandidate = {
      name,
      email,
      phone,
      jobTitle,
      status,
      resume,
      referredBy,
    };
    await User.create(newCandidate);
    return res
      .status(201)
      .json({ msg: "User created sucessfully", newCandidate });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, msg: "internal server error" });
  }
};
export const getAllCandidates = async (req, res) => {
  try {
    const allCandidates = await User.find({ referredBy: { $ne: null } });
    res.status(200).json({ allCandidates });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch candidates" });
  }
};
export const updateCandidateStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;
    if (!userId) return res.status(400).json({ msg: "userId required" });
    const updatedCandidate = User.findByIdAndUpdate(
      userId,
      { status: status },
      { new: true }
    );
    if (!updatedCandidate) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json({ status });
  } catch (error) {
    res.status(500).json({ error: "Failed to update candidates status" });
  }
};
export const deleteCandidate = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ msg: "userId is required" });
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res
      .status(200)
      .json({ msg: "User deleted successfully", deletedUser });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, msg: "internal server error" });
  }
};
export const search = async (req, res) => {
  try {
    const { jobTitle, status } = req.query;
    const query = [];
    if (jobTitle) query.push({ jobTitle });
    if (status) query.push({ status });

    if (query.length === 0) {
      return res
        .status(400)
        .json({ msg: "Please provide jobTitle or status to search" });
    }
    const searchedCandidate = await User.find({ $or: query });
    if (!searchedCandidate.length === 0) {
      return res.status(404).json({ msg: "no search found" });
    }
    return res.status(200).json({ searchedCandidate });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
