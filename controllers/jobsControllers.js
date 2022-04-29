import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import Job from '../models/Job.js';
import { checkPermissions } from '../utils/checkPermissions.js';
import CustomApiErrorHandler from './../utils/CustomApiErrorHandler.js';
import moment from 'moment';

export const createJob = async (req, res) => {
  const { position, company } = req.body;
  if (!company || !position)
    throw new CustomApiErrorHandler(
      'Please provide all the values',
      StatusCodes.BAD_REQUEST
    );
  req.body.createdBy = req.user.id;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const getAllJobs = async (req, res) => {
  const { status, jobType, sort, search } = req.query;

  const queryObject = {
    createdBy: req.user.id,
  };
  //   add stuff based on conditions
  if (status !== 'all') {
    queryObject.status = status;
  }
  if (jobType !== 'all') {
    queryObject.jobType = jobType;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: 'i' };
  }

  //  no await because if add await we get the result immedialtely
  let result = Job.find(queryObject);

  // chain sort conditions
  if (sort === 'latest') {
    result = result.sort('-createdAt');
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt');
  }
  if (sort === 'a-z') {
    result = result.sort('position');
  }
  if (sort === 'z-a') {
    result = result.sort('position');
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const jobs = await result;
  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
};

export const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { company, position } = req.body;
  if (!company || !position)
    throw new CustomApiErrorHandler(
      'Please provide all the values',
      StatusCodes.BAD_REQUEST
    );
  const job = await Job.findOne({ _id: jobId });
  if (!job)
    throw new CustomApiErrorHandler(
      `No job found with this id ${jobId}`,
      StatusCodes.BAD_REQUEST
    );

  // check permissions;;;
  checkPermissions(req.user, job.createdBy);

  const jobUpdated = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ jobUpdated });
};

export const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;

  const job = await Job.findOne({ _id: jobId });
  if (!job)
    throw new CustomApiErrorHandler(
      `No job found with this id ${jobId}`,
      StatusCodes.BAD_REQUEST
    );

  // check permissions;;;
  checkPermissions(req.user, job.createdBy);
  await job.remove();
  res.status(StatusCodes.OK).json({ msg: 'Success, job deleted' });
};

export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.id) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    declined: stats.declined || 0,
    interview: stats.interview || 0,
  };
  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.id) } },
    {
      $group: {
        _id: {
          year: {
            $year: '$createdAt',
          },
          month: {
            $month: '$createdAt',
          },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { month, year },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y');
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
