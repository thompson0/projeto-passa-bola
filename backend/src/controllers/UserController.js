import User from '../models/User.js';

class UserController {
  static async getCurrentUser(req, res) {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select('-password');
      
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}

export default UserController;