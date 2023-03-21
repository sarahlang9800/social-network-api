const { User, Thought } = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    
    getSingleUser(req, res) {
        User.findOne({ id: req.params.id })
            .populate('thoughts')
            .populate('friends')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'User with that id does not exist' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'User with that id does not exist!' });
                }
                return Thought.deleteMany({ _id: { $in: user.thoughts } });
            })
            .then(() => res.json({ message: 'User and associated thoughts have been deleted!' }))
            .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'User with this id does not exist!' })
                    : res.status(200).json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { friends: req.params.friendsId } },
            { new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'User with this id does not exist!' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { friends: req.params.friendsId } },
            { new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'User with this id does not exist!' })
                    : User.findOneAndUpdate(
                        { user: req.params.id },
                        { $pull: { friends: req.params.friendsId } },
                        { message: 'Friend was successfully deleted!' }
                    )
            )
            .catch((err) => res.status(500).json(err));
    },
};