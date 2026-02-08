import Project from "../models/Project.js"
import catchAsync from "../utils/catchAsync.js"
import AppError from "../utils/appError.js"

// 1) Create Project
export const createProject = catchAsync(async (req, res, next) => {
  const { name, goalAmount, startDate, endDate, discription } = req.body

  if (!name || !goalAmount) {
    return next(new AppError("Please provide name and goal amount", 400))
  }

  const project = await Project.create({
    name,
    goalAmount,
    startDate,
    endDate,
    discription,
  })

  res.status(201).json({
    success: true,
    data: project,
  })
})

// 2) Get All Projects
export const getAllProjects = catchAsync(async (req, res, next) => {
  const projects = await Project.find().sort({ createdAt: -1 })

  res.status(200).json({
    success: true,
    results: projects.length,
    data: projects,
  })
})

// 3) Get Project By ID
export const getProjectById = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id)

  if (!project) {
    return next(new AppError("Project not found", 404))
  }

  res.status(200).json({
    success: true,
    data: project,
  })
})

// 4) Update Project
export const updateProject = catchAsync(async (req, res, next) => {
  const { name, goalAmount, collectedAmount, startDate, endDate, status, discription } = req.body

  const project = await Project.findByIdAndUpdate(
    req.params.id,
    { name, goalAmount, collectedAmount, startDate, endDate, status, discription },
    { new: true, runValidators: true }
  )

  if (!project) {
    return next(new AppError("Project not found", 404))
  }

  res.status(200).json({
    success: true,
    data: project,
  })
})

// 5) Delete Project
export const deleteProject = catchAsync(async (req, res, next) => {
  const project = await Project.findByIdAndDelete(req.params.id)

  if (!project) {
    return next(new AppError("Project not found", 404))
  }

  res.status(200).json({
    success: true,
    message: "Project deleted successfully",
  })
})