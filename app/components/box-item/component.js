import Component from '@ember/component';
import { get, set } from '@ember/object';
import { task, timeout } from 'ember-concurrency';
import { random } from 'lodash';

export default Component.extend({

  delay: null,

  dynamic: true,

  classNames: ['box-item'],

  classNameBindings: ['isActive:active'],

  isActive: true,

  didReceiveAttrs() {
    this._super(...arguments);

    const dynamic = get(this, 'isDynamic');
    const delay = random(500, 1500);

    set(this, 'delay', delay);
    this.toggleProperty('isActive');
    if( dynamic ) {
      get(this, 'isActiveTask').perform(dynamic, delay);

    } else {
      get(this, 'isActiveTask').cancelAll();
    }
  },

  isActiveTask: task(function* (dynamic = false, delay = 1000) {
    yield timeout(random(1, 2000));

    while(dynamic) {
      yield timeout(delay);
      this.toggleProperty('isActive');
    }
  }).restartable(),

});
