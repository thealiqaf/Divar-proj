const Category = require('../models/category');

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            console.log('Name of category is required');
            return res.status(400).json({
                message: 'Name of category is required'
            });
        }
        const category = new Category({ name });
        await category.save();

        console.log('Category created');
        res.status(201).json({
            message: 'Category created'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error
        });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        res.status(5000).json({
            error: err
        });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            console.log('Category not found');
            return res.status(404).json({
                message: 'Category not found'
            });
        }
        res.status(200).json(category);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: err
        });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Category.findByIdAndUpdate(req.params.id,
            { name },
            { new: true });
            if (!category) {
                console.log('Category not found');
                return res.status(404).json({
                    message: 'Category not found'
                });
            }
            console.log('Category updated');
            res.status(200).json({
                message: 'Category updated'
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: err
        });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const category = await category.findByIdandDelete(req.params.id);
        if (!category) {
            console.log('Category not found');
            return res.status(404).json({
                message: 'Category not found'
            });
        }
        console.log('Category deleted');
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: err
        });
    }
};