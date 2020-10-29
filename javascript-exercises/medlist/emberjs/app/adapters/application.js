import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  namespace: 'api'

  // host: 'https://mock-rest-backend.apps.np1.fuseapps.io',
  // ajax: function(url, method, hash) {
  //   hash.crossDomain = true;
  //   hash.xhrFields = {withCredentials: false};
  //   return this._super(url, method, hash);
  // }
});
