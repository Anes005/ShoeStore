import User from '../auth/User.model.js';
class userController{
    async getUserById(Id){
        const user = await User.getUserDocById(Id)
        if (!user) {
            throw {
                code: 2,
                message: `User with id ${Id} not found.`
            }
        }
        return user
    }

}
export default new userController()