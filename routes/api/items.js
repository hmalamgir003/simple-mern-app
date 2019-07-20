const express = require("express");
const router = express.Router();

const Item = require("../../models/Item");

//@route   GET api/items
//@des     Get All Items
//@access  Public
router.get("/", async (req, res) => {
  const items = await Item.find({}).sort({ date: -1 });
  try {
    res.send(items);
  } catch (error) {
    res.status(404).send(error);
  }
});

//@route   POST api/items
//@des     Create a item
//@access  Public
router.post("/", async (req, res) => {
  const item = new Item({
    name: req.body.name
  });

  try {
    await item.save();
    res.status(201).send(item);
  } catch (error) {
    res.status(404).send(error);
  }
});

//@route   DELETE api/items/:id
//@des     Delete a item
//@access  Public
router.delete("/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const item = await Item.findByIdAndDelete(_id);

    if (!item) {
      return res.status(404).send({ msg: "No item" });
    }

    res.send(item);
  } catch (err) {
    res.status(404).send();
  }
});

module.exports = router;
