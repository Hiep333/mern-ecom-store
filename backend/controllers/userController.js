// Đinh nghĩa xử lý logic cho route / của user
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../middlewares/asyncHandler.js";

//hàm create user sẽ được gọi khi có request post tới /api/users, nó sẽ tạo một user mới trong database
//với thông tin được gửi lên từ client, sau đó trả về thông tin user vừa tạo cho client, nếu có lỗi thì trả về thông báo lỗi
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  // check if fields are missing and return error if so
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Missing required fields");
  }

  // check if user already exists and return error if so
  const userExists = await User.findOne({ email });
  if (userExists) res.status(400).send("User already exists");

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create new user
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save(); // save user to database
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export { createUser };
