function generateMatrix(containers = 10, rows = 10, cols = 10) {
  console.log('generateMatrix');
  console.time('generateMatrix');
  const matrix =  { children: []};

  let _containers = containers;
  let _rows = rows;
  let _cols = cols;

  while (_containers--) {
    console.time(`generateMatrix: ${_containers}`);
    const _container = { children: [] };

    while (_rows--) {
      console.time(`generateMatrix: ${_containers}:${_rows}`);
      let _row = {
        children: [],
      }

      while (_cols--) {
        console.time(`generateMatrix: ${_containers}:${_rows}:${_cols}`);
        const item = { isActive: true };
        _row.children.push(item);

        console.timeEnd(`generateMatrix: ${_containers}:${_rows}:${_cols}`);
      }

      _cols = cols;
      _container.children.push(_row);
      console.timeEnd(`generateMatrix: ${_containers}:${_rows}`);
    }

    console.timeEnd(`generateMatrix: ${_containers}`);
    matrix.children.push(_container);
    _rows = rows;
  }

  console.timeEnd('generateMatrix');
  return matrix;

}
export { generateMatrix }
