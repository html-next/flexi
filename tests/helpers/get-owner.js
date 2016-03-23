export default function getOwner(context) {
  let _context = context.application.__deprecatedInstance__;
  if (!_context || !_context.lookup) {
    _context = context.application.__container__;
  }
  return _context;
}
