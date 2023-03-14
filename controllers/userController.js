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
            .then((users) =>
                !users
                    ? res.status(404).json({ message: 'User with that id does not exist' })
                    : res.json(users)
            )
            .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'User with that id does not exist!' })
                    : User.findOneAndUpdate(
                        { user: req.params.id },
                        { $pull: { user: req.params.id } },
                        { message: 'User successfully deleted!' }
                    )
            )
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { user: { _id: req.params.id } } },
            { runValidators: true, new: true }
        )
            .then((users) =>
                !users
                    ? res.status(404).json({ message: 'User with this id does not exist!' })
                    : res.status(200).json(users)
            )
            .catch((err) => res.status(500).json(err));
    },
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { friends: req.params.friendsId } },
            { new: true }
        )
            .then((users) =>
                !users
                    ? res.status(404).json({ message: 'User with this id does not exist!' })
                    : res.json(users)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { friends: req.params.friendsId } },
            { new: true }
        )
            .then((users) =>
                !users
                    ? res.status(404).json({ message: 'User with this id does not exist!' })
                    : User.findOneAndUpdate(
                        { users: req.params.id },
                        { $pull: { friends: req.params.friendsId } },
                        { message: 'Friend was successfully deleted!' }
                    )
            )
            .catch((err) => res.status(500).json(err));
    },
};