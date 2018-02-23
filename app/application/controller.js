
import Controller from '@ember/controller';
import { get, set } from '@ember/object';
import { generateMatrix } from 'ember-meetup-profiling/utils/generate-matrix';
import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  columns: null,

  containers: null,

  delay: 10,

  isAsync: true,

  isDynamic: true,

  rows: null,

  generateMatrixTask: task(function * (containers = 10, rows = 10, cols = 10, delay = 10) {
    console.log('generateMatrixTask');
    console.time('generateMatrixTask');
    yield timeout(delay);

    const matrix =  { children: []};
    let _containers = containers;
    let _rows = rows;
    let _cols = cols;

    while (_containers--) {
        console.time(`generateMatrixTask: ${_containers}`);

      yield timeout(delay);
      const _container = { children: [] };

      while (_rows--) {
        console.time(`generateMatrixTask: ${_containers}:${_rows}`);
        let _row = {
          children: [],
        }

        while (_cols--) {
          console.time(`generateMatrixTask: ${_containers}:${_rows}:${_cols}`);

          yield timeout(delay);
          const item = { isActive: false };
          _row.children.push(item);

          console.timeEnd(`generateMatrixTask: ${_containers}:${_rows}:${_cols}`);
        }

        _cols = cols;
        _container.children.push(_row);
        console.timeEnd(`generateMatrixTask: ${_containers}:${_rows}`);
      }

      console.timeEnd(`generateMatrixTask: ${_containers}`);
      matrix.children.push(_container);
      _rows = rows;
    }

    console.timeEnd('generateMatrixTask');

    set(this, 'model', matrix);
  }).restartable(),

  actions: {
    generateMatrix() {
      const containers = get(this, 'containers');
      const rows = get(this, 'rows');
      const cols = get(this, 'columns');
      const delay = get(this, 'delay');

      if (get(this, 'isAsync')) {
        get(this, 'generateMatrixTask').perform(containers, rows, cols, delay);
      } else {
        set( this, 'model', generateMatrix(containers, rows, cols));
      }

    }
  }

});
