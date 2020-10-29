import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | patient medlist', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders 2 medications', async function(assert) {

    this.set('medications', [
      {
        id: "44e5a1ac-e0e8-4db7-a82f-9cab17b743e0",
        name: 'Asprin',
        directionsForUse: 'Take 1 tablet',
        condition: 'Headache',
        prescriber: {name: "Self", id: "3a37dbe8-d5f1-4784-bfc2-eb17afe74f1b"}
      },
      {
        id: "1111111-e0e8-4db7-a82f-9cab17b743e0",
        name: 'NAPROXEN',
        directionsForUse: 'Take 1 tablet',
        condition: 'Back pain',
        prescriber: {name: "Joe Smith", id: "ddddddddd-d5f1-4784-bfc2-eb17afe74f1b"}
      }
    ]);

    await render(hbs`{{patient-medlist medications=medications}}`);

    assert.dom('.medication').exists({ count: 2 });
    assert.dom('.medication:nth-child(1) td').hasText('Asprin');
    assert.dom('.medication:nth-child(2) td').hasText('NAPROXEN');
  });
});
