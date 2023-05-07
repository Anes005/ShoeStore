import {validateSignup,validateLogin} from '../../util/validation.js'
import User from './User.model.js';

class AuthController {
    async loginWithUsernameOrEmail({usernameOrEmail, password}) {
        const {error} = validateLogin(usernameOrEmail, password);
        if (error){
            throw{
                code : 1, 
                message : error.details[0].message
            }
        }
        const user = await User.findByCredentials(usernameOrEmail);
        if (!user) {
            throw{
                code : 2, 
                message : 'Invalid login credentials'
            }
        }
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            throw{
                code : 3, 
                message : 'Invalid login credentials'
            }
        } 
        const token = await user.generateAuthToken();
        return{token: token, username: user.username, email: user.email, id: user._id ,firstName: user.firstName, lastName: user.lastName , role: user.role };
    }
    async signup({username, password, email, firstName, lastName}) {
        
        const {error} = validateSignup(username, password, email, firstName, lastName);
        if (error){
            throw{
                code : 1,  // validation error
                message : error.details[0].message
            }
        }
        const user = new User({
            username,
            password,
            email,
            firstName,
            lastName,
            role: "user"
        })
        try{
            const doc = await user.save();
            const token = await user.generateAuthToken();
            return{token: token, username: doc.username, email: doc.email, id: doc._id ,firstName: doc.firstName, lastName: doc.lastName};
        }catch(err){
            if ( err.code === 11000) {
                // Duplicate username
                throw{
                    code : 2,  // duplicate username
                    message : 'User already exists!'
              }
            }  
        }
    }
}
// Singleton of AuthController
export default new AuthController()
