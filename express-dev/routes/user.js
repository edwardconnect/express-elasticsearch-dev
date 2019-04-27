import express from 'express';
import mongooseClient from '../src/db/mongoose';
import { esclient } from '../src/db/elasticsearch'

const router = express.Router();