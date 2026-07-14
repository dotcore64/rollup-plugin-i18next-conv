import { describe, it } from "node:test";

import { use } from "chai";

globalThis.describe = describe;
globalThis.it = it;

// eslint-disable-next-line unicorn/no-await-expression-member
use((await import("chai-as-promised")).default);
