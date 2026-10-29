import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pushNotification } from '../src/lib/utilities.js';

test('keeps the public array reassignment contract without mutating options', () => {
	/** @type {import('../src/lib/types.js').NotificationOptions[]} */
	const notifications = [];
	const options = { title: 'Hello' };
	assert.equal(pushNotification(options, notifications), notifications);
	assert.deepEqual(notifications, [{ title: 'Hello', id: 0 }]);
	assert.deepEqual(options, { title: 'Hello' });
});

test('uses all existing numeric IDs, even with unordered or custom string IDs', () => {
	const notifications = [{ id: 20 }, { id: 'custom' }, { id: 2 }];
	pushNotification({}, notifications);
	assert.equal(notifications.at(-1)?.id, 21);
});

test('undefined IDs are generated and explicit IDs preserved', () => {
	/** @type {import('../src/lib/types.js').NotificationOptions[]} */
	const notifications = [];
	pushNotification({ id: undefined }, notifications);
	pushNotification({ id: 'saved' }, notifications);
	assert.deepEqual(
		notifications.map((item) => item.id),
		[0, 'saved']
	);
});

test('rejects duplicate IDs before changing the array', () => {
	const notifications = [{ id: 1 }];
	assert.throws(() => pushNotification({ id: 1 }, notifications), /already exists/);
	assert.equal(notifications.length, 1);
});
