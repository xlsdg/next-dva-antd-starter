import _ from 'lodash';

export class ReqError extends Error {
  constructor(type, payload) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(type);

    const that = this;
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(that, ReqError);
    }

    that.name = 'ReqError';
    that.timestamp = _.now();
    that.type = type;
    that.payload = payload;
  }
}
