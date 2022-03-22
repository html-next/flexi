import * as QUnit from 'qunit';
import { setup } from 'qunit-dom';

import { setApplication } from '@ember/test-helpers';

import { start } from 'ember-qunit';

import Application from 'frontend/app';
import config from 'frontend/config/environment';

setApplication(Application.create(config.APP));

setup(QUnit.assert);

start({ setupTestIsolationValidation: true });
