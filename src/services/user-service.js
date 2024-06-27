const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserRepository = require('../repository/user-repository');
const { JWT_KEY } =require('../config/serverConfig')
const AppErrors = require('../utils/error-handler')
class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            if(error.name == 'SequelizeValidationError') {
                throw error;
            }
            console.log("Something went wrong in service layer");
            throw error;
        }
    }
    
    async signIn(email, plainPassword) {
        try {
            // step 1 fetch user using the email:
            const user = await this.userRepository.getByEmail(email);
            // step 2: compare incoming plain pass w/ stored encrypted pass:
            const passwordMatch = await this.checkPassword(plainPassword, user.password);
            if(!passwordMatch){
                console.log("Password doeesn't match");
                throw {error: 'Incorrect password'};
            }
            // step 3 : if passwords match then create a token and send it to the user
            const newJWT = await this.createToken({ email: user.email, id: user.id});
            return newJWT;

        } catch (error) {
            if(error.name == 'AttributeNotFound') {
                throw error;
            }
            console.log("Something went wrong in signin process");
            throw error;
        }
    }

    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            if(!response){
                throw {error: 'Invalid token'};
            }
            const user = await this.userRepository.getById(response.id);
            if(!user) {
                throw {error: 'No user with the corresponding token exists'};
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in auth process");
            throw error;
        }
    }

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, {expiresIn: '1h'})
            return result;
        } catch (error) {
            console.log("something went wrong in token creating in service")
            throw error;
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("something went wrong in token validation in service")
            throw error;
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password comparison");
            throw error;
        }
    }

    isAdmin(userId){
        try {
            return this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }
}

module.exports = UserService;