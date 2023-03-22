const { User, Thought } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.status(200).json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.id })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'That thought does not exist yet!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.id })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Thought with that ID does not exist!' })
                    : Thought.findOneAndUpdate(
                        { thoughts: req.params.id },
                        { $pull: { thoughts: req.params.id } },
                        { message: 'Thought successfully deleted' }
                    )
            )
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Thought with this id does not exist!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true, runValidators: true }
        )
            .populate('reactions')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Thought with this id does not exist!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
            .then((thought) => {
                if (!thought) {
                    return res.status(404).json({ message: 'Thought with this id does not exist!' });
                }
                res.status(200).json({ message: 'Reaction successfully deleted', thought });
            })
            .catch((err) => res.status(500).json(err));
    },
};