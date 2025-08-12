/**
 * @module routes/api/comments
 * @description Express router for handling comment-related endpoints.
 */

 /**
    * GET /
    * Retrieves all comments, sorted by creation date (newest first).
    * @route GET /api/comments
    * @group Comments - Operations about comments
    * @returns {Array.<Comment>} 200 - An array of comment objects
    * @returns {object} 500 - Error message
    */

 /**
    * DELETE /:id
    * Deletes a comment by its ID.
    * @route DELETE /api/comments/{id}
    * @group Comments - Operations about comments
    * @param {string} id.path.required - The ID of the comment to delete
    * @returns {object} 200 - Success message
    * @returns {object} 404 - Comment not found message
    * @returns {object} 500 - Error message
    */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;
// Hey GitHub Copilot, 
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments" });
  }
});

// add another endpoint for deleting a comment
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment" });
  }
}   );

