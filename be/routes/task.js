const express = require('express');
const { Task } = require('../models');
const router = express.Router();
const authenticate = require('../lib/authenticate');
require('dotenv').config();


router.get('/', authenticate, async (req, res) => {
    try {
        const user =  req.user; // Assuming authenticate middleware sets req.user
        const tasks = await Task.findAll({
            userId : user.id,
        })
        res.status(200).json({
            message: 'Tasks retrieved successfully',
            tasks: tasks
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
})

router.post('/', authenticate, async (req, res) => {
    try {
        const user = req.user; 
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({
                message: 'Title'
            });
        }

        const newTask = await Task.create({
            taskName: title,
            status: 'pending', 
            userId: user.id
        });

        res.status(201).json({
            message: 'Task created successfully',
            task: newTask
        });
        
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
});

router.put('/:id', authenticate, async (req, res) => {
    try {
        const user = req.user;
        const { id } = req.params;
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({
                message: 'Title and description are required'
            });
        }
        const task = await Task.findOne({
            where: {
                id: id,
                userId: user.id
            }
        });
        if (!task) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }
        task,title = title;
        task.description = description;
        await task.save();
        res.status(200).json({
            message: 'Task updated successfully',
            task: task
        });
        
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
})

router.delete('/:id', authenticate, async (req, res) => {
    try {
        const user = req.user;
        const { id } = req.params;

        const task = await Task.findOne({
            where: {
                id: id,
                userId: user.id
            }
        });
        if (!task) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }
        await task.destroy();
        res.status(200).json({
            message: 'Task deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })
    }
})

module.exports = router;