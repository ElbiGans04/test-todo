import { error } from '../features/status/statusSlice';

export default function parseErrorMessage(doc) {
  return error({
    message: Object.entries(doc)
      .map((val) => `${val[0]}: ${val[1]}`)
      .join(', '),
  });
}
