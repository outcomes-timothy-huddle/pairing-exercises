import DS from 'ember-data';

export default DS.Model.extend({
  name : DS.attr('string'),
  directionsForUse : DS.attr('string'),
  condition : DS.attr('string'),
  prescriber : DS.belongsTo('prescriber', { async: false })
});
