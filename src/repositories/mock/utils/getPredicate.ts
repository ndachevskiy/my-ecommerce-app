export const getPredicate = (filterStr) => {
  const predicates = [];
  const conditions = filterStr.split(';');

  conditions.forEach(condition => {
    const match = condition.match(/(\w+)([=><!]+)(.+)/);
    if (!match) {
      throw new Error("Filter format is incorrect");
    }

    let [_, field, operator, valueStr] = match;
    const isNumeric = ['price', 'quantity', 'createTime'].includes(field);
    field = field === 'ids' ? 'id' : field;
    const values = valueStr.split(',').map(val => isNumeric ? parseFloat(val.trim()) : val.toLowerCase().trim());

    predicates.push((entity) => {
      const fieldValue = isNumeric ? entity[field] : entity[field].toLowerCase();

      if (isNumeric) {
        switch (operator) {
          case '=': return values.includes(fieldValue);
          case '>': return fieldValue > Math.min(...values);
          case '<': return fieldValue < Math.max(...values);
          case '>=': return fieldValue >= Math.min(...values);
          case '<=': return fieldValue <= Math.max(...values);
          case '!=': return !values.includes(fieldValue);
          default: throw new Error("Unsupported operator for numeric fields");
        }
      } else {
        switch (operator) {
          case '=':
          case 'contains':
            return values.some(value => fieldValue && fieldValue.includes(value));
          default: throw new Error("Unsupported operator for string fields");
        }
      }
    });
  });

  return (entity) => {
    return predicates.every(predicate => predicate(entity));
  };
};









