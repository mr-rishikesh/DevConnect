// server/utils/pagination.js

export function getPagination(query) {
  const page = Math.max(parseInt(query.page) || 1, 1);
  const limit = Math.max(parseInt(query.limit) || 10, 1);
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}
