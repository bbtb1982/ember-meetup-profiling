import Component from '@ember/component';

export default Component.extend({
  tag: 'section',

  classNames: ['box-settings'],

  actions: {
    toggleDynamic() {
      this.toggleProperty('isDynamic');
    },

    toggleAsync() {
      this.toggleProperty('isAsync');
    }
  },
});
