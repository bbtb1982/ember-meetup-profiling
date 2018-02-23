import Route from '@ember/routing/route';
import { generateMatrix } from 'ember-meetup-profiling/utils/generate-matrix';
import { set } from '@ember/object';

export default Route.extend({

  setupController(controller, model) {
    this._super(controller, model);
    const containers = 1;
    const rows = 2;
    const columns = 10;

    controller.setProperties({ containers, rows, columns});
    set(controller, 'model', generateMatrix(containers, rows, columns));

  },

});
