const applyFilters = (query, filters) => {
  if (filters) {
    query.where(filters);
    // Object.entries(filters).forEach(([key, value]) => {
    // });
  }
};

const applySearch = (query, q, columnName = "first_name") => {
  if (q) {
    query.where(columnName, "ilike", `%${q}%`);
  }
};

const applySorting = (query, sort) => {
  if (sort) {
    query.orderBy(sort.by, sort.order);
  }
};

module.exports = { applyFilters, applySearch, applySorting };
