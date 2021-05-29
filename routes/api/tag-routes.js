const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [
        // be sure to include its associated Product data
        {
          model: Product,
          through: ProductTag,
        }
      ]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});



// find a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
        // be sure to include its associated Product data
      include: [
        {
          model: Product,
          through: ProductTag,
        }
      ]
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag was found with that id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  
  
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create({
      id: req.body.id,
      tag_name: req.body.tag_name
    });

    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});



router.put('/:id', async (req, res) => {
  try {
    const updateTag = await Tag.update({
      where: {
      id: req.body.id,
      tag_name: req.body.tag_name
    }
    });
    if (!updateTag) {
      res.status(404).json({ message: 'No tag was found with that id!' });
      return;
    }
    res.status(200).json(updateTag);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
      id: req.body.id,
    }
    });
    if (!deleteTag) {
      res.status(404).json({ message: 'No tag was found with that id!' });
      return;
    }
    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(400).json(err);
  }
});



module.exports = router;
