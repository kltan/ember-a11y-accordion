import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';
import { CLASS_NAMES } from 'ember-a11y-accordion/utils/dom';

const SELECTORS = {
  header: `.${CLASS_NAMES.header}`,
  trigger: `.${CLASS_NAMES.trigger}`,
  panelWrapper: `.${CLASS_NAMES.panelWrapper}`,
};

moduleForComponent('accordion-item', 'Integration | Component | accordion item', {
  integration: true,
});

test('it has ARIA and DOM attributes on init', function(assert) {
  assert.expect(9);

  this.render(hbs`
    {{#accordion-list as |accordion|}}
      {{#accordion.item expandOnInit=true as |item|}}
        {{#item.header}}First header{{/item.header}}
        {{#item.panel}}First panel{{/item.panel}}
      {{/accordion.item}}
    {{/accordion-list}}
  `);

  // Item header
  const assertHeader = assert.dom(SELECTORS.header);
  assertHeader.hasAttribute('role', 'heading', 'The item header has an ARIA role of "heading"');
  assertHeader.hasAttribute('aria-level', '3', 'The item header has an aria-level of "3" by default');

  // Header trigger
  const assertTrigger = assert.dom(SELECTORS.trigger);
  assertTrigger.hasAttribute('type', 'button', 'The trigger is of type "button"');
  assertTrigger.hasAttribute('aria-expanded', 'true', 'The trigger has an aria-expanded value of "true" when expandOnInit is set to true');
  assertTrigger.hasAttribute('aria-disabled', 'true', 'The trigger has an aria-disabled value of "true" when expandOnInit is set to true');
  assertTrigger.hasAttribute('aria-controls', find(SELECTORS.panelWrapper).getAttribute('id'), 'The trigger controls the correct panel via aria-controls');

  // Item panel
  const assertPanel = assert.dom(SELECTORS.panelWrapper);
  assertPanel.hasAttribute('role', 'region', 'The panel has an ARIA role of "region"');
  assertPanel.hasAttribute('aria-hidden', 'false', 'The panel aria-hidden value is "false" when expandOnInit is set to true');
  assertPanel.hasAttribute('aria-labelledby', find(SELECTORS.trigger).getAttribute('id'), 'The panel is labelled by the correct trigger via aria-labelledby');
});
