import { expect } from '@playwright/test';

export function assertEqualsExpected(actual, expected) {
    expect(actual).toBe(expected);
}