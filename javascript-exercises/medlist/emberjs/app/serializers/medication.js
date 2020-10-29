import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  attrs: {
    prescriber: { embedded: 'always' }
  }
});
