const { User } = require('../models/index');

class UserRepository {

    async create(data){
        try {
            console.log(data);
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log("something went wrong in repo layer");
            throw error;
        }
    }

    async destroy(userId){
        try {
            await User.destroy({
                where: {
                    id: userId
                }
            });
            return true;
        } catch (error) {
            console.log("something went wrong in repo layer");
            throw error;
        }
    }
}

module.exports = UserRepository;