const config = {
  limit: 20,
  offset: 0,
};

export function setOffset(newOffset) {
  config.offset = newOffset;
}

export function getOffset() {
  return config.offset;
}

export function getLimit() {
  return config.limit;
}
