import axios from 'axios';
import { rootApiUrl } from './constants/index';
export const RootApi = axios.create({
  baseURL: rootApiUrl,
});
