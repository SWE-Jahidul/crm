import mongoose, { Schema, model, models } from 'mongoose'

const TaskSchema = new Schema({
    organization_id: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: String,
    category: {
        type: String,
        enum: ['call', 'email', 'meeting', 'follow_up', 'other'],
        default: 'other',
    },
    priority: {
        type: String,
        enum: ['high', 'medium', 'low'],
        default: 'medium',
    },
    status: {
        type: String,
        enum: ['open', 'completed', 'cancelled'],
        default: 'open',
    },
    due_date: {
        type: Date,
        required: true,
    },
    assigned_to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    related_to_type: {
        type: String,
        enum: ['customer', 'deal', 'lead', 'general'],
    },
    related_to_id: {
        type: Schema.Types.ObjectId,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    completed_at: Date,
    updated_at: {
        type: Date,
        default: Date.now,
    },
})

// Fixed: use async without callback
TaskSchema.pre('save', async function () {
    this.updated_at = new Date()
    if (this.status === 'completed' && !this.completed_at) {
        this.completed_at = new Date()
    }
})

TaskSchema.index({ organization_id: 1, status: 1 })
TaskSchema.index({ organization_id: 1, due_date: 1 })
TaskSchema.index({ assigned_to: 1, status: 1 })

export default models.Task || model('Task', TaskSchema)
