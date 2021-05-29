const router = require('express').Router();
const {
  Category,
  Product
} = require('../../models');

// The `/api/categories` endpoint
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{
        model: Product,
      }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{
        model: Product
      }],
    });
    if (!categoryData) {
      res.status(404).json({
        message: 'No category was found with that id!'
      });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newProduct = await Category.create({
      id: req.body.id,
      category_name: req.body.category_name
    });

    res.status(200).json(newProduct);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update(
      {category_name: req.body.category_name},
      {where: {
      id: req.params.id}
    });
    if (!updateCategory) {
      res.status(404).json({ message: 'No category was found with that id!' });
      return;
    }
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteCategory = await Category.destroy({
      where: {
      id: req.params.id,
    }
    });
    if (!deleteCategory) {
      res.status(404).json({ message: 'No category was found with that id!' });
      return;
    }
    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;