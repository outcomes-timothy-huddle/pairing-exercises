import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | patient header', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{patient-header}}`);

    assert.dom('h1').hasText('John Smith');
    assert.dom('.dob').hasText('DOB : 01/02/1970');
    assert.dom('.policy').hasText('Policy : Healthcare Inc.');
    assert.dom('.state').hasText('State : Ohio');
  });
});
