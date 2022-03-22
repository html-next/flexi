import Application from 'dummy/app';
import config from 'dummy/config/environment';
import * as QUnit from 'qunit';
import { setup } from 'qunit-dom';

import { setApplication } from '@ember/test-helpers';

import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

setup(QUnit.assert);

start({ setupTestIsolationValidation: true });
